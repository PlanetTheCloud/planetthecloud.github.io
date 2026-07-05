(function () {
  'use strict';

  function init() {
    const H = window.HybridStego;
    const $ = (id) => document.getElementById(id);
    if (!$('comparePage')) return;

    let originalUrl = null;
    let candidateUrl = null;
    let latestDiffBlobUrl = null;

    function setStatus(message, type = 'secondary') {
      const el = $('status');
      el.className = `alert alert-${type}`;
      el.textContent = message;
      el.classList.remove('d-none');
    }

    function formatNumber(value, digits = 0) {
      if (value === Infinity || value === 'Infinity') return 'Infinity';
      if (typeof value !== 'number') return value;
      return value.toLocaleString(undefined, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      });
    }

    function metricTile(label, value, detail, tone = 'primary') {
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

    function setPreview(inputId, imageId, currentUrl) {
      const file = $(inputId).files[0];
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      if (!file) {
        $(imageId).classList.add('d-none');
        return null;
      }
      const nextUrl = URL.createObjectURL(file);
      $(imageId).src = nextUrl;
      $(imageId).classList.remove('d-none');
      return nextUrl;
    }

    function resetOutput() {
      $('metricsSummary').textContent = '';
      $('metrics').textContent = '';
      $('coordinateNote').textContent = '';
      $('diffRows').textContent = '';
      $('diffCanvas').classList.add('d-none');
      $('downloadDiff').classList.add('d-none');
      if (latestDiffBlobUrl) URL.revokeObjectURL(latestDiffBlobUrl);
      latestDiffBlobUrl = null;
    }

    function makeDiffImage(originalImageData, candidateImageData) {
      const width = originalImageData.width;
      const height = originalImageData.height;
      const original = originalImageData.data;
      const candidate = candidateImageData.data;
      const diff = new ImageData(width, height);
      const rows = [];
      let changedPixels = 0;
      const maxRows = 500;

      for (let i = 0, pixel = 0; i < original.length; i += 4, pixel++) {
        const dr = candidate[i] - original[i];
        const dg = candidate[i + 1] - original[i + 1];
        const db = candidate[i + 2] - original[i + 2];
        const maxDelta = Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));
        const changed = maxDelta > 0;

        if (changed) {
          changedPixels++;
          diff.data[i] = 255;
          diff.data[i + 1] = Math.max(48, 255 - maxDelta * 8);
          diff.data[i + 2] = 216;
          diff.data[i + 3] = 255;

          if (rows.length < maxRows) {
            rows.push({
              index: changedPixels,
              x: pixel % width,
              y: Math.floor(pixel / width),
              r: `${original[i]}->${candidate[i]}`,
              g: `${original[i + 1]}->${candidate[i + 1]}`,
              b: `${original[i + 2]}->${candidate[i + 2]}`,
              maxDelta
            });
          }
        } else {
          const gray = Math.round((original[i] * 0.2126) + (original[i + 1] * 0.7152) + (original[i + 2] * 0.0722));
          const dim = Math.round(gray * 0.24);
          diff.data[i] = dim;
          diff.data[i + 1] = dim;
          diff.data[i + 2] = dim;
          diff.data[i + 3] = 255;
        }
      }

      return { imageData: diff, rows, changedPixels, maxRows };
    }

    function renderDiffRows(diff) {
      const tbody = $('diffRows');
      tbody.textContent = '';
      for (const entry of diff.rows) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${entry.index}</td>
          <td>${entry.x}</td>
          <td>${entry.y}</td>
          <td>${entry.r}</td>
          <td>${entry.g}</td>
          <td>${entry.b}</td>
          <td>${entry.maxDelta}</td>
        `;
        tbody.appendChild(row);
      }
      if (!diff.changedPixels) {
        $('coordinateNote').textContent = 'No RGB pixel differences were found.';
      } else if (diff.changedPixels > diff.maxRows) {
        $('coordinateNote').textContent = `Showing the first ${formatNumber(diff.maxRows)} of ${formatNumber(diff.changedPixels)} modified pixels.`;
      } else {
        $('coordinateNote').textContent = `Showing all ${formatNumber(diff.changedPixels)} modified pixels.`;
      }
    }

    function renderMetrics(raw) {
      const wrap = $('metricsSummary');
      wrap.textContent = '';
      const psnrValue = raw.psnrDb === 'Infinity' ? 'Infinity' : `${formatNumber(raw.psnrDb, 4)} dB`;
      const tone = raw.maxAbsRgbError > 3 ? 'warning' : raw.changedPixels ? 'success' : 'primary';
      wrap.appendChild(metricTile('MSE', formatNumber(raw.mse, 10), 'Mean squared RGB error', tone));
      wrap.appendChild(metricTile('PSNR', psnrValue, 'Peak signal-to-noise ratio', tone));
      wrap.appendChild(metricTile('Changed pixels', formatNumber(raw.changedPixels), `${formatNumber(raw.changedPixelPercent, 4)}% of ${formatNumber(raw.pixelCount)} pixels`, tone));
      wrap.appendChild(metricTile('Changed RGB samples', formatNumber(raw.changedRgbSamples), `${formatNumber(raw.totalRgbSamples)} RGB samples compared`, tone));
      wrap.appendChild(metricTile('Max RGB delta', formatNumber(raw.maxAbsRgbError), 'Largest absolute channel difference', tone));
      wrap.appendChild(metricTile('Dimensions', raw.dimensions, 'Original and candidate match', 'primary'));
      $('metrics').textContent = H.formatJson(raw);
    }

    $('originalImage').addEventListener('change', () => {
      originalUrl = setPreview('originalImage', 'originalPreview', originalUrl);
      resetOutput();
    });

    $('candidateImage').addEventListener('change', () => {
      candidateUrl = setPreview('candidateImage', 'candidatePreview', candidateUrl);
      resetOutput();
    });

    $('downloadDiff').addEventListener('click', () => {
      if (!latestDiffBlobUrl) return;
      const link = document.createElement('a');
      link.href = latestDiffBlobUrl;
      link.download = 'hcs-image-diff.png';
      link.click();
    });

    $('compareForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        resetOutput();
        const originalFile = $('originalImage').files[0];
        const candidateFile = $('candidateImage').files[0];
        if (!originalFile || !candidateFile) throw new Error('Choose both images.');

        setStatus('Loading images and comparing RGB pixels...', 'info');
        const original = await H.loadImageToCanvas(originalFile);
        const candidate = await H.loadImageToCanvas(candidateFile);
        if (original.canvas.width !== candidate.canvas.width || original.canvas.height !== candidate.canvas.height) {
          throw new Error(`Image dimensions must match. Original is ${original.canvas.width}x${original.canvas.height}; candidate is ${candidate.canvas.width}x${candidate.canvas.height}.`);
        }

        const t0 = performance.now();
        const metrics = H.computeImageMetrics(original.imageData, candidate.imageData);
        const diff = makeDiffImage(original.imageData, candidate.imageData);
        const t1 = performance.now();
        const raw = {
          dimensions: `${original.canvas.width}x${original.canvas.height}`,
          pixelCount: original.canvas.width * original.canvas.height,
          totalRgbSamples: original.canvas.width * original.canvas.height * 3,
          mse: Number(metrics.mse.toFixed(10)),
          psnrDb: metrics.psnr === Infinity ? 'Infinity' : Number(metrics.psnr.toFixed(4)),
          changedPixels: metrics.changedPixels,
          changedPixelPercent: Number(metrics.changedPixelPercent.toFixed(4)),
          changedRgbSamples: metrics.changedRgbSamples,
          maxAbsRgbError: metrics.maxAbsRgbError,
          alphaCompared: false,
          runtimeMs: Number((t1 - t0).toFixed(2))
        };

        const canvas = $('diffCanvas');
        canvas.width = original.canvas.width;
        canvas.height = original.canvas.height;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(diff.imageData, 0, 0);
        canvas.classList.remove('d-none');

        const blob = await H.canvasToPngBlob(canvas);
        latestDiffBlobUrl = URL.createObjectURL(blob);
        $('downloadDiff').classList.remove('d-none');

        renderMetrics(raw);
        renderDiffRows(diff);
        setStatus(diff.changedPixels ? 'Comparison complete. Modified pixels are highlighted in the diff image.' : 'Comparison complete. The RGB pixels are identical.', 'success');
      } catch (error) {
        console.error(error);
        setStatus(error.message, 'danger');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
