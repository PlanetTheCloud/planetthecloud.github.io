/*
  HybridStegoJS v1 clean stego core.
  Stage A: public bootstrap/header in sequential RGB 1-LSB.
  Stage B: encrypted body, with modulo-prime pixel order and LCG selecting
  both S1 channels and S2 bit count.
*/
(function () {
  'use strict';

  const U = window.HybridStegoUtils;
  if (!U) throw new Error('HybridStegoUtils must be loaded before js/core/stego.js.');

  const {
    bytesToUtf8,
    utf8ToBytes,
    concatBytes,
    uint32ToBytes,
    bytesToUint32,
    stableStringify
  } = U;

  const MAGIC = 'HCSG';
  const VERSION = 1;
  const SUITE_ID = 1;
  const BOOTSTRAP_BYTES = 16;
  const HEADER_BITS_PER_PIXEL = 3;
  const CHANNELS = [
    { s1: 0, name: 'R', offsets: [0] },
    { s1: 1, name: 'G', offsets: [1] },
    { s1: 2, name: 'B', offsets: [2] },
    { s1: 3, name: 'RG', offsets: [0, 1] },
    { s1: 4, name: 'RB', offsets: [0, 2] },
    { s1: 5, name: 'GB', offsets: [1, 2] },
    { s1: 6, name: 'RGB', offsets: [0, 1, 2] }
  ];
  const CHANNEL_NAMES = CHANNELS.map((entry) => entry.name);
  const RGB_NAMES = ['R', 'G', 'B'];
  const DEFAULT_LCG = {
    s1: { a: 1, c: 4, m: 7 },
    s2: { a: 1, c: 1, m: 3 }
  };

  function getBit(bytes, bitIndex) {
    return (bytes[bitIndex >> 3] >> (7 - (bitIndex & 7))) & 1;
  }

  function setBit(bytes, bitIndex, value) {
    if (value) bytes[bitIndex >> 3] |= 1 << (7 - (bitIndex & 7));
  }

  function setLSB(value, bits, k) {
    if (k < 1 || k > 4) throw new Error('Invalid LSB bit count.');
    const mask = (1 << k) - 1;
    return (value & ~mask) | (bits & mask);
  }

  function getLSB(value, k) {
    if (k < 1 || k > 4) throw new Error('Invalid LSB bit count.');
    return value & ((1 << k) - 1);
  }

  function seedToU32(seedBytes, offset) {
    const n = seedBytes.length;
    return (
      ((seedBytes[offset % n] << 24) >>> 0) |
      (seedBytes[(offset + 1) % n] << 16) |
      (seedBytes[(offset + 2) % n] << 8) |
      seedBytes[(offset + 3) % n]
    ) >>> 0;
  }

  function normalizeLcgParams(params, fallback) {
    const out = { ...fallback, ...(params || {}) };
    out.a = Number(out.a);
    out.c = Number(out.c);
    out.m = Number(out.m);
    if (!Number.isInteger(out.m) || out.m < 2) throw new Error('LCG modulus must be at least 2.');
    if (!Number.isInteger(out.a) || out.a <= 0 || out.a >= out.m) throw new Error('LCG multiplier must satisfy 0 < a < m.');
    if (!Number.isInteger(out.c) || out.c < 0 || out.c >= out.m) throw new Error('LCG increment must satisfy 0 <= C < m.');
    if (out.c === 0) throw new Error('LCG increment C should not be 0.');
    return out;
  }

  function makeLcg(params, seedBytes, seedOffset) {
    const p = normalizeLcgParams(params, params);
    let state = seedToU32(seedBytes, seedOffset) % p.m;
    return function next() {
      state = (Math.imul(p.a, state) + p.c) % p.m;
      return state;
    };
  }

  function makeLcgSelectors(stegoSeedBytes, lcgParams) {
    const nextS1Raw = makeLcg(normalizeLcgParams(lcgParams && lcgParams.s1, DEFAULT_LCG.s1), stegoSeedBytes, 0);
    const nextS2Raw = makeLcg(normalizeLcgParams(lcgParams && lcgParams.s2, DEFAULT_LCG.s2), stegoSeedBytes, 8);
    return function nextSelection() {
      const s1 = nextS1Raw() % 7;
      const s2Raw = nextS2Raw();
      const k = (s2Raw % 3) + 1;
      const channel = CHANNELS[s1];
      return {
        s1,
        s2: k,
        s2Raw,
        channelName: channel.name,
        offsets: channel.offsets,
        bitsPerChannel: k
      };
    };
  }

  function isPrime(n) {
    n = Number(n);
    if (!Number.isInteger(n) || n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let d = 3; d * d <= n; d += 2) {
      if (n % d === 0) return false;
    }
    return true;
  }

  function largestPrimeAtMost(n) {
    n = Math.floor(Number(n));
    if (n < 2) throw new Error('No prime exists in the modulo generator boundary.');
    for (let candidate = n; candidate >= 2; candidate--) {
      if (isPrime(candidate)) return candidate;
    }
    throw new Error('No prime exists in the modulo generator boundary.');
  }

  function primeFactors(n) {
    n = Number(n);
    const factors = [];
    if (!Number.isInteger(n) || n < 2) return factors;
    if (n % 2 === 0) {
      factors.push(2);
      while (n % 2 === 0) n /= 2;
    }
    for (let d = 3; d * d <= n; d += 2) {
      if (n % d === 0) {
        factors.push(d);
        while (n % d === 0) n /= d;
      }
    }
    if (n > 1) factors.push(n);
    return factors;
  }

  function modPow(base, exp, modulus) {
    let b = BigInt(base);
    let e = BigInt(exp);
    const m = BigInt(modulus);
    let result = 1n;
    b %= m;
    while (e > 0n) {
      if (e & 1n) result = (result * b) % m;
      b = (b * b) % m;
      e >>= 1n;
    }
    return Number(result);
  }

  function isPrimitiveRoot(g, p) {
    g = Number(g);
    p = Number(p);
    if (!isPrime(p) || !Number.isInteger(g) || g < 2 || g >= p) return false;
    const factors = primeFactors(p - 1);
    return factors.every((factor) => modPow(g, (p - 1) / factor, p) !== 1);
  }

  function findPrimitiveRoot(p) {
    if (!isPrime(p)) throw new Error('Modulo generator P must be prime.');
    for (let g = 2; g < p; g++) {
      if (isPrimitiveRoot(g, p)) return g;
    }
    throw new Error(`Could not find a primitive root modulo ${p}.`);
  }

  function parseMode(value, fallback) {
    const normalized = String(value || fallback).toLowerCase();
    return normalized === 'manual' ? 'manual' : 'auto';
  }

  function resolveModuloGenerator(totalPixels, reservedHeaderPixels, options = {}) {
    const usablePixels = totalPixels - reservedHeaderPixels;
    if (usablePixels < 2) throw new Error('Cover image needs at least 2 body pixels for modulo generator mode.');
    const minP = 3;
    const maxP = usablePixels + 1;
    const primeMode = parseMode(options.primeMode, 'auto');
    const generatorMode = parseMode(options.generatorMode, 'auto');
    let p;
    if (primeMode === 'manual') {
      p = Number(options.p);
      if (!Number.isInteger(p)) throw new Error('Manual modulo prime P must be an integer.');
      if (p < minP || p > maxP) throw new Error(`Manual modulo prime P must satisfy ${minP} <= P <= ${maxP}.`);
      if (!isPrime(p)) throw new Error('Manual modulo prime P must be prime.');
    } else {
      p = largestPrimeAtMost(maxP);
    }

    let g;
    if (generatorMode === 'manual') {
      g = Number(options.g);
      if (!Number.isInteger(g)) throw new Error('Manual generator g must be an integer.');
      if (g < 2 || g >= p) throw new Error(`Manual generator g must satisfy 2 <= g <= ${p - 1}.`);
      if (!isPrimitiveRoot(g, p)) throw new Error(`Manual generator g=${g} is not a primitive root modulo P=${p}.`);
    } else {
      g = findPrimitiveRoot(p);
    }

    return {
      pixelOrder: 'modulo-prime-v1',
      primeMode,
      generatorMode,
      p,
      g,
      minP,
      maxP,
      usablePixels,
      usablePositions: p - 1,
      exponentStart: 1,
      mapping: 'pixelIndex = reservedHeaderPixels + (g^i mod P) - 1'
    };
  }

  function makeSequentialPositions(width, height, reservedHeaderPixels) {
    const totalPixels = width * height;
    const positions = [];
    for (let pixelIndex = reservedHeaderPixels; pixelIndex < totalPixels; pixelIndex++) {
      positions.push(pixelIndex);
    }
    return positions;
  }

  function makeModuloPrimePositions(width, height, reservedHeaderPixels, modulo) {
    const totalPixels = width * height;
    const resolved = resolveModuloGenerator(totalPixels, reservedHeaderPixels, modulo);
    if (resolved.p !== Number(modulo.p) || resolved.g !== Number(modulo.g)) {
      throw new Error('Header corrupted: modulo generator metadata does not match resolved values.');
    }
    const positions = [];
    for (let i = resolved.exponentStart; i <= resolved.p - 1; i++) {
      const residue = modPow(resolved.g, i, resolved.p);
      positions.push(reservedHeaderPixels + residue - 1);
    }
    return positions;
  }

  function makeBodyPositions(width, height, reservedHeaderPixels, bodyMode) {
    const mode = bodyMode && bodyMode.pixelOrder;
    if (mode === 'sequential-after-header') return makeSequentialPositions(width, height, reservedHeaderPixels);
    if (mode === 'modulo-prime-v1') return makeModuloPrimePositions(width, height, reservedHeaderPixels, bodyMode.modulo);
    throw new Error(`Unsupported body pixel order: ${mode || 'missing'}.`);
  }

  function fixedHeaderPixels(headerLen) {
    return Math.ceil((BOOTSTRAP_BYTES + headerLen) * 8 / HEADER_BITS_PER_PIXEL);
  }

  function encodeBootstrap(headerLen, bodyLen) {
    const out = new Uint8Array(BOOTSTRAP_BYTES);
    out[0] = 72; out[1] = 67; out[2] = 83; out[3] = 71;
    out[4] = VERSION;
    out[5] = SUITE_ID;
    out[6] = 0;
    out[7] = 0;
    out.set(uint32ToBytes(headerLen), 8);
    out.set(uint32ToBytes(bodyLen), 12);
    return out;
  }

  function decodeBootstrap(bytes) {
    const magic = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
    if (magic !== MAGIC) throw new Error('Invalid stego file: magic bytes not found.');
    if (bytes[4] !== VERSION) throw new Error(`Unsupported stego version ${bytes[4]}.`);
    return {
      magic,
      version: bytes[4],
      suiteId: bytes[5],
      flags: (bytes[6] << 8) | bytes[7],
      headerLen: bytesToUint32(bytes.slice(8, 12)),
      bodyLen: bytesToUint32(bytes.slice(12, 16))
    };
  }

  function headerToBytes(header) {
    return utf8ToBytes(stableStringify(header));
  }

  function finalizeHeader(width, height, baseHeader, bodyLen, stegoOptions = {}) {
    const totalPixels = width * height;
    const header = JSON.parse(JSON.stringify(baseHeader));
    const moduloOptions = stegoOptions.modulo || {};
    header.stego = {
      headerMode: { pixelOrder: 'sequential', channels: 'RGB', bitsPerChannel: 1 },
      bodyMode: {
        pixelOrder: 'modulo-prime-v1',
        channelMode: 'LCG-S1',
        bitCountMode: 'LCG-S2',
        maxBitsPerChannel: 3,
        lcg: JSON.parse(JSON.stringify(DEFAULT_LCG)),
        reservedHeaderPixels: 0,
        modulo: {
          pixelOrder: 'modulo-prime-v1',
          primeMode: parseMode(moduloOptions.primeMode, 'auto'),
          generatorMode: parseMode(moduloOptions.generatorMode, 'auto'),
          p: null,
          g: null,
          minP: 3,
          maxP: null,
          usablePixels: null,
          usablePositions: null,
          exponentStart: 1,
          mapping: 'pixelIndex = reservedHeaderPixels + (g^i mod P) - 1'
        }
      }
    };

    let headerBytes = headerToBytes(header);
    for (let i = 0; i < 10; i++) {
      const reserved = fixedHeaderPixels(headerBytes.length);
      header.stego.bodyMode.reservedHeaderPixels = reserved;
      header.stego.bodyMode.modulo = resolveModuloGenerator(totalPixels, reserved, {
        ...moduloOptions,
        primeMode: header.stego.bodyMode.modulo.primeMode,
        generatorMode: header.stego.bodyMode.modulo.generatorMode
      });
      const next = headerToBytes(header);
      if (next.length === headerBytes.length) {
        headerBytes = next;
        break;
      }
      headerBytes = next;
    }

    const reservedHeaderPixels = fixedHeaderPixels(headerBytes.length);
    header.stego.bodyMode.reservedHeaderPixels = reservedHeaderPixels;
    header.stego.bodyMode.modulo = resolveModuloGenerator(totalPixels, reservedHeaderPixels, {
      ...moduloOptions,
      primeMode: header.stego.bodyMode.modulo.primeMode,
      generatorMode: header.stego.bodyMode.modulo.generatorMode
    });
    headerBytes = headerToBytes(header);
    if (fixedHeaderPixels(headerBytes.length) !== reservedHeaderPixels) {
      throw new Error('Could not stabilize public header length.');
    }
    if (reservedHeaderPixels >= totalPixels) throw new Error('Cover image is too small for the fixed public header.');

    const bootstrapBytes = encodeBootstrap(headerBytes.length, bodyLen);
    const aadBytes = concatBytes(bootstrapBytes, headerBytes);
    return {
      header,
      bootstrapBytes,
      headerBytes,
      aadBytes,
      reservedHeaderPixels,
      bodyLen
    };
  }

  function readFixedRgbBytes(imageData, width, height, byteLength, bitOffset) {
    const out = new Uint8Array(byteLength);
    const totalPixels = width * height;
    for (let bit = 0; bit < byteLength * 8; bit++) {
      const absoluteBit = bitOffset + bit;
      const pixelIndex = Math.floor(absoluteBit / 3);
      const channel = absoluteBit % 3;
      if (pixelIndex >= totalPixels) throw new Error('Image too small while reading public header.');
      setBit(out, bit, imageData.data[pixelIndex * 4 + channel] & 1);
    }
    return out;
  }

  function writeFixedRgbBytes(imageData, width, height, bytes, trace) {
    const totalPixels = width * height;
    const requiredPixels = Math.ceil(bytes.length * 8 / 3);
    if (requiredPixels > totalPixels) throw new Error('Cover image is too small for the public header.');
    let changedSlots = 0;
    let unchangedSlots = 0;
    for (let bit = 0; bit < bytes.length * 8; bit++) {
      const pixelIndex = Math.floor(bit / 3);
      const channel = bit % 3;
      const offset = pixelIndex * 4 + channel;
      const oldValue = imageData.data[offset];
      const value = getBit(bytes, bit);
      const newValue = setLSB(oldValue, value, 1);
      if (oldValue === newValue) unchangedSlots++;
      else changedSlots++;
      if (shouldTrace(trace, 'header')) {
        trace.entries.push(makeTraceEntry('header', bit, pixelIndex, channel, width, 1, value, oldValue, newValue, {
          s1: '-',
          s2: 1,
          channelSelection: 'fixed RGB'
        }));
        trace.headerCount++;
      }
      imageData.data[offset] = newValue;
    }
    return { bytes: bytes.length, bits: bytes.length * 8, usedPixels: requiredPixels, changedSlots, unchangedSlots };
  }

  function shouldTrace(trace, phase) {
    if (!trace) return false;
    if (phase === 'header') return trace.headerCount < trace.headerLimit;
    if (phase === 'body') return trace.bodyCount < trace.bodyLimit;
    return trace.entries.length < trace.limit;
  }

  function makeTraceEntry(phase, slotIndex, pixelIndex, channelOffset, width, k, value, oldValue, newValue, meta) {
    return {
      phase,
      slotIndex,
      pixelIndex,
      x: pixelIndex % width,
      y: Math.floor(pixelIndex / width),
      channel: RGB_NAMES[channelOffset],
      bitsPerChannel: k,
      embeddedBits: value.toString(2).padStart(k, '0'),
      oldValue,
      newValue,
      oldLsb: getLSB(oldValue, k),
      newLsb: getLSB(newValue, k),
      changed: oldValue !== newValue,
      ...meta
    };
  }

  function estimateBodyCapacityBits(width, height, reservedHeaderPixels, stegoSeedBytes, bodyMode) {
    const positions = makeBodyPositions(width, height, reservedHeaderPixels, bodyMode);
    const lcgParams = bodyMode && bodyMode.lcg;
    const nextSelection = makeLcgSelectors(stegoSeedBytes, lcgParams);
    let bits = 0;
    for (let i = 0; i < positions.length; i++) {
      const selection = nextSelection();
      bits += selection.offsets.length * selection.bitsPerChannel;
    }
    return bits;
  }

  function writeBodyBytes(imageData, width, height, bodyBytes, reservedHeaderPixels, stegoSeedBytes, bodyMode, trace) {
    const positions = makeBodyPositions(width, height, reservedHeaderPixels, bodyMode);
    const capacityBits = estimateBodyCapacityBits(width, height, reservedHeaderPixels, stegoSeedBytes, bodyMode);
    const payloadBits = bodyBytes.length * 8;
    if (payloadBits > capacityBits) {
      throw new Error(`Cover image capacity is not enough. Need ${payloadBits.toLocaleString()} bits, capacity is ${capacityBits.toLocaleString()} bits.`);
    }

    const lcgParams = bodyMode && bodyMode.lcg;
    const nextSelection = makeLcgSelectors(stegoSeedBytes, lcgParams);
    let bitCursor = 0;
    let usedPixels = 0;
    let usedSlots = 0;
    let changedSlots = 0;
    let unchangedSlots = 0;
    let maxAbsDelta = 0;

    for (let positionStep = 0; positionStep < positions.length && bitCursor < payloadBits; positionStep++) {
      const pixelIndex = positions[positionStep];
      const selection = nextSelection();
      usedPixels++;
      const base = pixelIndex * 4;
      for (const channel of selection.offsets) {
        if (bitCursor >= payloadBits) break;
        let value = 0;
        let usedBits = 0;
        for (let j = 0; j < selection.bitsPerChannel; j++) {
          if (bitCursor < payloadBits) {
            value = (value << 1) | getBit(bodyBytes, bitCursor++);
            usedBits++;
          } else {
            value <<= 1;
          }
        }
        const offset = base + channel;
        const oldValue = imageData.data[offset];
        const newValue = setLSB(oldValue, value, selection.bitsPerChannel);
        const delta = Math.abs(newValue - oldValue);
        if (oldValue === newValue) unchangedSlots++;
        else changedSlots++;
        if (delta > maxAbsDelta) maxAbsDelta = delta;
        if (shouldTrace(trace, 'body')) {
          trace.entries.push(makeTraceEntry('body', usedSlots, pixelIndex, channel, width, selection.bitsPerChannel, value, oldValue, newValue, {
            s1: selection.s1,
            s2: selection.s2,
            s2Raw: selection.s2Raw,
            channelSelection: selection.channelName,
            positionStep,
            pixelOrder: bodyMode.pixelOrder,
            usedBits
          }));
          trace.bodyCount++;
        }
        imageData.data[offset] = newValue;
        usedSlots++;
      }
    }

    return {
      bytes: bodyBytes.length,
      bits: payloadBits,
      capacityBits,
      capacityBytes: Math.floor(capacityBits / 8),
      usedPixels,
      usedSlots,
      changedSlots,
      unchangedSlots,
      maxAbsDelta
    };
  }

  function readBodyBytes(imageData, width, height, bodyLen, reservedHeaderPixels, stegoSeedBytes, bodyMode) {
    const expectedBits = bodyLen * 8;
    const positions = makeBodyPositions(width, height, reservedHeaderPixels, bodyMode);
    const capacityBits = estimateBodyCapacityBits(width, height, reservedHeaderPixels, stegoSeedBytes, bodyMode);
    if (expectedBits > capacityBits) throw new Error('Header body length exceeds image capacity.');

    const out = new Uint8Array(bodyLen);
    const lcgParams = bodyMode && bodyMode.lcg;
    const nextSelection = makeLcgSelectors(stegoSeedBytes, lcgParams);
    let bitCursor = 0;
    for (let positionStep = 0; positionStep < positions.length && bitCursor < expectedBits; positionStep++) {
      const pixelIndex = positions[positionStep];
      const selection = nextSelection();
      const base = pixelIndex * 4;
      for (const channel of selection.offsets) {
        if (bitCursor >= expectedBits) break;
        const value = getLSB(imageData.data[base + channel], selection.bitsPerChannel);
        for (let j = selection.bitsPerChannel - 1; j >= 0 && bitCursor < expectedBits; j--) {
          setBit(out, bitCursor++, (value >> j) & 1);
        }
      }
    }
    return out;
  }

  function embedPackage(imageData, width, height, finalizedHeader, encryptedBodyBytes, stegoSeedBytes, options = {}) {
    const traceAll = options.traceAll === true;
    const traceLimit = traceAll ? Infinity : Math.max(0, Number(options.traceLimit || 0));
    const headerLimit = traceAll ? Infinity : Math.min(12, traceLimit);
    const trace = traceLimit ? {
      limit: traceLimit,
      headerLimit,
      bodyLimit: traceAll ? Infinity : Math.max(0, traceLimit - headerLimit),
      headerCount: 0,
      bodyCount: 0,
      entries: []
    } : null;
    const fixedBytes = concatBytes(finalizedHeader.bootstrapBytes, finalizedHeader.headerBytes);
    const headerStats = writeFixedRgbBytes(imageData, width, height, fixedBytes, trace);
    const bodyStats = writeBodyBytes(
      imageData,
      width,
      height,
      encryptedBodyBytes,
      finalizedHeader.reservedHeaderPixels,
      stegoSeedBytes,
      finalizedHeader.header.stego.bodyMode,
      trace
    );
    return {
      header: finalizedHeader.header,
      bootstrap: decodeBootstrap(finalizedHeader.bootstrapBytes),
      headerStats,
      bodyStats,
      trace: trace ? trace.entries : []
    };
  }

  function extractHeader(imageData, width, height) {
    const bootstrapBytes = readFixedRgbBytes(imageData, width, height, BOOTSTRAP_BYTES, 0);
    const bootstrap = decodeBootstrap(bootstrapBytes);
    if (bootstrap.headerLen < 20 || bootstrap.headerLen > 200000) throw new Error('Header corrupted or invalid.');
    if (bootstrap.bodyLen < 16) throw new Error('Header corrupted or invalid body length.');
    const headerBytes = readFixedRgbBytes(imageData, width, height, bootstrap.headerLen, BOOTSTRAP_BYTES * 8);
    const header = JSON.parse(bytesToUtf8(headerBytes));
    if (!header || header.magic !== MAGIC || header.version !== VERSION) throw new Error('Header corrupted or invalid.');
    const reservedHeaderPixels = fixedHeaderPixels(headerBytes.length);
    if (header.stego.bodyMode.reservedHeaderPixels !== reservedHeaderPixels) {
      throw new Error('Header corrupted: reserved header area does not match.');
    }
    return {
      bootstrap,
      header,
      bootstrapBytes,
      headerBytes,
      aadBytes: concatBytes(bootstrapBytes, headerBytes),
      reservedHeaderPixels,
      bodyLen: bootstrap.bodyLen
    };
  }

  function extractBody(imageData, width, height, extractedHeader, stegoSeedBytes) {
    return readBodyBytes(
      imageData,
      width,
      height,
      extractedHeader.bodyLen,
      extractedHeader.reservedHeaderPixels,
      stegoSeedBytes,
      extractedHeader.header.stego.bodyMode
    );
  }

  async function loadImageToCanvas(file) {
    if (!file) throw new Error('Choose an image first.');
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = () => reject(new Error('Could not load image.'));
        im.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      return { canvas, ctx, imageData: ctx.getImageData(0, 0, canvas.width, canvas.height) };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function canvasToPngBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Could not render PNG.')), 'image/png');
    });
  }

  function computeMsePsnr(originalImageData, stegoImageData) {
    const a = originalImageData.data;
    const b = stegoImageData.data;
    let sum = 0;
    let count = 0;
    for (let i = 0; i < a.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        const d = a[i + c] - b[i + c];
        sum += d * d;
        count++;
      }
    }
    const mse = count ? sum / count : 0;
    return { mse, psnr: mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse) };
  }

  function computeImageMetrics(originalImageData, stegoImageData) {
    const metrics = computeMsePsnr(originalImageData, stegoImageData);
    let changedPixels = 0;
    let changedRgbSamples = 0;
    let maxAbsRgbError = 0;
    for (let i = 0; i < originalImageData.data.length; i += 4) {
      let pixelChanged = false;
      for (let c = 0; c < 3; c++) {
        const d = Math.abs(originalImageData.data[i + c] - stegoImageData.data[i + c]);
        if (d) {
          pixelChanged = true;
          changedRgbSamples++;
          if (d > maxAbsRgbError) maxAbsRgbError = d;
        }
      }
      if (pixelChanged) changedPixels++;
    }
    const pixelCount = originalImageData.data.length / 4;
    return {
      ...metrics,
      changedPixels,
      changedPixelPercent: pixelCount ? (changedPixels / pixelCount) * 100 : 0,
      changedRgbSamples,
      maxAbsRgbError
    };
  }

  function describeStego(header) {
    const bodyMode = header.stego.bodyMode;
    return {
      header: 'Stage A fixed sequential RGB, 1 LSB, from pixel 0',
      body: bodyMode.pixelOrder === 'modulo-prime-v1'
        ? 'Stage B modulo-prime pixel order; LCG chooses S1 channels and S2 bit count'
        : 'Stage B sequential pixels after header; LCG chooses S1 channels and S2 bit count',
      channelMap: CHANNEL_NAMES,
      lcg: bodyMode.lcg,
      modulo: bodyMode.modulo || null,
      reservedHeaderPixels: bodyMode.reservedHeaderPixels
    };
  }

  window.HybridStegoStego = {
    MAGIC,
    VERSION,
    DEFAULT_LCG,
    CHANNEL_NAMES,
    setLSB,
    getLSB,
    isPrime,
    isPrimitiveRoot,
    findPrimitiveRoot,
    resolveModuloGenerator,
    makeBodyPositions,
    makeLcgSelectors,
    finalizeHeader,
    estimateBodyCapacityBits,
    embedPackage,
    extractHeader,
    extractBody,
    describeStego,
    loadImageToCanvas,
    canvasToPngBlob,
    computeImageMetrics
  };
})();
