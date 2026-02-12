(function () {
  'use strict';

  var overlay = null;
  var previewImg = null;
  var closeBtn = null;

  function createOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var content = document.createElement('div');
    content.className = 'lightbox-content';

    previewImg = document.createElement('img');
    previewImg.alt = 'Preview';
    content.appendChild(previewImg);

    closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close preview');
    content.appendChild(closeBtn);

    overlay.appendChild(content);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', onKeyDown);
    previewImg.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    content.addEventListener('click', function (e) {
      if (e.target === content) close();
    });

    return overlay;
  }

  function open(src, alt) {
    createOverlay();
    previewImg.src = src;
    previewImg.alt = alt || 'Preview';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  function onKeyDown(e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
      close();
    }
  }

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName !== 'IMG') return;
    var link = target.closest('a');
    if (link && link.href) {
      var href = link.getAttribute('href');
      if (href.indexOf('biography.html') !== -1 || href.indexOf('blog1.html') !== -1 || href.indexOf('blog2.html') !== -1 || href.indexOf('blog3.html') !== -1) {
        return;
      }
    }
    var src = target.currentSrc || target.src;
    if (!src) return;
    e.preventDefault();
    e.stopPropagation();
    open(src, target.alt || '');
  }, true);
})();
