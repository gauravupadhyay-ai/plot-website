(function () {
  var form = document.getElementById('lead-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('lead-name').value.trim();
      var phone = document.getElementById('lead-phone').value.trim();
      var emailEl = document.getElementById('lead-email');
      var email = emailEl ? emailEl.value.trim() : '';
      if (!name || !phone) { return; }
      var message = "Hi! I'm " + name + " (" + phone + (email ? ", " + email : "") +
        "). I'm interested in Expressway Residency (AX-YE-001) at Yamuna Expy, 53 Milestone, Simrauthi, Uttar Pradesh 202165. Please share availability and pricing.";
      var waUrl = "https://wa.me/919458454789?text=" + encodeURIComponent(message);
      if (status) {
        status.hidden = false;
        status.textContent = "Thanks, " + name.split(' ')[0] + " — opening WhatsApp to confirm with our team now.";
      }
      window.open(waUrl, '_blank', 'noopener');
      form.reset();
    });
  }

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
