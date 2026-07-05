# Hybrid Crypto Steganography with LCG-LSB

A browser-based coursework project for hiding encrypted and signed messages inside images. The app combines hybrid cryptography with PNG LSB steganography: plaintext is signed, encrypted, embedded into image pixels, extracted, decrypted, and verified entirely in the browser.

> This project is educational. It demonstrates cryptographic and steganographic concepts, but it is not a production security tool.

## Features

- Generate ECDH P-256 encryption key pairs.
- Generate educational Schnorr finite-field signing key pairs.
- Encrypt plaintext with ECDH, HKDF-SHA-256, and AES-GCM-128.
- Sign plaintext packages before encryption.
- Embed encrypted payloads into PNG output using LSB steganography.
- Use a two-stage stego format:
  - Stage A: public bootstrap/header in fixed sequential RGB, 1 LSB.
  - Stage B: encrypted body using modulo-prime pixel ordering and LCG-selected channels/bit counts.
- Extract, decrypt, and verify stego PNG files.
- Compare original and stego images with MSE, PSNR, changed pixels, changed RGB samples, and a visual diff image.

## Live Demo

If GitHub Pages is enabled for this repository, the app can be served as a static site:

[https://planetthecloud.github.io/hybrid-steganography](https://planetthecloud.github.io/hybrid-steganography)

For local testing, use `localhost` or HTTPS so the browser allows the Web Crypto API.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Project landing and workflow navigation |
| `key-tools.html` | Generate ECDH and Schnorr key pairs |
| `encrypt.html` | Encrypt, sign, and embed a message into a stego PNG |
| `decrypt.html` | Extract, decrypt, and verify a stego PNG |
| `compare.html` | Compare original and stego images |
| `test_e2e.html` | Manual end-to-end test checklist |

## Cryptographic and Steganographic Design

The active suite is:

```text
ECDH-P256_HKDF-SHA256_AES-128-GCM_SCHNORR-FFC-SHA256_MODPRIME-LCG-LSB
```

Encryption flow:

1. The sender creates a canonical plaintext package.
2. The package is signed with the sender Schnorr private key.
3. An ephemeral ECDH P-256 key pair is generated.
4. ECDH shared secret + random salt are passed through HKDF-SHA-256.
5. HKDF derives an AES-GCM key and a stego seed.
6. AES-GCM encrypts the signed package with the public header bound as AAD.
7. The public header is embedded in Stage A.
8. The encrypted body is embedded in Stage B.

Extraction flow:

1. The receiver reads the Stage A public bootstrap/header.
2. The receiver derives the same ECDH shared secret using their private key and the embedded ephemeral public key.
3. HKDF regenerates the AES-GCM key and stego seed.
4. The app regenerates the modulo-prime pixel route and LCG S1/S2 stream.
5. The encrypted body is extracted and decrypted.
6. Signature, sender fingerprint, and message hash are verified.

## Stego Format Summary

| Section | Embedded data | Visibility |
| --- | --- | --- |
| Bootstrap | Magic, version, suite id, header length, body length | Public |
| Public header | Ephemeral ECDH public key, salt, nonce, sender fingerprint, stego metadata | Public |
| Encrypted body | AES-GCM ciphertext plus authentication tag | Confidential |
| Private keys | Not embedded | Must remain secret |
| Derived secrets | Not embedded | Must remain secret |
| Plaintext | Not embedded directly | Available only after successful decryption |

Stage B uses this modulo-prime route:

```text
pixelIndex = reservedHeaderPixels + (g^i mod P) - 1
```

The LCG controls:

- S1: channel selection among `R`, `G`, `B`, `RG`, `RB`, `GB`, and `RGB`.
- S2: bit count per selected channel, from 1 to 3 LSBs.

## Requirements

- A modern browser with Web Crypto API support, such as Chrome, Edge, or Firefox.
- A secure browser context:
  - `http://localhost`
  - `http://127.0.0.1`
  - HTTPS
- Internet access for Bootstrap CDN styling, unless Bootstrap is vendored locally.

No build step or package installation is required.

## Run Locally

From the project directory:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Direct page links:

```text
http://localhost:8000/key-tools.html
http://localhost:8000/encrypt.html
http://localhost:8000/decrypt.html
http://localhost:8000/compare.html
http://localhost:8000/test_e2e.html
```

## Basic Workflow

1. Open `key-tools.html`.
2. Generate an ECDH P-256 key pair for the receiver.
3. Generate a Schnorr key pair for the sender.
4. Open `encrypt.html`.
5. Choose a PNG or JPG cover image.
6. Enter the plaintext message.
7. Paste the receiver ECDH public key.
8. Paste the sender Schnorr private key.
9. Keep modulo settings on auto, or provide a valid prime `P` and primitive root `g`.
10. Click **Encrypt & Sign** and download the generated PNG.
11. Open `decrypt.html`.
12. Upload the stego PNG.
13. Paste the receiver ECDH private key.
14. Paste the trusted sender Schnorr public key.
15. Click **Decrypt & Verify**.
16. Open `compare.html` to compare the original image and stego PNG.

Expected result:

- Plaintext is recovered.
- AES-GCM decryption succeeds only with the matching receiver private key and unmodified stego data.
- Schnorr signature verification succeeds with the trusted sender public key.
- Sender fingerprint and message hash checks pass.
- Image quality metrics are displayed.

## Testing

Manual test instructions are available in:

- `test_e2e.html`
- `specs/README.md`

## Project Structure

```text
.
|-- index.html
|-- key-tools.html
|-- encrypt.html
|-- decrypt.html
|-- compare.html
|-- test_e2e.html
|-- css/
|   |-- app.css
|   `-- hacker-new.css
|-- js/
    |-- main.js
    |-- key-tools.js
    |-- encrypt.js
    |-- decrypt.js
    |-- compare.js
    `-- core/
        |-- utils.js
        |-- schnorr.js
        `-- stego.js
```

## Security Notes

- LSB steganography is fragile. Recompression, resizing, cropping, screenshots, color transforms, and lossy formats can destroy hidden data.
- PNG must be used for stego output and decryption input.
- JPG cover images are accepted only because the browser decodes them to Canvas `ImageData` before embedding.
- LCG is used for coursework demonstration and is not a cryptographically secure PRNG.
- The Schnorr implementation is educational and not constant-time.
- Confidentiality depends primarily on ECDH, HKDF, and AES-GCM, not on the hidden nature of LSB data.
- Do not publish private keys, shared secrets, generated plaintext, or sensitive stego images.

## License

Copyright 2026 PlanetTheCloud

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.