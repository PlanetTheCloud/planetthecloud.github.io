/*
  HybridStegoJS clean public API.
*/
(function () {
  'use strict';

  const U = window.HybridStegoUtils;
  const S = window.HybridStegoSchnorr;
  const T = window.HybridStegoStego;

  if (!U || !S || !T) throw new Error('Core modules must be loaded before js/main.js.');

  const SUITE = 'ECDH-P256_HKDF-SHA256_AES-128-GCM_SCHNORR-FFC-SHA256_MODPRIME-LCG-LSB';

  async function makeSignedPlainPackage(message, senderPrivateKey) {
    const messageBytes = U.utf8ToBytes(message);
    const publicPart = { scheme: senderPrivateKey.scheme, params: senderPrivateKey.params, y: senderPrivateKey.y };
    const signerFingerprintHex = await U.fingerprintHex(publicPart);
    const core = {
      type: 'hybrid-stego-message',
      version: 1,
      createdAt: new Date().toISOString(),
      messageUtf8B64: U.bytesToBase64(messageBytes),
      messageSha256Hex: U.bytesToHex(await U.sha256(messageBytes)),
      sender: {
        signingKeyFingerprintHex: signerFingerprintHex
      }
    };
    const signedBytes = U.utf8ToBytes(U.stableStringify(core));
    const signature = await S.schnorrSign(signedBytes, senderPrivateKey, 'HCS-v1 plaintext package');
    return {
      packageObj: { ...core, signature },
      signerFingerprintHex
    };
  }

  async function encryptSignEmbed(imageData, width, height, message, receiverPublicJwk, senderPrivateSchnorrKey, options = {}) {
    U.assertSecureContext();
    U.validateEcdhPublicJwk(receiverPublicJwk, 'Receiver public encryption key');
    if (!senderPrivateSchnorrKey || !senderPrivateSchnorrKey.x) throw new Error('Sender private Schnorr key is required.');

    const ephemeral = await U.generateEcdhKeyPair();
    const shared = await U.deriveEcdhSharedSecret(ephemeral.privateJwk, receiverPublicJwk);
    const salt = U.randomBytes(32);
    const nonce = U.randomBytes(12);
    const keys = await U.deriveHcsKeys(shared, salt);
    const signed = await makeSignedPlainPackage(message, senderPrivateSchnorrKey);
    const plainBodyBytes = U.utf8ToBytes(U.stableStringify(signed.packageObj));
    const encryptedBodyLen = plainBodyBytes.length + 16;

    const baseHeader = {
      magic: T.MAGIC,
      version: T.VERSION,
      suite: SUITE,
      createdAt: new Date().toISOString(),
      ephemeralEcdhPublicJwk: ephemeral.publicJwk,
      saltB64: U.bytesToBase64(salt),
      aesGcmNonceB64: U.bytesToBase64(nonce),
      bodyLen: encryptedBodyLen,
      senderSigningKeyFingerprintHex: signed.signerFingerprintHex
    };
    const finalizedHeader = T.finalizeHeader(width, height, baseHeader, encryptedBodyLen, options.stegoOptions || {});
    const encryptedBodyBytes = await U.aesGcmEncrypt128(keys.aesKey, nonce, plainBodyBytes, finalizedHeader.aadBytes);
    if (encryptedBodyBytes.length !== encryptedBodyLen) throw new Error('Unexpected AES-GCM body length.');
    const embed = T.embedPackage(imageData, width, height, finalizedHeader, encryptedBodyBytes, keys.stegoSeed, options);
    return {
      embed,
      header: finalizedHeader.header,
      encryptedBodyBytes,
      plainBodyBytes,
      crypto: {
        suite: SUITE,
        ecdhCurve: 'P-256',
        aesKeyBits: 128,
        saltB64: U.bytesToBase64(salt),
        nonceB64: U.bytesToBase64(nonce),
        senderSigningKeyFingerprintHex: signed.signerFingerprintHex
      }
    };
  }

  async function extractDecryptVerify(imageData, width, height, receiverPrivateJwk, trustedSenderPublicSchnorrKey) {
    U.assertSecureContext();
    U.validateEcdhPrivateJwk(receiverPrivateJwk, 'Receiver private decryption key');
    if (!trustedSenderPublicSchnorrKey || !trustedSenderPublicSchnorrKey.y) {
      throw new Error('Trusted sender public Schnorr verification key is required.');
    }

    const extractedHeader = T.extractHeader(imageData, width, height);
    const header = extractedHeader.header;
    const salt = U.base64ToBytes(header.saltB64);
    const nonce = U.base64ToBytes(header.aesGcmNonceB64);
    const shared = await U.deriveEcdhSharedSecret(receiverPrivateJwk, header.ephemeralEcdhPublicJwk);
    const keys = await U.deriveHcsKeys(shared, salt);
    const encryptedBodyBytes = T.extractBody(imageData, width, height, extractedHeader, keys.stegoSeed);
    const plainBodyBytes = await U.aesGcmDecrypt128(keys.aesKey, nonce, encryptedBodyBytes, extractedHeader.aadBytes);
    const packageObj = JSON.parse(U.bytesToUtf8(plainBodyBytes));
    const signature = packageObj.signature;
    const signedCore = JSON.parse(JSON.stringify(packageObj));
    delete signedCore.signature;
    const signedBytes = U.utf8ToBytes(U.stableStringify(signedCore));
    const signatureValid = await S.schnorrVerify(signedBytes, signature, trustedSenderPublicSchnorrKey, 'HCS-v1 plaintext package');
    const trustedFingerprintHex = await U.fingerprintHex(trustedSenderPublicSchnorrKey);
    const fingerprintMatches = trustedFingerprintHex === header.senderSigningKeyFingerprintHex &&
      trustedFingerprintHex === packageObj.sender.signingKeyFingerprintHex;
    const messageBytes = U.base64ToBytes(packageObj.messageUtf8B64);
    const messageSha256Hex = U.bytesToHex(await U.sha256(messageBytes));
    const hashValid = messageSha256Hex === packageObj.messageSha256Hex;

    return {
      message: U.bytesToUtf8(messageBytes),
      packageObj,
      header,
      extractedHeader,
      encryptedBodyBytes,
      verification: {
        signatureValid,
        fingerprintMatches,
        hashValid,
        trustedFingerprintHex,
        headerFingerprintHex: header.senderSigningKeyFingerprintHex
      }
    };
  }

  function formatJson(value) {
    return JSON.stringify(value, null, 2);
  }

  function requireCoverImage(file) {
    if (!file) throw new Error('Choose a cover image.');
    const name = (file.name || '').toLowerCase();
    const allowedType = !file.type || file.type === 'image/png' || file.type === 'image/jpeg';
    const allowedName = !name || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg');
    if (!allowedType || !allowedName) throw new Error('Use a PNG or JPG cover image. The stego output will still be saved as PNG.');
  }

  function requireStegoPng(file) {
    if (!file) throw new Error('Choose a stego PNG image.');
    if (file.type && file.type !== 'image/png') throw new Error('Stego image must be PNG. JPEG/WebP recompression destroys LSB data.');
    if (!file.name.toLowerCase().endsWith('.png') && !file.type) throw new Error('Use the downloaded stego PNG image.');
  }

  window.HybridStego = {
    ...U,
    generateSchnorrKeyPair: S.generateSchnorrKeyPair,
    schnorrSign: S.schnorrSign,
    schnorrVerify: S.schnorrVerify,
    SCHNORR_PARAMS: S.SCHNORR_PARAMS,
    stego: T,
    encryptSignEmbed,
    extractDecryptVerify,
    formatJson,
    requireCoverImage,
    requireStegoPng,
    requirePng: requireStegoPng,
    loadImageToCanvas: T.loadImageToCanvas,
    canvasToPngBlob: T.canvasToPngBlob,
    computeImageMetrics: T.computeImageMetrics,
    describeStego: T.describeStego,
    SUITE
  };
})();
