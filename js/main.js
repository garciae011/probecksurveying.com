(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');

  function closeNav() {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });
  }

  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealItems.length && !reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  const form = document.querySelector('#survey-contact-form');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton ? submitButton.textContent : 'Send Message';
  const requiredMessages = {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    message: 'Please tell us a little about your project.'
  };

  function setFieldError(field, message) {
    const error = form.querySelector('#' + field.id + '-error');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message || '';
  }

  function validateField(field) {
    let message = '';
    const value = field.value.trim();

    if (field.required && !value) {
      message = requiredMessages[field.name] || 'This field is required.';
    } else if (field.type === 'email' && value && !field.validity.valid) {
      message = 'Please enter a valid email address.';
    }

    setFieldError(field, message);
    return !message;
  }

  function validateForm() {
    const fields = Array.from(form.querySelectorAll('input:not([type="hidden"]), select, textarea'));
    const results = fields.map(validateField);
    const firstInvalid = fields.find((field) => field.getAttribute('aria-invalid') === 'true');
    if (firstInvalid) firstInvalid.focus();
    return results.every(Boolean);
  }

  function showStatus(type, message) {
    if (!status) return;
    status.className = 'form-status is-visible ' + type;
    status.innerHTML = message;
  }

  form.addEventListener('input', function (event) {
    const field = event.target;
    if (field.matches('input:not([type="hidden"]), textarea')) validateField(field);
  });

  form.addEventListener('change', function (event) {
    const field = event.target;
    if (field.matches('select')) validateField(field);
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (status) status.className = 'form-status';

    if (!validateForm()) return;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        form.reset();
        form.querySelectorAll('[aria-invalid]').forEach((field) => field.setAttribute('aria-invalid', 'false'));
        form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
        showStatus('success', "Thanks! Your message has been sent. We'll get back to you soon.");
      } else {
        const message = data.message ? String(data.message) + ' ' : '';
        showStatus('error', message + 'There was a problem sending your message. Please try again, or email us directly at <a href="mailto:Larry@probecksurveying.com">Larry@probecksurveying.com</a>.');
      }
    } catch (error) {
      showStatus('error', 'There was a problem sending your message. Please try again, or email us directly at <a href="mailto:Larry@probecksurveying.com">Larry@probecksurveying.com</a>.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });
})();
