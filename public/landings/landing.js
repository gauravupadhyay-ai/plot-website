(function () {
  document.querySelectorAll('.hero-media').forEach(function (media) {
    var slides = media.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 5500);
  });

  var form = document.getElementById('lead-form');
  var status = document.getElementById('form-status');
  if (!form) return;

  var title = form.getAttribute('data-title') || 'this plot';
  var code = form.getAttribute('data-code') || '';
  var locationText = form.getAttribute('data-location') || '';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('lead-name').value.trim();
    var phone = document.getElementById('lead-phone').value.trim();
    var email = document.getElementById('lead-email').value.trim();
    if (!name || !phone) return;

    var message =
      "Hi! I'm " +
      name +
      ' (' +
      phone +
      (email ? ', ' + email : '') +
      "). I'm interested in " +
      title +
      (code ? ' (' + code + ')' : '') +
      (locationText ? ' at ' + locationText : '') +
      '. Please share availability and pricing.';

    var payload = {
      name: name,
      phone: phone,
      email: email || undefined,
      propertyType: 'Plot',
      propertyCode: code || undefined,
      message: message,
      source: window.location.pathname,
    };

    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(function () {});

    var waUrl = 'https://wa.me/919458454789?text=' + encodeURIComponent(message);
    if (status) {
      status.hidden = false;
      status.textContent = 'Thanks, ' + name.split(' ')[0] + " — opening WhatsApp to confirm with our team now.";
    }
    window.open(waUrl, '_blank', 'noopener');
    form.reset();
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
