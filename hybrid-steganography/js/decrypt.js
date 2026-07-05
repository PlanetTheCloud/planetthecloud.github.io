(function () {
  'use strict';

  function init() {
    const H = window.HybridStego;
    const $ = (id) => document.getElementById(id);
    if (!$('decryptPage')) return;

    function setStatus(message, type = 'secondary') {
      const el = $('status');
      el.className = `alert alert-${type}`;
      el.textContent = message;
      el.classList.remove('d-none');
    }

    function showJson(id, value) {
      $(id).textContent = H.formatJson(value);
    }

    async function loadFileToTextarea(inputId, textareaId) {
      const file = $(inputId).files[0];
      if (!file) return;
      $(textareaId).value = await file.text();
    }

    $('receiverPrivateFile').addEventListener('change', () => loadFileToTextarea('receiverPrivateFile', 'receiverPrivateKey'));
    $('senderPublicFile').addEventListener('change', () => loadFileToTextarea('senderPublicFile', 'senderPublicKey'));

    $('decryptForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        $('plaintext').value = '';
        $('details').textContent = '';
        setStatus('Extracting fixed header, regenerating modulo generator route and LCG S1/S2, decrypting, and verifying...', 'info');
        const file = $('stegoImage').files[0];
        H.requireStegoPng(file);
        const receiverPrivate = H.parseJson($('receiverPrivateKey').value, 'Receiver private ECDH key');
        const senderPublic = H.parseJson($('senderPublicKey').value, 'Trusted sender public Schnorr key');
        const loaded = await H.loadImageToCanvas(file);
        const t0 = performance.now();
        const result = await H.extractDecryptVerify(
          loaded.imageData,
          loaded.canvas.width,
          loaded.canvas.height,
          receiverPrivate,
          senderPublic
        );
        const t1 = performance.now();

        $('plaintext').value = result.message;
        const trusted = result.verification.signatureValid &&
          result.verification.fingerprintMatches &&
          result.verification.hashValid;
        showJson('details', {
          suite: result.header.suite,
          header: {
            createdAt: result.header.createdAt,
            bodyLen: result.header.bodyLen,
            reservedHeaderPixels: result.header.stego.bodyMode.reservedHeaderPixels,
            mode: 'fixed sequential RGB, 1 LSB'
          },
          body: {
            encryptedBytes: result.encryptedBodyBytes.length,
            extraction: 'Modulo-prime pixel route with ECDH/HKDF-derived LCG S1 channels and S2 bit counts',
            pixelOrder: result.header.stego.bodyMode.pixelOrder,
            modulo: result.header.stego.bodyMode.modulo,
            lcg: result.header.stego.bodyMode.lcg
          },
          stego: H.describeStego(result.header),
          verification: result.verification,
          message: {
            createdAt: result.packageObj.createdAt,
            sha256Hex: result.packageObj.messageSha256Hex
          },
          runtimeMs: Number((t1 - t0).toFixed(2))
        });

        if (trusted) {
          setStatus('Decryption successful. Signature, sender fingerprint, and message hash are valid.', 'success');
        } else {
          setStatus('Decryption succeeded, but signature, sender fingerprint, or message hash did not verify. Do not trust the message.', 'danger');
        }
      } catch (error) {
        console.error(error);
        setStatus(error.message, 'danger');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
