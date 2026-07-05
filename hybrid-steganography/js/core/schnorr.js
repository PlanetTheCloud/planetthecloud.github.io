/*
  Educational finite-field Schnorr signing for coursework.
  This is not constant-time; use it here for the requested demo signature layer.
*/
(function () {
  'use strict';

  const U = window.HybridStegoUtils;
  if (!U) throw new Error('HybridStegoUtils must be loaded before js/core/schnorr.js.');

  const {
    bytesToHex,
    hexToBytes,
    utf8ToBytes,
    concatBytes,
    uint32ToBytes,
    sha256,
    randomBytes
  } = U;

  const SCHNORR_PARAMS = {
    name: 'OpenSSL-DSA-2048-224-demo-group',
    p: 'aa661a33d719d48aecab9372ab60c1669a1e50e641a60038d2ccff14a8dd2088f3db20b3305607457b92434f76b0c12f8577ef028b8bd94a2815a42ea134ba6543aa56f21ac7746cbc80114d37fa4fcfa0978cb6d1178b8622cd9feb182808823bd09b1cb69d6435984c58f6d9c1eb1f943f7e6158ac996e38c6a6e6d0b9fc8e58381dd2829ef063c9227bdc9fad4b8786ff3f1f3bc462aeda62705050a61b386d14d3f38641f6e2964cb422cf97e6d5bbd9d5e73ed2b72c7654d242671710d167417c49246ac8d8ad4d734202abebae29712e00c030789a888e28e1bbae09b9ed76a9b13cbcbcaa2cbab90062b090c5e8ebd8d4e3eb9489438ac82e7ff88ff5',
    q: 'f3e69950c0b8109d7dc71374e4786c3d6104ddf551a0f40068d081f3',
    g: '51e393f9672efc8117594771722e96433ed66dafdfd8080281a05c30b59241fac046c986def7a77acd125651be57029872205eaf3f9919be0820631a82495383a2cbf0e341b622aad97775118adb8fa28812cc7053425ab0f446359898baf5f86e2971f00503baf3bd247da4158730d01dc03f4d4c5a9e7baeb0041d5f54497529c49d65c8ccc192c717fb27c14fc11a579d2224095113a205282da5e9551a242be5b217ae60299c6b5d702890b9813ebda4a7000ebf35ad880414fd5e236c93628bf6609e93bb8e328f23e93e6e80621adde93d009c77f43d2c7fb4ba3efb81d33e251180f8241995d63ee236c2be23ae1326b488944957dabf7a635c271b7f'
  };

  function big(hexOrBig) {
    if (typeof hexOrBig === 'bigint') return hexOrBig;
    return BigInt('0x' + String(hexOrBig).replace(/^0x/i, '').replace(/[^0-9a-f]/gi, ''));
  }

  const P = big(SCHNORR_PARAMS.p);
  const Q = big(SCHNORR_PARAMS.q);
  const G = big(SCHNORR_PARAMS.g);
  const Q_BYTES = Math.ceil(SCHNORR_PARAMS.q.length / 2);
  const P_BYTES = Math.ceil(SCHNORR_PARAMS.p.length / 2);

  function mod(a, m) {
    const r = a % m;
    return r >= 0n ? r : r + m;
  }

  function modPow(base, exp, m) {
    base = mod(base, m);
    let result = 1n;
    while (exp > 0n) {
      if (exp & 1n) result = (result * base) % m;
      base = (base * base) % m;
      exp >>= 1n;
    }
    return result;
  }

  function bigintToFixedBytes(n, len) {
    let hex = n.toString(16);
    if (hex.length > len * 2) throw new Error('BigInt too large for fixed byte length.');
    return hexToBytes(hex.padStart(len * 2, '0'));
  }

  function randomScalarQ() {
    while (true) {
      const r = big(bytesToHex(randomBytes(Q_BYTES))) % Q;
      if (r > 0n) return r;
    }
  }

  async function challenge(V, y, messageBytes, context) {
    const label = utf8ToBytes(context || 'HCS-v1 Schnorr signature');
    const parts = [
      bigintToFixedBytes(G, P_BYTES),
      bigintToFixedBytes(V, P_BYTES),
      bigintToFixedBytes(y, P_BYTES),
      label,
      messageBytes
    ];
    const framed = concatBytes(...parts.map((part) => concatBytes(uint32ToBytes(part.length), part)));
    return big(bytesToHex(await sha256(framed))) % Q;
  }

  async function generateSchnorrKeyPair() {
    const x = randomScalarQ();
    const y = modPow(G, x, P);
    return {
      privateKey: {
        scheme: 'Schnorr-FFC-SHA256',
        params: SCHNORR_PARAMS.name,
        x: x.toString(16),
        y: y.toString(16)
      },
      publicKey: {
        scheme: 'Schnorr-FFC-SHA256',
        params: SCHNORR_PARAMS.name,
        y: y.toString(16)
      }
    };
  }

  async function schnorrSign(messageBytes, privateKey, context) {
    if (!privateKey || !privateKey.x) throw new Error('Sender Schnorr private signing key is required.');
    const x = big(privateKey.x);
    const y = privateKey.y ? big(privateKey.y) : modPow(G, x, P);
    const v = randomScalarQ();
    const V = modPow(G, v, P);
    const c = await challenge(V, y, messageBytes, context);
    const r = mod(v - x * c, Q);
    return {
      scheme: 'Schnorr-FFC-SHA256',
      params: SCHNORR_PARAMS.name,
      c: c.toString(16),
      r: r.toString(16),
      y: y.toString(16)
    };
  }

  async function schnorrVerify(messageBytes, signature, publicKey, context) {
    if (!signature || !signature.c || !signature.r) return false;
    const y = big((publicKey && publicKey.y) || signature.y);
    const c = big(signature.c);
    const r = big(signature.r);
    if (y <= 1n || y >= P) return false;
    if (modPow(y, Q, P) !== 1n) return false;
    const V = (modPow(G, r, P) * modPow(y, c, P)) % P;
    return (await challenge(V, y, messageBytes, context)) === c;
  }

  window.HybridStegoSchnorr = {
    SCHNORR_PARAMS,
    generateSchnorrKeyPair,
    schnorrSign,
    schnorrVerify
  };
})();
