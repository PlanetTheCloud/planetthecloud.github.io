/*
  HybridStegoJS v1 clean utilities.
  ECDH P-256 + HKDF-SHA-256 + AES-GCM-128 helpers for the KB-aligned app.
*/
(function () {
  'use strict';

  const te = new TextEncoder();
  const td = new TextDecoder();

  function assertSecureContext() {
    if (!window.isSecureContext && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      throw new Error('Web Crypto requires HTTPS, localhost, or 127.0.0.1. Run through a local server.');
    }
  }

  function utf8ToBytes(value) { return te.encode(String(value)); }
  function bytesToUtf8(bytes) { return td.decode(bytes); }

  function bytesToBase64(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    return btoa(binary);
  }

  function base64ToBytes(b64) {
    const binary = atob(String(b64 || '').trim());
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
    return out;
  }

  function bytesToHex(bytes) {
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function hexToBytes(hex) {
    const clean = String(hex || '').replace(/^0x/i, '').replace(/[^0-9a-f]/gi, '');
    if (clean.length % 2) throw new Error('Hex string has odd length.');
    const out = new Uint8Array(clean.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
    return out;
  }

  function concatBytes(...parts) {
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const part of parts) {
      out.set(part, offset);
      offset += part.length;
    }
    return out;
  }

  function uint32ToBytes(n) {
    if (!Number.isInteger(n) || n < 0 || n > 0xffffffff) throw new Error('Invalid uint32 value.');
    return new Uint8Array([(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]);
  }

  function bytesToUint32(bytes) {
    return (((bytes[0] << 24) >>> 0) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0;
  }

  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    const keys = Object.keys(value).sort();
    return '{' + keys.map((key) => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }

  function randomBytes(length) {
    assertSecureContext();
    const out = new Uint8Array(length);
    crypto.getRandomValues(out);
    return out;
  }

  async function sha256(bytes) {
    assertSecureContext();
    return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  }

  function parseJson(value, label) {
    try { return JSON.parse(value); }
    catch (error) { throw new Error(`${label} must be valid JSON.`); }
  }

  function downloadJson(filename, value) {
    const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  async function copyText(text) {
    await navigator.clipboard.writeText(text);
  }

  function validateEcdhPublicJwk(jwk, label) {
    if (!jwk || jwk.kty !== 'EC' || jwk.crv !== 'P-256' || !jwk.x || !jwk.y) {
      throw new Error(`${label} must be a P-256 ECDH public JWK.`);
    }
  }

  function validateEcdhPrivateJwk(jwk, label) {
    if (!jwk || jwk.kty !== 'EC' || jwk.crv !== 'P-256' || !jwk.x || !jwk.y || !jwk.d) {
      throw new Error(`${label} must be a P-256 ECDH private JWK.`);
    }
  }

  async function generateEcdhKeyPair() {
    assertSecureContext();
    const pair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
    return {
      publicJwk: await crypto.subtle.exportKey('jwk', pair.publicKey),
      privateJwk: await crypto.subtle.exportKey('jwk', pair.privateKey)
    };
  }

  async function importEcdhPublic(jwk) {
    validateEcdhPublicJwk(jwk, 'ECDH public key');
    return crypto.subtle.importKey('jwk', jwk, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  }

  async function importEcdhPrivate(jwk) {
    validateEcdhPrivateJwk(jwk, 'ECDH private key');
    return crypto.subtle.importKey('jwk', jwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits']);
  }

  async function deriveEcdhSharedSecret(privateJwk, publicJwk) {
    assertSecureContext();
    const privateKey = await importEcdhPrivate(privateJwk);
    const publicKey = await importEcdhPublic(publicJwk);
    return new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: publicKey }, privateKey, 256));
  }

  async function hkdfSha256(ikmBytes, saltBytes, infoText, lengthBytes) {
    assertSecureContext();
    const key = await crypto.subtle.importKey('raw', ikmBytes, 'HKDF', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({
      name: 'HKDF',
      hash: 'SHA-256',
      salt: saltBytes,
      info: utf8ToBytes(infoText)
    }, key, lengthBytes * 8);
    return new Uint8Array(bits);
  }

  async function deriveHcsKeys(sharedSecretBytes, saltBytes) {
    return {
      aesKey: await hkdfSha256(sharedSecretBytes, saltBytes, 'HCS-v1 AES-GCM key', 16),
      stegoSeed: await hkdfSha256(sharedSecretBytes, saltBytes, 'HCS-v1 LCG stego seed', 32)
    };
  }

  async function aesGcmEncrypt128(aesKey, nonce, plaintext, aad) {
    if (aesKey.length !== 16) throw new Error('AES-GCM-128 requires a 16-byte key.');
    const key = await crypto.subtle.importKey('raw', aesKey, { name: 'AES-GCM' }, false, ['encrypt']);
    return new Uint8Array(await crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv: nonce,
      additionalData: aad,
      tagLength: 128
    }, key, plaintext));
  }

  async function aesGcmDecrypt128(aesKey, nonce, ciphertext, aad) {
    if (aesKey.length !== 16) throw new Error('AES-GCM-128 requires a 16-byte key.');
    const key = await crypto.subtle.importKey('raw', aesKey, { name: 'AES-GCM' }, false, ['decrypt']);
    try {
      return new Uint8Array(await crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv: nonce,
        additionalData: aad,
        tagLength: 128
      }, key, ciphertext));
    } catch (error) {
      throw new Error('Decryption failed: wrong key, corrupted image, or modified stego data.');
    }
  }

  async function fingerprintHex(value) {
    return bytesToHex(await sha256(utf8ToBytes(stableStringify(value))));
  }

  window.HybridStegoUtils = {
    assertSecureContext,
    utf8ToBytes,
    bytesToUtf8,
    bytesToBase64,
    base64ToBytes,
    bytesToHex,
    hexToBytes,
    concatBytes,
    uint32ToBytes,
    bytesToUint32,
    stableStringify,
    randomBytes,
    sha256,
    parseJson,
    downloadJson,
    copyText,
    validateEcdhPublicJwk,
    validateEcdhPrivateJwk,
    generateEcdhKeyPair,
    deriveEcdhSharedSecret,
    hkdfSha256,
    deriveHcsKeys,
    aesGcmEncrypt128,
    aesGcmDecrypt128,
    fingerprintHex
  };
})();
