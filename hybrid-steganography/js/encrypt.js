(function () {
  'use strict';

  function init() {
    const H = window.HybridStego;
    const $ = (id) => document.getElementById(id);
    if (!$('encryptPage')) return;

    let previewUrl = null;
    let stegoUrl = null;

    function setStatus(message, type = 'secondary') {
      const el = $('status');
      el.className = `alert alert-${type}`;
      el.textContent = message;
      el.classList.remove('d-none');
    }

    function showJson(id, value) {
      $(id).textContent = H.formatJson(value);
    }

    function clearEmbeddedData() {
      [
        'embeddedStageMap',
        'embeddedStageABootstrap',
        'embeddedStageAHeader',
        'embeddedStageBBody',
        'embeddedNotEmbedded'
      ].forEach((id) => {
        const el = $(id);
        if (el) el.textContent = '';
      });
    }

    function renderEmbeddedData(result) {
      showJson('embeddedStageMap', {
        note: 'Embedded data is split by stage. Stage A is public fixed RGB 1-LSB metadata. Stage B is AES-GCM ciphertext plus authentication tag routed by modulo-prime pixel order with HKDF-derived LCG S1/S2 selection.',
        stageA: {
          visibility: 'public',
          route: 'fixed sequential RGB, 1 LSB',
          contains: [
            'bootstrap',
            'public header'
          ]
        },
        stageB: {
          visibility: 'encrypted',
          route: result.header.stego.bodyMode.pixelOrder,
          channelSelection: 'LCG-S1',
          bitCountSelection: 'LCG-S2',
          byteLength: result.encryptedBodyBytes.length
        }
      });

      showJson('embeddedStageABootstrap', {
        stage: 'A',
        section: 'public bootstrap',
        route: 'fixed sequential RGB, 1 LSB',
        data: result.embed.bootstrap
      });

      showJson('embeddedStageAHeader', {
        stage: 'A',
        section: 'public header',
        route: 'fixed sequential RGB, 1 LSB',
        data: result.header
      });

      showJson('embeddedStageBBody', {
        stage: 'B',
        section: 'encrypted body',
        route: result.header.stego.bodyMode.pixelOrder,
        modulo: result.header.stego.bodyMode.modulo,
        lcg: result.header.stego.bodyMode.lcg,
        encoding: 'base64',
        byteLength: result.encryptedBodyBytes.length,
        encryptedBodyB64: H.bytesToBase64(result.encryptedBodyBytes)
      });

      showJson('embeddedNotEmbedded', {
        notEmbedded: [
          'receiver private ECDH key',
          'sender private Schnorr key',
          'ECDH shared secret',
          'AES-GCM key',
          'HKDF-derived LCG stego seed',
          'plaintext message'
        ]
      });
    }

    function formatNumber(value, digits = 0) {
      if (value === Infinity || value === 'Infinity') return 'Infinity';
      if (typeof value !== 'number') return value;
      return value.toLocaleString(undefined, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      });
    }

    function metricTile(label, value, detail, tone = 'secondary') {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4';
      col.innerHTML = `
        <div class="border rounded p-3 h-100 bg-white">
          <div class="small text-muted">${label}</div>
          <div class="h5 mb-1 text-${tone}">${value}</div>
          <div class="small text-muted">${detail}</div>
        </div>
      `;
      return col;
    }

    function getStegoOptions() {
      const primeModeEl = $('primeMode');
      const generatorModeEl = $('generatorMode');
      const primeValueEl = $('primeValue');
      const generatorValueEl = $('generatorValue');
      return {
        modulo: {
          primeMode: primeModeEl ? primeModeEl.value : 'auto',
          p: primeValueEl && primeValueEl.value ? Number(primeValueEl.value) : undefined,
          generatorMode: generatorModeEl ? generatorModeEl.value : 'auto',
          g: generatorValueEl && generatorValueEl.value ? Number(generatorValueEl.value) : undefined
        }
      };
    }

    function syncModuloControls() {
      const primeModeEl = $('primeMode');
      const generatorModeEl = $('generatorMode');
      const primeValueEl = $('primeValue');
      const generatorValueEl = $('generatorValue');
      if (primeValueEl && primeModeEl) {
        primeValueEl.disabled = primeModeEl.value !== 'manual';
        primeValueEl.placeholder = primeModeEl.value === 'manual' ? 'Enter prime P' : 'Auto';
      }
      if (generatorValueEl && generatorModeEl) {
        generatorValueEl.disabled = generatorModeEl.value !== 'manual';
        generatorValueEl.placeholder = generatorModeEl.value === 'manual' ? 'Enter primitive root g' : 'Auto';
      }
    }

    async function updateModuloBoundary(file) {
      const el = $('moduloBoundary');
      if (!el) return;
      if (!file) {
        el.textContent = 'Choose a cover image to calculate the modulo generator boundary.';
        return;
      }
      try {
        const loaded = await H.loadImageToCanvas(file);
        const totalPixels = loaded.canvas.width * loaded.canvas.height;
        el.textContent = `Cover has ${formatNumber(totalPixels)} pixels. Final P boundary is 3 <= P <= usable body pixels + 1 after the public header is reserved; resolved P/g will appear in metrics.`;
      } catch (error) {
        el.textContent = error.message;
      }
    }

    function renderMetricsSummary(raw) {
      const wrap = $('metricsSummary');
      wrap.textContent = '';
      const usage = raw.body.capacityBytes ? (raw.body.encryptedBytes / raw.body.capacityBytes) * 100 : 0;
      const remaining = Math.max(0, raw.body.capacityBytes - raw.body.encryptedBytes);
      const psnr = raw.imageMetrics.psnrDb;
      const usageTone = usage > 90 ? 'danger' : usage > 75 ? 'warning' : 'success';
      const distortionTone = raw.imageMetrics.maxAbsRgbError > 3 ? 'warning' : 'success';

      wrap.appendChild(metricTile('Encrypted body', `${formatNumber(raw.body.encryptedBytes)} bytes`, 'AES-GCM ciphertext plus authentication tag', 'primary'));
      wrap.appendChild(metricTile('Body capacity used', `${formatNumber(usage, 2)}%`, `${formatNumber(remaining)} bytes remaining`, usageTone));
      wrap.appendChild(metricTile('Public header', `${formatNumber(raw.header.bytes)} bytes`, `${formatNumber(raw.header.reservedHeaderPixels)} pixels reserved`, 'primary'));
      wrap.appendChild(metricTile('Modulo generator', `P=${raw.body.modulo.p}, g=${raw.body.modulo.g}`, `${formatNumber(raw.body.modulo.usablePositions)} pseudo-random body positions`, 'primary'));
      wrap.appendChild(metricTile('LCG trace rows', `${formatNumber(raw.trace.rows)}`, `${formatNumber(raw.trace.headerRows)} header + ${formatNumber(raw.trace.bodyRows)} body writes`, 'primary'));
      wrap.appendChild(metricTile('PSNR', `${psnr} dB`, `MSE ${raw.imageMetrics.mse}`, distortionTone));
      wrap.appendChild(metricTile('Changed RGB samples', `${formatNumber(raw.imageMetrics.changedRgbSamples)}`, `${formatNumber(raw.imageMetrics.changedPixelPercent, 4)}% of pixels changed`, distortionTone));
    }

    function renderModuloPixelOrder(trace, header) {
      const tbody = $('moduloRows');
      if (!tbody) return;
      tbody.textContent = '';
      const bodyMode = header.stego.bodyMode;
      const modulo = bodyMode.modulo;
      const seenSteps = new Set();
      const bodyEntries = trace.filter((entry) => entry.phase === 'body' && Number.isInteger(entry.positionStep));
      for (const entry of bodyEntries) {
        if (seenSteps.has(entry.positionStep)) continue;
        seenSteps.add(entry.positionStep);
        const exponent = (modulo.exponentStart || 1) + entry.positionStep;
        const residue = entry.pixelIndex - bodyMode.reservedHeaderPixels + 1;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${exponent}</td>
          <td>${residue}</td>
          <td>${entry.pixelIndex}</td>
          <td>${entry.x}, ${entry.y}</td>
        `;
        tbody.appendChild(row);
      }
    }

    function resetOutput() {
      $('downloadStego').classList.add('d-none');
      $('stegoPreview').classList.add('d-none');
      $('metricsSummary').textContent = '';
      $('metrics').textContent = '';
      clearEmbeddedData();
      $('traceRows').textContent = '';
      const moduloRows = $('moduloRows');
      if (moduloRows) moduloRows.textContent = '';
      if (stegoUrl) URL.revokeObjectURL(stegoUrl);
      stegoUrl = null;
    }

    $('coverImage').addEventListener('change', () => {
      const file = $('coverImage').files[0];
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      updateModuloBoundary(file);
      if (!file) return;
      previewUrl = URL.createObjectURL(file);
      $('coverPreview').src = previewUrl;
      $('coverPreview').classList.remove('d-none');
    });

    ['primeMode', 'generatorMode'].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener('change', syncModuloControls);
    });
    syncModuloControls();

    $('encryptForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        resetOutput();
        setStatus('Encrypting, signing, deriving modulo generator route, deriving LCG S1/S2, and embedding...', 'info');
        const file = $('coverImage').files[0];
        H.requireCoverImage(file);
        const message = $('message').value;
        if (!message) throw new Error('Enter a plaintext message.');
        const receiverPublic = H.parseJson($('receiverPublicKey').value, 'Receiver public ECDH key');
        const senderPrivate = H.parseJson($('senderPrivateKey').value, 'Sender private Schnorr key');
        const loaded = await H.loadImageToCanvas(file);
        const original = new ImageData(new Uint8ClampedArray(loaded.imageData.data), loaded.imageData.width, loaded.imageData.height);
        const t0 = performance.now();
        const result = await H.encryptSignEmbed(
          loaded.imageData,
          loaded.canvas.width,
          loaded.canvas.height,
          message,
          receiverPublic,
          senderPrivate,
          { traceAll: true, stegoOptions: getStegoOptions() }
        );
        const t1 = performance.now();

        loaded.ctx.putImageData(loaded.imageData, 0, 0);
        const blob = await H.canvasToPngBlob(loaded.canvas);
        stegoUrl = URL.createObjectURL(blob);
        $('downloadStego').href = stegoUrl;
        $('downloadStego').download = 'hcs-lcg-stego.png';
        $('downloadStego').classList.remove('d-none');
        $('stegoPreview').src = stegoUrl;
        $('stegoPreview').classList.remove('d-none');

        const metrics = H.computeImageMetrics(original, loaded.imageData);
        const body = result.embed.bodyStats;
        const rawMetrics = {
          suite: result.crypto.suite,
          cover: `${loaded.canvas.width}x${loaded.canvas.height}`,
          header: {
            bytes: result.embed.headerStats.bytes,
            reservedHeaderPixels: result.header.stego.bodyMode.reservedHeaderPixels,
            mode: 'fixed sequential RGB, 1 LSB'
          },
          body: {
            encryptedBytes: result.encryptedBodyBytes.length,
            capacityBytes: body.capacityBytes,
            usedPixels: body.usedPixels,
            usedSlots: body.usedSlots,
            pixelOrder: result.header.stego.bodyMode.pixelOrder,
            modulo: result.header.stego.bodyMode.modulo,
            lcg: result.header.stego.bodyMode.lcg
          },
          trace: {
            mode: 'complete',
            rows: result.embed.trace.length,
            headerRows: result.embed.trace.filter((entry) => entry.phase === 'header').length,
            bodyRows: result.embed.trace.filter((entry) => entry.phase === 'body').length
          },
          stego: H.describeStego(result.header),
          crypto: {
            ecdhCurve: 'P-256',
            aes: 'AES-GCM-128',
            hkdf: 'HKDF-SHA-256',
            schnorrFingerprintHex: result.crypto.senderSigningKeyFingerprintHex
          },
          imageMetrics: {
            mse: Number(metrics.mse.toFixed(10)),
            psnrDb: metrics.psnr === Infinity ? 'Infinity' : Number(metrics.psnr.toFixed(4)),
            changedPixels: metrics.changedPixels,
            changedPixelPercent: Number(metrics.changedPixelPercent.toFixed(4)),
            changedRgbSamples: metrics.changedRgbSamples,
            maxAbsRgbError: metrics.maxAbsRgbError
          },
          runtimeMs: Number((t1 - t0).toFixed(2))
        };
        renderMetricsSummary(rawMetrics);
        showJson('metrics', rawMetrics);

        renderEmbeddedData(result);

        renderModuloPixelOrder(result.embed.trace, result.header);

        for (const entry of result.embed.trace) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${entry.phase}</td>
            <td>${entry.slotIndex}</td>
            <td>${entry.x}, ${entry.y}</td>
            <td>${entry.s1}</td>
            <td>${entry.channelSelection || entry.channel}</td>
            <td>${entry.s2}</td>
            <td>${entry.bitsPerChannel}</td>
            <td><code>${entry.embeddedBits}</code></td>
            <td>${entry.oldValue}->${entry.newValue}</td>
          `;
          $('traceRows').appendChild(row);
        }

        setStatus('Done. The PNG contains a public fixed header and an encrypted body hidden with modulo-prime pixel ordering plus ECDH-derived LCG S1/S2 selection.', 'success');
      } catch (error) {
        console.error(error);
        setStatus(error.message, 'danger');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
