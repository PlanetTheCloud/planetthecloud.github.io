(function () {
  'use strict';

  function init() {
    const H = window.HybridStego;
    const $ = (id) => document.getElementById(id);
    if (!$('keyToolsPage')) return;

    function setStatus(message, type = 'secondary') {
      const el = $('status');
      el.className = `alert alert-${type}`;
      el.textContent = message;
      el.classList.remove('d-none');
    }

    function wireCopy(buttonId, textareaId) {
      $(buttonId).addEventListener('click', async () => {
        const value = $(textareaId).value.trim();
        if (!value) return;
        await H.copyText(value);
        setStatus('Copied to clipboard.', 'success');
      });
    }

    function wireDownload(buttonId, textareaId, filename) {
      $(buttonId).addEventListener('click', () => {
        const value = $(textareaId).value.trim();
        if (!value) return;
        H.downloadJson(filename, JSON.parse(value));
      });
    }

    $('generateEcdh').addEventListener('click', async () => {
      try {
        setStatus('Generating ECDH P-256 key pair...', 'info');
        const keys = await H.generateEcdhKeyPair();
        $('ecdhPublic').value = H.formatJson(keys.publicJwk);
        $('ecdhPrivate').value = H.formatJson(keys.privateJwk);
        setStatus('ECDH P-256 key pair generated. Share only the public key.', 'success');
      } catch (error) {
        setStatus(error.message, 'danger');
      }
    });

    $('generateSchnorr').addEventListener('click', async () => {
      try {
        setStatus('Generating Schnorr signing key pair...', 'info');
        const keys = await H.generateSchnorrKeyPair();
        $('schnorrPublic').value = H.formatJson(keys.publicKey);
        $('schnorrPrivate').value = H.formatJson(keys.privateKey);
        setStatus('Schnorr key pair generated. Share only the public verification key.', 'success');
      } catch (error) {
        setStatus(error.message, 'danger');
      }
    });

    wireCopy('copyEcdhPublic', 'ecdhPublic');
    wireCopy('copyEcdhPrivate', 'ecdhPrivate');
    wireCopy('copySchnorrPublic', 'schnorrPublic');
    wireCopy('copySchnorrPrivate', 'schnorrPrivate');
    wireDownload('downloadEcdhPublic', 'ecdhPublic', 'receiver-ecdh-p256-public.jwk.json');
    wireDownload('downloadEcdhPrivate', 'ecdhPrivate', 'receiver-ecdh-p256-private.jwk.json');
    wireDownload('downloadSchnorrPublic', 'schnorrPublic', 'sender-schnorr-public.json');
    wireDownload('downloadSchnorrPrivate', 'schnorrPrivate', 'sender-schnorr-private.json');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
