/* =========================================================
   Pop-up "fim da página" → X1 no WhatsApp · Editora Sanctus
   Arquivo autocontido: estilo + pop-up + lógica.
   Para ativar, basta incluir antes de </body>:
   <script src="/sanctus-popup.js" defer></script>
   ========================================================= */
(function () {
  if (window.__sxPopupLoaded) return;
  window.__sxPopupLoaded = true;

  // Registra cliques nos botões da Hotmart desde o primeiro instante
  var comprouCedo = false, onComprar = null;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="hotmart.com"]');
    if (!a) return;
    if (onComprar) onComprar(); else comprouCedo = true;
  }, true);

  var CSS = [
    "  :root {",
    "    --sx-bg: #0a0716;          /* mesmo fundo da página */",
    "    --sx-gold: #d4af6a;        /* ajuste para o dourado exato do site */",
    "    --sx-text: #f4efe6;",
    "    --sx-muted: rgba(244, 239, 230, .65);",
    "  }",
    "  .sx-overlay {",
    "    position: fixed; inset: 0; z-index: 99999;",
    "    display: flex; align-items: center; justify-content: center;",
    "    padding: 16px;",
    "    background: rgba(5, 3, 12, .72);",
    "    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);",
    "    opacity: 0; visibility: hidden;",
    "    transition: opacity .35s ease, visibility .35s ease;",
    "  }",
    "  .sx-overlay.sx-open { opacity: 1; visibility: visible; }",
    "  .sx-card {",
    "    position: relative; width: 100%; max-width: 420px;",
    "    padding: 40px 28px 28px; text-align: center;",
    "    background: radial-gradient(120% 90% at 50% 0%, #1a1230 0%, var(--sx-bg) 70%);",
    "    border: 1px solid rgba(212, 175, 106, .35); border-radius: 18px;",
    "    box-shadow: 0 30px 80px rgba(0, 0, 0, .6), 0 0 0 1px rgba(255, 255, 255, .03) inset;",
    "    color: var(--sx-text); font-family: inherit;",
    "    transform: translateY(24px) scale(.97);",
    "    transition: transform .45s cubic-bezier(.2, .8, .2, 1);",
    "  }",
    "  .sx-overlay.sx-open .sx-card { transform: none; }",
    "  .sx-close {",
    "    position: absolute; top: 10px; right: 12px;",
    "    width: 36px; height: 36px; border: 0; background: none; cursor: pointer;",
    "    color: var(--sx-muted); font-size: 22px; line-height: 1;",
    "  }",
    "  .sx-close:hover { color: var(--sx-text); }",
    "  .sx-icon { font-size: 22px; color: var(--sx-gold); letter-spacing: .4em; margin-bottom: 14px; }",
    "  .sx-title {",
    "    margin: 0 0 26px; font-family: Georgia, \"Times New Roman\", serif;",
    "    font-weight: 400; font-size: 24px; line-height: 1.35;",
    "  }",
    "  .sx-title em { color: var(--sx-gold); font-style: italic; }",
    "  .sx-actions { display: flex; flex-direction: column; gap: 10px; }",
    "  .sx-btn {",
    "    display: block; width: 100%; padding: 15px 18px; border-radius: 999px;",
    "    font: inherit; font-size: 15px; font-weight: 600; letter-spacing: .08em;",
    "    cursor: pointer; text-decoration: none; transition: transform .15s ease, opacity .15s ease;",
    "  }",
    "  .sx-btn:active { transform: scale(.98); }",
    "  .sx-yes { background: var(--sx-gold); color: var(--sx-bg); border: 0; }",
    "  .sx-yes:hover { opacity: .9; }",
    "  .sx-no { background: transparent; color: var(--sx-muted); border: 1px solid rgba(244, 239, 230, .18); }",
    "  .sx-no:hover { color: var(--sx-text); border-color: rgba(244, 239, 230, .35); }",
    "  @media (prefers-reduced-motion: reduce) {",
    "    .sx-overlay, .sx-card { transition: none; }",
    "  }"
  ].join("\n");

  var HTML = [
    "<div class=\"sx-overlay\" id=\"sxPopup\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"sxTitle\" aria-hidden=\"true\">",
    "  <div class=\"sx-card\">",
    "    <button class=\"sx-close\" type=\"button\" aria-label=\"Fechar\" data-sx-close>&times;</button>",
    "    <div class=\"sx-icon\" aria-hidden=\"true\">✧ ✦ ✧</div>",
    "    <h2 class=\"sx-title\" id=\"sxTitle\">",
    "      <em>A paz de Cristo!</em><br>Você deseja falar com alguém da nossa equipe?",
    "    </h2>",
    "    <div class=\"sx-actions\">",
    "      <a class=\"sx-btn sx-yes\" id=\"sxYes\" href=\"#\" target=\"_blank\" rel=\"noopener\">QUERO</a>",
    "      <button class=\"sx-btn sx-no\" type=\"button\" data-sx-close>AGORA NÃO</button>",
    "    </div>",
    "  </div>",
    "</div>"
  ].join("\n");

  function init() {
    var style = document.createElement('style');
    style.id = 'sx-popup-style';
    style.textContent = CSS;
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.innerHTML = HTML;
    document.body.appendChild(wrap.firstElementChild);

    start();
  }

  function start() {
  /* ====== CONFIGURE AQUI ====== */
  var WHATSAPP = '5562981395444'; // DDI + DDD + número, só dígitos
  var MENSAGEM = 'A paz de Cristo! Vim pela página do Ainda Há Vinho e gostaria de conversar com alguém da equipe.';
  var ATRASO_MS = 1200;           // espera no fim da página antes de abrir
  var DISTANCIA_FIM = 150;        // px do fim que já contam como "chegou ao final"
  /* ============================ */

  var KEY = 'sx_popup_visto';
  var popup = document.getElementById('sxPopup');
  var btnYes = document.getElementById('sxYes');
  var clicouComprar = false, timer = null, aberto = false;

  function jaViu() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function marcar() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }

  btnYes.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(MENSAGEM);

  // Quem clicou em qualquer botão da Hotmart nunca vê o pop-up
  onComprar = function () { clicouComprar = true; clearTimeout(timer); };
  if (comprouCedo) onComprar();

  function noFim() {
    var doc = document.documentElement;
    return window.innerHeight + window.scrollY >= doc.scrollHeight - DISTANCIA_FIM;
  }

  function abrir() {
    if (aberto || clicouComprar || jaViu()) return;
    aberto = true; marcar();
    popup.classList.add('sx-open');
    popup.setAttribute('aria-hidden', 'false');
    btnYes.focus({ preventScroll: true });
    if (window.fbq) fbq('trackCustom', 'PopupFimPagina_Exibido');
    window.removeEventListener('scroll', onScroll);
  }

  function fechar() {
    popup.classList.remove('sx-open');
    popup.setAttribute('aria-hidden', 'true');
  }

  function onScroll() {
    if (clicouComprar || jaViu()) return;
    if (noFim()) {
      if (!timer) timer = setTimeout(function () { if (noFim()) abrir(); timer = null; }, ATRASO_MS);
    } else if (timer) { clearTimeout(timer); timer = null; }
  }

  btnYes.addEventListener('click', function () {
    if (window.fbq) fbq('track', 'Contact');
    fechar();
  });
  popup.querySelectorAll('[data-sx-close]').forEach(function (el) { el.addEventListener('click', fechar); });
  popup.addEventListener('click', function (e) { if (e.target === popup) fechar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && aberto) fechar(); });

  if (!jaViu()) window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
