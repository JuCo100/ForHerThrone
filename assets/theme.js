/**
 * FOR HER THRONE — THEME JAVASCRIPT
 * Config-driven: reads window.BRAND_CONFIG (set by brand.config.js).
 * No brand-specific values hardcoded here.
 */

function formatMoney(cents) {
  return '$' + (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

document.addEventListener('DOMContentLoaded', () => {
  initEmailCapture();
  initStickyATC();
  initIngredientAccordion();
  initPurchaseTypeSelector();
});

// ── Purchase Type Selector ───────────────────────────────────────────────────
function initPurchaseTypeSelector() {
  const form           = document.getElementById('product-form');
  const intervalPicker = document.getElementById('interval-picker');
  const sellingPlanInput = document.getElementById('selling-plan-input');
  const atcBtn         = document.getElementById('atc-btn');
  if (!form) return;
}

// Compute and render the subscribe price row based on the checked interval's save %.
function updateSubscribePrice() {
  const priceOnetimeEl  = document.getElementById('price-onetime');
  const priceWrap       = document.getElementById('price-subscribe-wrap');
  const priceOrigEl     = document.getElementById('price-subscribe-original');
  const priceDiscEl     = document.getElementById('price-subscribe-discounted');
  const atcBtn          = document.getElementById('atc-btn');
  if (!priceOnetimeEl || !priceWrap || !priceOrigEl || !priceDiscEl) return;

  const originalCents = parseInt(priceOnetimeEl.dataset.cents, 10) || 0;

  // Prefer real selling plans, fall back to preview inputs
  const checked = document.querySelector('.interval-option input[name="selling_plan"]:checked')
               || document.querySelector('.interval-option input[name="selling_plan_preview"]:checked');
  const savePct = checked ? parseFloat(checked.dataset.savePct || '0') : 0;

  priceOrigEl.textContent = formatMoney(originalCents);

  if (savePct > 0) {
    const discountedCents = Math.round(originalCents * (1 - savePct / 100));
    priceDiscEl.textContent = formatMoney(discountedCents);
    priceWrap.style.display = 'flex';
    if (atcBtn) atcBtn.textContent = `Subscribe & Save — ${formatMoney(discountedCents)}`;
  } else {
    // No discount on this interval — just show regular price, no strikethrough
    priceDiscEl.textContent = formatMoney(originalCents);
    priceWrap.style.display = 'flex';
    if (atcBtn) atcBtn.textContent = `Subscribe & Save — ${formatMoney(originalCents)}`;
  }
}

// Called by onchange on the radio buttons
window.switchPurchaseType = function(type) {
  const intervalPicker   = document.getElementById('interval-picker');
  const sellingPlanInput = document.getElementById('selling-plan-input');
  const atcBtn           = document.getElementById('atc-btn');
  const labelOnetime     = document.getElementById('label-onetime');
  const labelSubscribe   = document.getElementById('label-subscribe');
  const priceWrap        = document.getElementById('price-subscribe-wrap');

  if (type === 'subscribe') {
    if (intervalPicker)   intervalPicker.removeAttribute('hidden');
    if (labelSubscribe)   labelSubscribe.classList.add('purchase-type__option--active');
    if (labelOnetime)     labelOnetime.classList.remove('purchase-type__option--active');

    // Wire up the selected interval's selling_plan id
    const checkedInterval = document.querySelector('.interval-option input[name="selling_plan"]:checked');
    if (checkedInterval && sellingPlanInput) {
      sellingPlanInput.value = checkedInterval.value;
    }

    // Show discounted price in the subscribe label
    updateSubscribePrice();

    // Keep selling_plan + price in sync as interval changes
    document.querySelectorAll('.interval-option input[name="selling_plan"]').forEach(radio => {
      radio.addEventListener('change', () => {
        if (sellingPlanInput) sellingPlanInput.value = radio.value;
        updateSubscribePrice();
      });
    });
    // Also sync preview radios (fallback UI)
    document.querySelectorAll('.interval-option input[name="selling_plan_preview"]').forEach(radio => {
      radio.addEventListener('change', updateSubscribePrice);
    });

  } else {
    if (intervalPicker)   intervalPicker.setAttribute('hidden', '');
    if (sellingPlanInput) sellingPlanInput.value = '';
    if (labelOnetime)     labelOnetime.classList.add('purchase-type__option--active');
    if (labelSubscribe)   labelSubscribe.classList.remove('purchase-type__option--active');
    if (priceWrap)        priceWrap.style.display = 'none';

    // Restore price on button
    const priceEl = document.getElementById('price-onetime');
    if (atcBtn) atcBtn.textContent = `Add to Cart — ${priceEl ? priceEl.textContent : ''}`;
  }
};

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
