(() => {
  "use strict";
  const config = window.EBOOK_CONFIG || {};
  const status = document.querySelector('[data-purchase-status]');
  let checkoutUrl = null;
  try {
    const url = new URL(config.checkoutUrl);
    if (url.protocol === 'https:' && !url.username && !url.password) checkoutUrl = url.href;
  } catch { /* Configuração ausente ou inválida. */ }

  const block = document.querySelector('[data-price-block]');
  const price = document.querySelector('[data-price]');
  if (block && price && typeof config.price === 'number' && Number.isFinite(config.price) && config.price >= 0) {
    price.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(config.price);
    block.hidden = false;
    const fallback = document.querySelector('[data-price-fallback]');
    if (fallback) fallback.hidden = true;
    const note = document.querySelector('[data-payment-note]');
    if (note && typeof config.paymentNote === 'string' && config.paymentNote.trim()) {
      note.textContent = config.paymentNote.trim();
      note.hidden = false;
    }
  }

  document.querySelectorAll('[data-checkout]').forEach((button) => {
    if (checkoutUrl) {
      button.href = checkoutUrl;
    } else {
      button.href = '#oferta';
      button.setAttribute('aria-disabled', 'true');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (status) status.textContent = 'A compra está indisponível no momento. Tente novamente mais tarde.';
        document.querySelector('#oferta')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
})();
