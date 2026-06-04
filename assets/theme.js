/**
 * FOR HER THRONE — THEME JAVASCRIPT
 * Config-driven: reads window.BRAND_CONFIG (set by brand.config.js).
 * No brand-specific values hardcoded here.
 */

document.addEventListener('DOMContentLoaded', () => {
  initEmailCapture();
  initStickyATC();
  initIngredientAccordion();
});

// ── Email Capture ────────────────────────────────────────────────────────────
function initEmailCapture() {
  const forms = document.querySelectorAll('.email-capture__form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('.email-capture__input');
      const btn   = form.querySelector('.btn');
      const email = input?.value?.trim();

      if (!email || !isValidEmail(email)) {
        showFormMessage(form, 'Please enter a valid email address.', 'error');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Subscribing...';

      try {
        // Shopify customer subscribe via storefront
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            form_type: 'customer',
            utf8: '✓',
            'contact[email]': email,
            'contact[tags]': 'newsletter',
          }),
        });

        if (res.ok || res.redirected) {
          showFormMessage(form, 'You\'re in. Check your inbox.', 'success');
          input.value = '';
        } else {
          throw new Error('Subscription failed');
        }
      } catch {
        showFormMessage(form, 'Something went wrong. Try again.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = btn.dataset.originalText || 'Get the research';
      }
    });

    // Store original button text
    const btn = form.querySelector('.btn');
    if (btn) btn.dataset.originalText = btn.textContent;
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(form, message, type) {
  let el = form.parentElement.querySelector('.form-message');
  if (!el) {
    el = document.createElement('p');
    el.className = 'form-message';
    el.style.cssText = `
      margin-top: 0.75rem;
      font-size: 0.875rem;
      text-align: center;
      color: ${type === 'success' ? 'var(--color-accent)' : '#ff6b6b'};
    `;
    form.parentElement.appendChild(el);
  }
  el.textContent = message;
  el.setAttribute('role', 'alert');
}

// ── Sticky ATC ───────────────────────────────────────────────────────────────
function initStickyATC() {
  const atcWrap = document.querySelector('.product-main__atc-wrap');
  if (!atcWrap) return;

  const primaryBtn = document.querySelector('.product-main__atc-btn--primary');
  const observer = new IntersectionObserver(
    ([entry]) => {
      atcWrap.classList.toggle('is-stuck', !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  // Observe the primary (non-sticky) ATC if present
  if (primaryBtn) observer.observe(primaryBtn);
}

// ── Ingredient accordion (mobile) ────────────────────────────────────────────
function initIngredientAccordion() {
  if (window.innerWidth > 900) return;

  const rows = document.querySelectorAll('.product-ingredient-row');
  rows.forEach(row => {
    const right = row.querySelector('.product-ingredient-row__right');
    const left  = row.querySelector('.product-ingredient-row__left');
    if (!right || !left) return;

    left.style.cursor = 'pointer';
    right.style.display = 'none';

    left.addEventListener('click', () => {
      const isOpen = right.style.display !== 'none';
      right.style.display = isOpen ? 'none' : 'block';
      left.setAttribute('aria-expanded', String(!isOpen));
    });

    left.setAttribute('aria-expanded', 'false');
    left.setAttribute('role', 'button');
    left.setAttribute('tabindex', '0');
    left.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); left.click(); }
    });
  });
}
