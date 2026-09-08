(function () {
  document.querySelectorAll('.hero-media').forEach(function (media) {
    var slides = media.querySelectorAll('.hero-slide')
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    var i = 0
    setInterval(function () {
      slides[i].classList.remove('is-active')
      i = (i + 1) % slides.length
      slides[i].classList.add('is-active')
    }, 5500)
  })

  var modal = document.getElementById('lead-modal')
  var form = document.getElementById('lead-form')
  var status = document.getElementById('form-status')
  var formPanel = document.getElementById('lead-form-panel')
  var thanks = document.getElementById('lead-thanks')
  var submitBtn = document.getElementById('lead-submit')
  var SENT_KEY = 'aurixx-lead-sent'
  var shownMarks = { 25: false, 50: false, 100: false }

  function hasSent() {
    try {
      return sessionStorage.getItem(SENT_KEY) === '1'
    } catch (err) {
      return false
    }
  }

  function markSent() {
    try {
      sessionStorage.setItem(SENT_KEY, '1')
    } catch (err) {}
  }

  function isOpen() {
    return modal && !modal.hasAttribute('hidden')
  }

  function showThanks() {
    if (formPanel) formPanel.hidden = true
    if (thanks) thanks.hidden = false
  }

  function showForm() {
    if (formPanel) formPanel.hidden = false
    if (thanks) thanks.hidden = true
  }

  function openLead() {
    if (!modal) return
    if (hasSent()) showThanks()
    else showForm()
    modal.removeAttribute('hidden')
    document.body.classList.add('lead-modal-open')
    var first = document.getElementById('lead-name')
    if (first && !hasSent()) {
      setTimeout(function () {
        first.focus()
      }, 50)
    }
  }

  function closeLead() {
    if (!modal) return
    modal.setAttribute('hidden', '')
    document.body.classList.remove('lead-modal-open')
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest && e.target.closest('.js-open-lead')
    if (opener) {
      e.preventDefault()
      openLead()
      return
    }
    if (e.target.closest && e.target.closest('.js-close-lead')) {
      e.preventDefault()
      closeLead()
    }
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) closeLead()
  })

  function scrollProgress() {
    var doc = document.documentElement
    var max = doc.scrollHeight - window.innerHeight
    if (max <= 0) return 1
    return window.scrollY / max
  }

  function checkScrollPopups() {
    if (hasSent() || isOpen()) return
    var p = scrollProgress()
    if (p >= 0.98 && !shownMarks[100]) {
      shownMarks[100] = true
      openLead()
      return
    }
    if (p >= 0.5 && !shownMarks[50]) {
      shownMarks[50] = true
      openLead()
      return
    }
    if (p >= 0.25 && !shownMarks[25]) {
      shownMarks[25] = true
      openLead()
    }
  }

  window.addEventListener('scroll', checkScrollPopups, { passive: true })
  window.addEventListener('load', checkScrollPopups)

  if (form) {
    var title = form.getAttribute('data-title') || 'this plot'
    var code = form.getAttribute('data-code') || ''
    var locationText = form.getAttribute('data-location') || ''

    form.addEventListener('submit', function (e) {
      e.preventDefault()
      var name = document.getElementById('lead-name').value.trim()
      var phone = document.getElementById('lead-phone').value.trim()
      var email = document.getElementById('lead-email').value.trim()
      if (!name || !phone) {
        if (status) {
          status.hidden = false
          status.textContent = 'Please add your name and phone number so we can share pricing.'
        }
        return
      }

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
        '. Please share availability and pricing.'

      var payload = {
        name: name,
        phone: phone,
        email: email || undefined,
        propertyType: 'Plot',
        propertyCode: code || undefined,
        message: message,
        source: window.location.pathname,
      }

      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.textContent = 'Sending...'
      }

      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error('send failed')
          markSent()
          form.reset()
          showThanks()
        })
        .catch(function () {
          if (status) {
            status.hidden = false
            status.textContent = 'We could not send this just now. Please call +91 94584 54789 or try again.'
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.textContent = 'Get Pricing & Availability'
          }
        })
    })
  }

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.reveal')
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(function (el) {
      io.observe(el)
    })
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible')
    })
  }
})()
