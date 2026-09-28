(function JORFlipViewerSource() {
'use strict';
if (window.JORFlip && window.JORFlip.boot) return;

const CSS = `
.jf{--top:62px;--bot:98px;--accent:#00A66E;--fg:#fff;--fg2:rgba(255,255,255,.72);--glass:rgba(22,24,27,.58);--glass2:rgba(22,24,27,.86);
  --hover:rgba(255,255,255,.12);--line:rgba(255,255,255,.16);--track:rgba(255,255,255,.22);
  position:fixed;inset:0;overflow:hidden;color:var(--fg);font:14px/1.45 "Segoe UI",system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;
  -webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;touch-action:none;-webkit-font-smoothing:antialiased}
.jf *{box-sizing:border-box}
.jf [hidden]{display:none!important}
.jf-side .jf-stage,.jf-side .jf-zoom{right:408px}
.jf-side .jf-bar,.jf-side .jf-scrub{left:calc(50% - 204px)}
.jf[data-tone=light]{--fg:#13251E;--fg2:rgba(19,37,30,.66);--glass:rgba(255,255,255,.7);--glass2:rgba(255,255,255,.94);--hover:rgba(19,37,30,.08);--line:rgba(19,37,30,.14);--track:rgba(19,37,30,.16)}
.jf-bg{position:absolute;inset:0;background:#1b1d20}
.jf[data-bg=dark] .jf-bg{background:radial-gradient(90% 80% at 50% 45%,#34383d 0%,#1d1f22 60%,#121315 100%)}
.jf[data-bg=light] .jf-bg{background:radial-gradient(90% 80% at 50% 45%,#ffffff 0%,#eef2f0 55%,#dde4e1 100%)}
.jf[data-bg=green] .jf-bg{background:#00A66E}
.jf[data-bg=green] .jf-bg::before{content:"";position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 45%,rgba(255,255,255,.14),rgba(255,255,255,0) 70%)}
.jf[data-bg=ambient] .jf-bg{background:radial-gradient(70% 80% at 18% 22%,var(--c1) 0%,transparent 72%),radial-gradient(70% 80% at 85% 80%,var(--c2) 0%,transparent 72%),var(--c3)}
.jf[data-bg=ambient] .jf-bg::after,.jf[data-bg=dark] .jf-bg::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 50%,transparent 55%,rgba(0,0,0,.35) 100%)}
.jf-top{position:absolute;left:0;right:0;top:0;height:var(--top);display:flex;align-items:center;gap:16px;padding:0 20px;z-index:7}
.jf-brand{display:flex;align-items:center;flex:0 0 auto;border-radius:8px}
.jf-brand img{height:34px;width:auto;display:block}
.jf[data-tone=light] .jf-brand{background:#00A66E;padding:5px 8px}
.jf[data-tone=light] .jf-brand img{height:26px}
.jf-title{flex:1;min-width:0;font:400 18px/1.2 Cambria,Georgia,"Times New Roman",serif;letter-spacing:.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.94}
.jf-acts{display:flex;gap:8px;flex:0 0 auto}
.jf-pill{height:36px;border:1px solid var(--line);background:var(--glass);color:var(--fg);border-radius:999px;padding:0 14px 0 11px;display:inline-flex;align-items:center;gap:7px;
  cursor:pointer;font:600 13px/1 inherit;text-decoration:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:background .15s}
.jf-pill:hover{background:var(--glass2)}
.jf-pill svg{width:17px;height:17px}
.jf svg{fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.jf-stage{position:absolute;left:0;right:0;top:var(--top);bottom:var(--bot);z-index:2}
.jf-book{position:absolute;left:0;top:0;opacity:0;transition:opacity .5s ease}
.jf-book.in{opacity:1}
.jf-bsh{position:absolute;top:0;height:100%;border-radius:2px;box-shadow:0 26px 60px -14px rgba(0,0,0,.6),0 10px 22px -6px rgba(0,0,0,.28)}
.jf[data-tone=light] .jf-bsh{box-shadow:0 24px 56px -16px rgba(20,40,32,.42),0 8px 20px -8px rgba(20,40,32,.2)}
.jf-edge{position:absolute;top:1px;bottom:1px;background:repeating-linear-gradient(90deg,#fbfbfb 0 1px,#c9cdd0 1px 2px);border-radius:1px}
.jf-slot{position:absolute;top:0;z-index:1}
.jf-pg{position:absolute;inset:0}
.jf-pc{position:absolute;background:#fff;overflow:hidden}
.jf-pc>img{position:absolute;left:0;top:0;width:100%;height:100%;display:block;-webkit-user-drag:none;pointer-events:none}
.jf-thp{position:absolute;inset:0;background-repeat:no-repeat;background-color:#fff;filter:blur(.6px)}
.jf-gut{position:absolute;top:0;bottom:0;width:9%;pointer-events:none}
.jf-pg.l .jf-gut{right:0;background:linear-gradient(to left,rgba(0,0,0,.24),rgba(0,0,0,.07) 28%,rgba(0,0,0,0))}
.jf-pg.r .jf-gut{left:0;background:linear-gradient(to right,rgba(0,0,0,.24),rgba(0,0,0,.07) 28%,rgba(0,0,0,0))}
.jf-single .jf-pg.r .jf-gut{width:4%;background:linear-gradient(to right,rgba(0,0,0,.12),rgba(0,0,0,0))}
.jf-ln{position:absolute;inset:0}
.jf-ln a{position:absolute;display:block;border-radius:3px;cursor:pointer;transition:background-color .15s,box-shadow .15s;outline:none}
.jf-ln a:hover,.jf-ln a:focus-visible{background:rgba(0,166,110,.15);box-shadow:inset 0 0 0 1.5px rgba(0,166,110,.6)}
.jf-hint .jf-ln a{animation:jfHint 1.7s ease-out}
@keyframes jfHint{0%,30%{background:rgba(0,166,110,.2);box-shadow:inset 0 0 0 1.5px rgba(0,166,110,.65)}100%{background:rgba(0,166,110,0);box-shadow:inset 0 0 0 1.5px rgba(0,166,110,0)}}
.jf-hl{position:absolute;inset:0;pointer-events:none}
.jf-hl i{position:absolute;background:rgba(255,196,0,.42);mix-blend-mode:multiply;border-radius:2px;box-shadow:0 0 0 2px rgba(255,196,0,.25)}
.jf-flipping .jf-ln{pointer-events:none}
.jf-fl{position:absolute;top:0;width:0;height:0;z-index:3;pointer-events:none;visibility:hidden}
.jf-leaf{position:absolute;top:0;left:0;transform-origin:0 0}
.jf-flapw{position:absolute;left:0;top:0;width:0;height:0}
.jf-shade{position:absolute;pointer-events:none}
.jf-back{position:absolute;inset:0;background:#fff;overflow:hidden}
.jf-back img{position:absolute;inset:0;width:100%;height:100%;transform:scaleX(-1);opacity:.1;filter:grayscale(1)}
.jf-spine{position:absolute;top:0;height:100%;width:8%;transform:translateX(-50%);z-index:2;pointer-events:none;
  background:linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.05) 40%,rgba(0,0,0,.16) 50%,rgba(0,0,0,.05) 60%,rgba(0,0,0,0))}
.jf-nav{position:absolute;top:50%;margin-top:-26px;width:52px;height:52px;border-radius:50%;border:1px solid var(--line);background:var(--glass);color:var(--fg);
  display:grid;place-items:center;cursor:pointer;z-index:4;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:opacity .2s,background .15s,transform .15s}
.jf-nav:hover{background:var(--glass2);transform:scale(1.06)}
.jf-nav svg{width:24px;height:24px}
.jf-nav.p{left:16px}.jf-nav.n{right:16px}
.jf-nav[disabled]{opacity:0;pointer-events:none}
.jf-bar{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:2px;padding:5px;border-radius:16px;
  background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);
  box-shadow:0 10px 30px -10px rgba(0,0,0,.45);z-index:6;white-space:nowrap}
.jf-b{width:40px;height:40px;border:0;background:transparent;color:var(--fg);border-radius:11px;display:grid;place-items:center;cursor:pointer;padding:0;transition:background .12s}
.jf-b:hover{background:var(--hover)}
.jf-b.on{background:var(--accent);color:#fff}
.jf-b[disabled]{opacity:.35;pointer-events:none}
.jf-b svg{width:21px;height:21px}
.jf-sep{width:1px;height:24px;background:var(--line);margin:0 5px}
.jf-pn{height:40px;min-width:96px;padding:0 10px;border:0;background:transparent;color:var(--fg);border-radius:11px;cursor:pointer;font:600 14px/40px inherit;font-variant-numeric:tabular-nums;text-align:center}
.jf-pn:hover{background:var(--hover)}
.jf-pn small{font-weight:400;color:var(--fg2)}
.jf-pin{width:64px;height:32px;border-radius:8px;border:1px solid var(--line);background:rgba(0,0,0,.15);color:var(--fg);text-align:center;font:600 14px inherit;outline:none;margin:0 16px}
.jf-scrub{position:absolute;left:50%;bottom:74px;transform:translateX(-50%);width:min(520px,62vw);height:20px;cursor:pointer;z-index:6;opacity:.6;transition:opacity .2s;touch-action:none}
.jf-scrub:hover,.jf-scrub.act{opacity:1}
.jf-track{position:absolute;left:0;right:0;top:8px;height:4px;border-radius:4px;background:var(--track)}
.jf-fill{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:var(--accent)}
.jf-knob{position:absolute;top:3px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:transform .15s}
.jf-scrub:hover .jf-knob,.jf-scrub.act .jf-knob{transform:scale(1.2)}
.jf-tip{position:absolute;bottom:26px;transform:translateX(-50%);padding:6px 6px 4px;border-radius:10px;background:var(--glass2);box-shadow:0 8px 24px rgba(0,0,0,.35);display:none;text-align:center;font-size:12px;color:var(--fg)}
.jf-tip .t{background-repeat:no-repeat;background-color:#fff;border-radius:2px;margin-bottom:3px}
.jf-scrub:hover .jf-tip,.jf-scrub.act .jf-tip{display:block}
.jf-sheet{position:absolute;top:calc(var(--top) + 6px);right:14px;bottom:16px;width:min(380px,calc(100vw - 28px));background:#fff;color:#13251E;border-radius:18px;
  box-shadow:0 24px 60px -12px rgba(0,0,0,.45);display:flex;flex-direction:column;z-index:9;opacity:0;transform:translateX(18px);pointer-events:none;transition:opacity .2s,transform .22s;overflow:hidden;user-select:text;-webkit-user-select:text;touch-action:auto}
.jf-sheet.on{opacity:1;transform:none;pointer-events:auto}
.jf-sh{display:flex;align-items:center;gap:8px;padding:14px 12px 10px 18px;border-bottom:1px solid #e3ebe7}
.jf-sh h3{margin:0;flex:1;font:600 16px/1.2 inherit}
.jf-sh .jf-b{color:#41564D;width:36px;height:36px}
.jf-sh .jf-b:hover{background:#eef4f1}
.jf-sb{flex:1;overflow:auto;padding:8px 10px 16px;overscroll-behavior:contain}
.jf-in{width:100%;height:42px;border:1.5px solid #cfe0d8;border-radius:10px;padding:0 12px 0 38px;font:15px inherit;outline:none;color:#13251E;background:#f6faf8 no-repeat 11px 50%/18px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2372877D' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6.5'/%3E%3Cpath d='M16 16l4.5 4.5'/%3E%3C/svg%3E")}
.jf-in:focus{border-color:var(--accent);background-color:#fff}
.jf-sq{padding:4px 8px 10px}
.jf-note{color:#72877D;font-size:13px;padding:10px 10px}
.jf-r{display:block;width:100%;text-align:left;border:0;background:transparent;border-radius:10px;padding:9px 10px;cursor:pointer;color:#13251E;font:13.5px/1.45 inherit}
.jf-r:hover{background:#eef6f2}
.jf-r b{background:rgba(255,196,0,.4);font-weight:600;border-radius:2px}
.jf-r .pg{display:block;font-size:11.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--accent);margin-bottom:2px}
.jf-toc .jf-r{display:flex;gap:10px;align-items:baseline;font-size:14.5px}
.jf-toc .jf-r span{flex:1}
.jf-toc .jf-r em{font-style:normal;color:#72877D;font-size:13px;font-variant-numeric:tabular-nums}
.jf-toc .jf-r.cur{background:#e6f5ee;font-weight:600}
.jf-toc .d1{padding-left:26px;font-size:13.5px}.jf-toc .d2{padding-left:42px;font-size:13px}
.jf-share{padding:8px 8px}
.jf-share .url{display:flex;gap:8px;margin:6px 0 10px}
.jf-share .url input{flex:1;min-width:0;height:42px;border:1.5px solid #cfe0d8;border-radius:10px;padding:0 12px;font:14px inherit;color:#13251E;background:#f6faf8;outline:none}
.jf-share .go{height:42px;border:0;border-radius:10px;background:var(--accent);color:#fff;font:600 14px inherit;padding:0 16px;cursor:pointer}
.jf-share label{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#41564D;margin:0 2px 14px;cursor:pointer}
.jf-share label input{accent-color:var(--accent);width:16px;height:16px}
.jf-ways{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.jf-way{display:flex;align-items:center;gap:9px;height:44px;border:1.5px solid #e0ebe6;border-radius:12px;padding:0 12px;color:#13251E;text-decoration:none;font:600 13.5px inherit;background:#fff;cursor:pointer}
.jf-way:hover{border-color:var(--accent);background:#f3faf7}
.jf-way svg{width:19px;height:19px;color:var(--accent)}
.jf-grid{position:absolute;inset:0;z-index:8;background:rgba(12,14,16,.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);overflow:auto;opacity:0;pointer-events:none;transition:opacity .22s;touch-action:pan-y;overscroll-behavior:contain}
.jf-grid.on{opacity:1;pointer-events:auto}
.jf-gh{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;padding:16px 22px;color:#fff;z-index:1}
.jf-gh h3{margin:0;font:600 16px inherit}
.jf-gh .jf-b{color:#fff}
.jf-gw{display:flex;flex-wrap:wrap;gap:26px 30px;justify-content:center;padding:6px 22px 48px;max-width:1280px;margin:0 auto}
.jf-gs{display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer;border:0;background:transparent;padding:0;color:#fff}
.jf-gs .pr{display:flex;box-shadow:0 8px 20px -6px rgba(0,0,0,.6);transition:transform .15s}
.jf-gs:hover .pr{transform:translateY(-3px)}
.jf-gs .t{background-repeat:no-repeat;background-color:#fff}
.jf-gs.cur .pr{outline:3px solid var(--accent);outline-offset:4px}
.jf-gs small{font-size:12px;opacity:.78;font-variant-numeric:tabular-nums}
.jf-zoom{position:absolute;left:0;right:0;top:var(--top);bottom:var(--bot);z-index:3;overflow:hidden;display:none;cursor:grab;touch-action:none}
.jf-zoom.on{display:block}
.jf-zoom.drag{cursor:grabbing}
.jf-zin{position:absolute;left:0;top:0;transform-origin:0 0}
.jf-zin.anim{transition:transform .26s cubic-bezier(.2,.7,.2,1)}
.jf-zp{position:absolute;top:0}
.jf-zoomed .jf-book,.jf-zoomed .jf-nav{visibility:hidden}
.jf-toast{position:absolute;left:50%;bottom:110px;transform:translate(-50%,10px);background:#13251E;color:#fff;padding:10px 16px;border-radius:12px;font-weight:600;font-size:13.5px;
  opacity:0;transition:opacity .2s,transform .2s;z-index:12;pointer-events:none;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.jf-toast.on{opacity:1;transform:translate(-50%,0)}
.jf-more{position:absolute;bottom:70px;right:10px;background:#fff;color:#13251E;border-radius:14px;box-shadow:0 18px 44px -10px rgba(0,0,0,.5);padding:6px;z-index:10;display:none;min-width:200px}
.jf-more.on{display:block}
.jf-more button,.jf-more a{display:flex;align-items:center;gap:10px;width:100%;height:44px;border:0;background:transparent;border-radius:10px;padding:0 12px;font:600 14px inherit;color:#13251E;text-decoration:none;cursor:pointer}
.jf-more button:hover,.jf-more a:hover{background:#eef6f2}
.jf-more svg{width:19px;height:19px;color:#41564D}
.jf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.jf-load{position:absolute;left:50%;top:50%;width:34px;height:34px;margin:-17px;border-radius:50%;border:3px solid var(--track);border-top-color:var(--accent);animation:jfSpin .8s linear infinite;z-index:1}
@keyframes jfSpin{to{transform:rotate(360deg)}}
.jf-ready .jf-load{display:none}
.jf-m .jf-nav,.jf-m .jf-scrub,.jf-m .jf-acts,.jf-m .jf-dsk{display:none}
.jf-m{--top:54px;--bot:74px}
.jf-m .jf-top{padding:0 14px;gap:12px}
.jf-m .jf-brand img{height:28px}
.jf-m .jf-title{font-size:15.5px}
.jf-m .jf-bar{bottom:12px;padding:4px}
.jf-m .jf-b{width:42px;height:42px}
.jf-m .jf-pn{min-width:84px}
.jf-m .jf-sheet{left:0;right:0;bottom:0;top:auto;height:74%;width:auto;border-radius:20px 20px 0 0;transform:translateY(30px)}
.jf-m .jf-sheet.on{transform:none}
.jf-mob{display:none}
.jf-m .jf-mob{display:grid}
@media (prefers-reduced-motion:reduce){.jf *{transition:none!important;animation:none!important}}
`;

const ICON = {
  prev: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.3"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.3"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.3"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.3"/>',
  toc: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.6" cy="6.5" r=".9"/><circle cx="4.6" cy="12" r=".9"/><circle cx="4.6" cy="17.5" r=".9"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  zin: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8.2v5.6M8.2 11h5.6"/>',
  zout: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M8.2 11h5.6"/>',
  share: '<path d="M12 3.5v11M7.8 7.7L12 3.5l4.2 4.2"/><path d="M5.5 12.5v6a2 2 0 002 2h9a2 2 0 002-2v-6"/>',
  down: '<path d="M12 4v11M7.8 10.8L12 15l4.2-4.2"/><path d="M5 19.5h14"/>',
  full: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  unfull: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
  snd: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.2 4.2 0 010 6M18 6.5a7.8 7.8 0 010 11"/>',
  mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5"/>',
  x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  more: '<circle cx="5.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18.5" cy="12" r="1.3"/>',
  copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7.5a2 2 0 002 2h2.5"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  chat: '<path d="M20 11.5a8 8 0 01-11.8 7L4 19.8l1.3-4A8 8 0 1120 11.5z"/>',
  li: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2a2.3 2.3 0 014.6 0V16M11.5 10.5V16"/>',
  first: '<path d="M17 5l-7 7 7 7M7 5v14"/>',
  last: '<path d="M7 5l7 7-7 7M17 5v14"/>'
};
const svg = (k) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>';
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const easeInOut = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const px = (v) => v.toFixed(2) + 'px';

// Sutherland–Hodgman against one line: keep the part of the polygon where f(p) >= 0.
function clipHalf(pts, f) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], fa = f(a), fb = f(b);
    if (fa >= 0) out.push(a);
    if ((fa >= 0) !== (fb >= 0)) { const t = fa / (fa - fb); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
  }
  return out;
}
const poly = (pts) => pts.length < 3 ? 'polygon(0 0,0 0,0 0)' : 'polygon(' + pts.map((p) => px(p[0]) + ' ' + px(p[1])).join(',') + ')';

// A linear gradient whose stops sit at real distances from point M along direction u, in a W×H box.
function grad(W, H, M, u, stops) {
  const ang = Math.atan2(u[0], -u[1]);
  const L = Math.abs(W * Math.sin(ang)) + Math.abs(H * Math.cos(ang));
  const s0 = (M[0] - W / 2) * u[0] + (M[1] - H / 2) * u[1] + L / 2;
  return 'linear-gradient(' + (ang * 180 / Math.PI).toFixed(2) + 'deg,' + stops.map((s) => s[1] + ' ' + (s0 + s[0]).toFixed(1) + 'px').join(',') + ')';
}

// A page turning, made up rather than recorded: softened noise that swells as the page lifts
// and fades as it falls, a few tiny crinkles as the paper flexes, brighter at the start and duller
// at the end, and a soft low flap as it lands. `len` is how long the turn takes, in seconds.
function paperTurn(ac, at, len) {
  const sr = ac.sampleRate, dur = Math.max(.3, Math.min(.75, len * .85)), n = Math.floor(sr * dur);
  const buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
  let lo = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr, env = t < .08 ? t / .08 : Math.pow(Math.max(0, 1 - (t - .08) / (dur - .08)), 1.7);
    lo = lo * .6 + (Math.random() * 2 - 1) * .4;                 // take the hiss off the noise
    d[i] = lo * env;
  }
  for (let k = 0; k < 6; k++) {                                    // crinkles
    const i0 = Math.floor(sr * (.03 + Math.random() * dur * .7)), m = Math.floor(sr * (.0015 + Math.random() * .003)), amp = .2 + Math.random() * .3;
    for (let j = 0; j < m && i0 + j < n; j++) d[i0 + j] += (Math.random() * 2 - 1) * amp * (1 - j / m);
  }
  const src = ac.createBufferSource(), hp = ac.createBiquadFilter(), lp = ac.createBiquadFilter(), g = ac.createGain();
  src.buffer = buf; hp.type = 'highpass'; hp.frequency.value = 260; lp.type = 'lowpass'; lp.Q.value = .5;
  lp.frequency.setValueAtTime(5500, at); lp.frequency.exponentialRampToValueAtTime(1500, at + dur);
  g.gain.value = .5;
  src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(ac.destination); src.start(at);
  const o = ac.createOscillator(), og = ac.createGain(), land = at + Math.max(.25, len - .06);   // the flap as it lands
  o.type = 'sine'; o.frequency.setValueAtTime(150, land); o.frequency.exponentialRampToValueAtTime(65, land + .09);
  og.gain.setValueAtTime(0, land); og.gain.linearRampToValueAtTime(.16, land + .012); og.gain.exponentialRampToValueAtTime(.001, land + .11);
  o.connect(og); og.connect(ac.destination); o.start(land); o.stop(land + .12);
}

function boot(B) {
  if (!document.getElementById('jf-css')) { const s = el('style'); s.id = 'jf-css'; s.textContent = CSS; document.head.appendChild(s); }
  const N = B.n, A = B.aspect, opts = B.opts || {}, theme = B.theme || { bg: 'dark' };
  const U = (rel) => (window.JORFLIP_URLS && window.JORFLIP_URLS[rel]) || ((B.base || '') + rel);
  const links = B.links || {}, X = '.' + (B.ext || 'webp');
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k) { try { return localStorage.getItem('jorflip.' + k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem('jorflip.' + k, v); } catch (e) { } } };
  const coverAlone = opts.cover !== false && N > 1;
  const canFull = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  let soundOn = !!opts.sound && store.get('sound') !== '0';

  const root = el('div', 'jf jf-intro');
  root.dataset.bg = theme.bg || 'dark';
  root.dataset.tone = theme.bg === 'light' ? 'light' : 'dark';
  (theme.colors || []).forEach((c, i) => root.style.setProperty('--c' + (i + 1), c));
  if (theme.accent) root.style.setProperty('--accent', theme.accent);
  const brand = B.brand || {};
  const logo = brand.logo ? '<img alt="' + esc(brand.name || '') + '" src="' + esc(brand.logo) + '">' : esc(brand.name || '');
  root.innerHTML =
    '<div class="jf-bg"></div>' +
    '<header class="jf-top">' +
      (brand.href ? '<a class="jf-brand" href="' + esc(brand.href) + '" target="_blank" rel="noopener">' + logo + '</a>' : '<span class="jf-brand">' + logo + '</span>') +
      '<div class="jf-title">' + esc(B.title || '') + '</div>' +
      '<div class="jf-acts">' +
        (opts.download ? '<a class="jf-pill" data-a="download" href="' + esc(U(opts.download)) + '" download>' + svg('down') + 'Download PDF</a>' : '') +
        '<button class="jf-pill" data-a="share">' + svg('share') + 'Share</button>' +
      '</div>' +
    '</header>' +
    '<main class="jf-stage"><div class="jf-load"></div><div class="jf-book"><div class="jf-bsh"></div><div class="jf-edge l"></div><div class="jf-edge r"></div>' +
      '<div class="jf-slot l"></div><div class="jf-slot r"></div><div class="jf-spine"></div>' +
      '<div class="jf-fl"><div class="jf-leaf f"></div><div class="jf-shade u"></div><div class="jf-flapw"><div class="jf-leaf b"></div></div><div class="jf-shade s"></div></div>' +
    '</div>' +
    '<button class="jf-nav p" data-a="prev" aria-label="Previous page">' + svg('prev') + '</button><button class="jf-nav n" data-a="next" aria-label="Next page">' + svg('next') + '</button></main>' +
    '<div class="jf-zoom"><div class="jf-zin"></div></div>' +
    '<div class="jf-scrub" aria-hidden="true"><div class="jf-track"><div class="jf-fill"></div></div><div class="jf-knob"></div><div class="jf-tip"><div class="t"></div><span></span></div></div>' +
    '<nav class="jf-bar" aria-label="Book controls">' +
      '<button class="jf-b" data-a="prev" aria-label="Previous page">' + svg('prev') + '</button>' +
      '<button class="jf-pn" data-a="goto" aria-label="Go to page"></button>' +
      '<button class="jf-b" data-a="next" aria-label="Next page">' + svg('next') + '</button>' +
      '<span class="jf-sep"></span>' +
      '<button class="jf-b" data-a="grid" aria-label="All pages" title="All pages">' + svg('grid') + '</button>' +
      (B.outline && B.outline.length ? '<button class="jf-b jf-dsk" data-a="toc" aria-label="Contents" title="Contents">' + svg('toc') + '</button>' : '') +
      (B.search ? '<button class="jf-b" data-a="search" aria-label="Search" title="Search">' + svg('search') + '</button>' : '') +
      '<button class="jf-b jf-dsk" data-a="zoom" aria-label="Zoom in" title="Zoom in">' + svg('zin') + '</button>' +
      '<button class="jf-b jf-dsk jf-zo" data-a="zoomout" aria-label="Zoom out" title="Zoom out" hidden>' + svg('zout') + '</button>' +
      (opts.sound ? '<button class="jf-b jf-dsk" data-a="sound" aria-label="Page sound" title="Page sound">' + svg(soundOn ? 'snd' : 'mute') + '</button>' : '') +
      (canFull ? '<button class="jf-b jf-dsk" data-a="full" aria-label="Full screen" title="Full screen">' + svg('full') + '</button>' : '') +
      '<button class="jf-b jf-mob" data-a="more" aria-label="More">' + svg('more') + '</button>' +
    '</nav>' +
    '<div class="jf-more" role="menu">' +
      (B.outline && B.outline.length ? '<button data-a="toc">' + svg('toc') + 'Contents</button>' : '') +
      '<button data-a="share">' + svg('share') + 'Share</button>' +
      (opts.download ? '<a data-a="download" href="' + esc(U(opts.download)) + '" download>' + svg('down') + 'Download PDF</a>' : '') +
      (canFull ? '<button data-a="full">' + svg('full') + 'Full screen</button>' : '') +
      (opts.sound ? '<button data-a="sound">' + svg('snd') + 'Page sound</button>' : '') +
    '</div>' +
    '<section class="jf-sheet" data-s="search" aria-label="Search"><div class="jf-sh"><h3>Search</h3><button class="jf-b" data-a="close" aria-label="Close">' + svg('x') + '</button></div>' +
      '<div class="jf-sq"><input class="jf-in" type="search" placeholder="Search this book" autocomplete="off" spellcheck="false"></div><div class="jf-sb jf-res"></div></section>' +
    '<section class="jf-sheet" data-s="toc" aria-label="Contents"><div class="jf-sh"><h3>Contents</h3><button class="jf-b" data-a="close" aria-label="Close">' + svg('x') + '</button></div><div class="jf-sb jf-toc"></div></section>' +
    '<section class="jf-sheet" data-s="share" aria-label="Share"><div class="jf-sh"><h3>Share this book</h3><button class="jf-b" data-a="close" aria-label="Close">' + svg('x') + '</button></div><div class="jf-sb jf-share"></div></section>' +
    '<div class="jf-grid" aria-label="All pages"><div class="jf-gh"><h3>All pages</h3><button class="jf-b" data-a="close" aria-label="Close">' + svg('x') + '</button></div><div class="jf-gw"></div></div>' +
    '<div class="jf-toast" role="status"></div><div class="jf-sr" aria-live="polite"></div>';
  document.body.appendChild(root);
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const stage = $('.jf-stage'), book = $('.jf-book'), slotL = $('.jf-slot.l'), slotR = $('.jf-slot.r'), spine = $('.jf-spine');
  const bsh = $('.jf-bsh'), edgeL = $('.jf-edge.l'), edgeR = $('.jf-edge.r');
  const fl = $('.jf-fl'), leafF = $('.jf-leaf.f'), leafB = $('.jf-leaf.b'), flapW = $('.jf-flapw'), shU = $('.jf-shade.u'), shS = $('.jf-shade.s');
  const pn = $('.jf-pn'), scrub = $('.jf-scrub'), zoomBox = $('.jf-zoom'), zin = $('.jf-zin');

  /* ── layout ─────────────────────────────────────────────────────────────── */
  let mode = 'spread', pw = 100, ph = 140, cur = 0, forced = null, mobile = false;
  let bookLeft = 0, bookTop = 0, shift = 0;

  function views() { return mode === 'single' ? N : (coverAlone ? Math.floor(N / 2) + 1 : Math.ceil(N / 2)); }
  function vp(v) {
    if (mode === 'single') return { L: null, R: v };
    if (coverAlone) { if (v === 0) return { L: null, R: 0 }; const l = 2 * v - 1, r = 2 * v; return { L: l < N ? l : null, R: r < N ? r : null }; }
    const l = 2 * v, r = 2 * v + 1; return { L: l < N ? l : null, R: r < N ? r : null };
  }
  function viewOf(p) { p = clamp(p, 0, N - 1); if (mode === 'single') return p; if (coverAlone) return p === 0 ? 0 : Math.floor((p + 1) / 2); return Math.floor(p / 2); }
  function firstPage(v) { const q = vp(v); return q.L != null ? q.L : q.R; }
  function shiftOf(v) { if (mode === 'single') return -pw / 2; const q = vp(v); return q.L == null ? -pw / 2 : q.R == null ? pw / 2 : 0; }

  function layout() {
    const vw = root.clientWidth, vh = root.clientHeight;
    mobile = vw < 640 || (vh < 520 && vw < 900);
    root.classList.toggle('jf-m', mobile);
    const st = stage.getBoundingClientRect();
    const padX = mobile ? 6 : 84, padY = mobile ? 6 : 14;
    const aw = Math.max(80, st.width - 2 * padX), ah = Math.max(80, st.height - 2 * padY);
    const sSpread = Math.min(ah, aw / (2 * A)), sSingle = Math.min(ah, aw / A);
    const auto = N > 1 && !mobile && sSpread >= .72 * sSingle ? 'spread' : 'single';
    const first = firstPage(cur);
    const was = mode;
    mode = forced || auto;
    ph = Math.floor(mode === 'spread' ? sSpread : sSingle); pw = Math.floor(ph * A);
    if (was !== mode) cur = viewOf(first);
    root.classList.toggle('jf-single', mode === 'single');
    bookLeft = Math.round((st.width - 2 * pw) / 2); bookTop = Math.round((st.height - ph) / 2);
    Object.assign(book.style, { left: bookLeft + 'px', top: bookTop + 'px', width: 2 * pw + 'px', height: ph + 'px' });
    for (const s of [slotL, slotR]) { s.style.width = pw + 'px'; s.style.height = ph + 'px'; }
    slotR.style.left = pw + 'px';
    spine.style.left = pw + 'px'; spine.style.display = mode === 'single' ? 'none' : '';
    fl.style.left = pw + 'px';
    for (const s of [leafF, leafB]) { s.style.width = pw + 'px'; s.style.height = ph + 'px'; }
    for (const s of [shU, shS]) Object.assign(s.style, { left: -pw + 'px', top: -ph / 2 + 'px', width: 2 * pw + 'px', height: 2 * ph + 'px' });
    for (const [i, e] of pages) fit(e, i, e.dataset.side || 'r');
    stopFlip(false);
    renderStatic();
    if (Z.on) zoomLayout(true);
  }

  /* ── pages ──────────────────────────────────────────────────────────────── */
  const pages = new Map();          // page index -> element, most recently used last
  const T = B.thumbs;
  function thumbCss(i, h) {         // a thumbnail cut from the sprite sheet, h pixels tall
    const per = T.per, k = Math.floor(i / per), c = i % per, col = c % T.cols, row = Math.floor(c / T.cols);
    const cnt = Math.min(per, N - k * per), rows = Math.ceil(cnt / T.cols), s = h / T.h;
    return 'background-image:url("' + U('t/' + k + X) + '");background-size:' + px(T.cols * T.w * s) + ' ' + px(rows * T.h * s) +
      ';background-position:' + px(-col * T.w * s) + ' ' + px(-row * T.h * s) + ';width:' + px(T.w * s) + ';height:' + px(h);
  }
  function thumbPct(e, i) {         // the same thumbnail stretched over any box
    const per = T.per, k = Math.floor(i / per), c = i % per, col = c % T.cols, row = Math.floor(c / T.cols);
    const cnt = Math.min(per, N - k * per), rows = Math.ceil(cnt / T.cols);
    e.style.backgroundImage = 'url("' + U('t/' + k + X) + '")';
    e.style.backgroundSize = (T.cols * 100) + '% ' + (rows * 100) + '%';
    e.style.backgroundPosition = (T.cols > 1 ? col / (T.cols - 1) * 100 : 0) + '% ' + (rows > 1 ? row / (rows - 1) * 100 : 0) + '%';
  }
  function linkLayer(i) {
    const box = el('div', 'jf-ln');
    for (const L of links[i] || []) {
      const a = el('a');
      Object.assign(a.style, { left: L[0] * 100 + '%', top: L[1] * 100 + '%', width: L[2] * 100 + '%', height: L[3] * 100 + '%' });
      const t = L[4];
      if (typeof t === 'number') {
        a.href = '#p=' + (t + 1); a.title = 'Go to page ' + (t + 1); a.dataset.p = t;
        a.setAttribute('aria-label', 'Go to page ' + (t + 1));
      } else {
        a.href = t; a.title = t.replace(/^mailto:|^tel:/, '');
        if (/^https?:/i.test(t)) { a.target = '_blank'; a.rel = 'noopener'; }
      }
      a.draggable = false;
      box.appendChild(a);
    }
    return box;
  }
  function pageEl(i) {
    let e = pages.get(i);
    if (e) { pages.delete(i); pages.set(i, e); return e; }
    e = el('div', 'jf-pg'); e.dataset.i = i;
    const pc = el('div', 'jf-pc'), th = el('div', 'jf-thp'), img = new Image();
    img.alt = 'Page ' + (i + 1); img.decoding = 'async'; img.draggable = false;
    img.style.opacity = '0';
    img.onload = () => { img.style.opacity = '1'; th.style.display = 'none'; if (img.decode) img.decode().catch(() => { }); };   // decoded before it is needed in a turn
    thumbPct(th, i);
    pc.append(th, img, el('div', 'jf-gut'), el('div', 'jf-hl'), linkLayer(i));
    e.appendChild(pc);
    e._img = img;
    fit(e, i, 'r');
    pages.set(i, e);
    trim();
    return e;
  }
  function want(i) { if (i == null || i < 0 || i >= N) return; const e = pageEl(i); if (!e._img.src) e._img.src = U('p/' + (i + 1) + X); }
  function trim() {                 // forget pages far from where the reader is
    if (pages.size <= 16) return;
    const keep = new Set(); const q = vp(cur);
    for (let v = cur - 2; v <= cur + 2; v++) { if (v < 0 || v >= views()) continue; const r = vp(v); keep.add(r.L); keep.add(r.R); }
    for (const [i, e] of pages) { if (pages.size <= 12) break; if (!keep.has(i) && !e.isConnected && i !== q.L && i !== q.R) pages.delete(i); }
  }
  // Pages narrower or shorter than the book sit against the spine, centred top to bottom.
  function fit(e, i, side) {
    const d = B.dims[i], a = d[0] / d[1], pc = e.firstChild;
    let w = pw, h = ph, l = 0, t = 0;
    if (Math.abs(a - A) > .01) {
      if (a > A) { h = pw / a; t = (ph - h) / 2; } else { w = ph * a; l = side === 'l' ? pw - w : 0; }
    }
    Object.assign(pc.style, { left: px(l), top: px(t), width: px(w), height: px(h) });
  }
  function place(e, side) { e.dataset.side = side; e.className = 'jf-pg ' + side; fit(e, +e.dataset.i, side); want(+e.dataset.i); }
  function setSlot(slot, i, side) {
    if (i == null) { slot.textContent = ''; return; }
    const e = pageEl(i);
    if (slot.firstChild !== e || slot.childNodes.length > 1) { slot.textContent = ''; slot.appendChild(e); }
    place(e, side);
  }
  function backEl(i) {              // the reverse of a single sheet: blank paper, the print faintly through
    const b = el('div', 'jf-back'), img = new Image();
    img.src = U('p/' + (i + 1) + X); b.appendChild(img); return b;
  }

  function applyShift(s) { shift = s; book.style.transform = 'translateX(' + px(s) + ')'; }
  function renderStatic() {
    const q = vp(cur);
    leafF.textContent = ''; leafB.textContent = '';
    setSlot(slotL, q.L, 'l'); setSlot(slotR, q.R, 'r');
    applyShift(shiftOf(cur));
    frame(q.L != null, q.R != null);
    for (let v = cur - 1; v <= cur + 2; v++) { if (v < 0 || v >= views()) continue; const r = vp(v); want(r.L); want(r.R); }
    ui();
  }
  function frame(hasL, hasR) {      // the shadow under the open pages and the page edges beside them
    const x0 = hasL ? 0 : pw, x1 = hasR ? 2 * pw : pw;
    Object.assign(bsh.style, { left: x0 + 'px', width: Math.max(0, x1 - x0) + 'px' });
    const before = firstPage(cur), after = N - 1 - (vp(cur).R != null ? vp(cur).R : before);
    const wl = mode === 'single' ? 0 : Math.round(clamp(before / N * 12, before ? 1.5 : 0, 7)), wr = Math.round(clamp(after / N * 12, after ? 1.5 : 0, 7));
    Object.assign(edgeL.style, { left: (x0 - wl) + 'px', width: wl + 'px', display: hasL && wl ? '' : 'none' });
    Object.assign(edgeR.style, { left: x1 + 'px', width: wr + 'px', display: hasR && wr ? '' : 'none' });
  }

  /* ── the page turn ──────────────────────────────────────────────────────── */
  // Worked in "forward space": the grabbed page is [0,pw]×[0,ph] with the spine at x=0.
  // The corner C is folded to P; the fold is the perpendicular bisector of C and P.
  // Turning backwards is the same picture mirrored (g = -1).
  let F = null, raf = 0;
  function beginFlip(to, d, cy) {
    const a = vp(cur), b = vp(to), single = mode === 'single';
    F = { to, d, cy, single, rev: single && d < 0, g: single ? 1 : d, state: 'drag' };
    let front, flap, under;
    if (single) { if (d > 0) { front = a.R; under = b.R; } else { front = b.R; under = a.R; } flap = 'back'; }
    else if (d > 0) { front = a.R; flap = b.L; under = b.R; }
    else { front = a.L; flap = b.R; under = b.L; }
    const gs = F.g > 0 ? 'r' : 'l', os = F.g > 0 ? 'l' : 'r';
    leafF.style.left = (F.g > 0 ? 0 : -pw) + 'px';
    leafF.textContent = '';
    if (front != null) { const e = pageEl(front); leafF.appendChild(e); place(e, gs); }
    setSlot(F.g > 0 ? slotR : slotL, under, gs);
    leafB.textContent = '';
    if (flap === 'back') leafB.appendChild(backEl(front));
    else if (flap != null) { const e = pageEl(flap); leafB.appendChild(e); place(e, os); }
    F.s0 = shiftOf(cur); F.s1 = shiftOf(to);
    F.P = F.rev ? { x: -pw, y: cy } : { x: pw, y: cy };
    frame(a.L != null || b.L != null, a.R != null || b.R != null);
    fl.style.visibility = 'visible';
    draw();
  }
  function constrain(P, cy) {
    let x = P.x, y = cy > 0 ? Math.min(P.y, ph) : Math.max(P.y, 0);
    let dx = x, dy = y - cy, dd = Math.hypot(dx, dy);
    if (dd > pw) { x = dx * pw / dd; y = cy + dy * pw / dd; }
    const fy = ph - cy, diag = Math.hypot(pw, ph);
    dx = x; dy = y - fy; dd = Math.hypot(dx, dy);
    if (dd > diag) { x = dx * diag / dd; y = fy + dy * diag / dd; }
    return { x, y };
  }
  function draw() {
    const w = pw, h = ph, g = F.g, P = constrain(F.P, F.cy);
    const prog = clamp((w - P.x) / (2 * w), 0, 1);
    applyShift(F.s0 + (F.s1 - F.s0) * (F.rev ? 1 - prog : prog));
    const cx = w, cy = F.cy, dx = cx - P.x, dy = cy - P.y, len = Math.hypot(dx, dy);
    if (len < .5) {
      leafF.style.clipPath = 'none'; leafB.style.visibility = shU.style.visibility = shS.style.visibility = 'hidden'; flapW.style.filter = 'none'; return;
    }
    leafB.style.visibility = shU.style.visibility = shS.style.visibility = '';
    const nx = dx / len, ny = dy / len, mx = (cx + P.x) / 2, my = (cy + P.y) / 2;
    const sd = (p) => (p[0] - mx) * nx + (p[1] - my) * ny;
    const rect = [[0, 0], [w, 0], [w, h], [0, h]];
    const front = clipHalf(rect, (p) => -sd(p)), corner = clipHalf(rect, sd);
    const a11 = 1 - 2 * nx * nx, a12 = -2 * nx * ny, a22 = 1 - 2 * ny * ny, k = 2 * (mx * nx + my * ny), tx = k * nx, ty = k * ny;
    const flap = corner.map((p) => [a11 * p[0] + a12 * p[1] + tx, a12 * p[0] + a22 * p[1] + ty]);
    if (g > 0) {
      leafF.style.clipPath = poly(front);
      leafB.style.transform = 'matrix(' + [-a11, -a12, a12, a22, a11 * w + tx, a12 * w + ty].map((v) => v.toFixed(5)).join(',') + ')';
      leafB.style.clipPath = poly(corner.map((p) => [w - p[0], p[1]]));
    } else {
      leafF.style.clipPath = poly(front.map((p) => [w - p[0], p[1]]));
      leafB.style.transform = 'matrix(' + [-a11, a12, -a12, a22, -tx, ty].map((v) => v.toFixed(5)).join(',') + ')';
      leafB.style.clipPath = poly(corner);
    }
    // shading, in a 2w×2h box centred on the spine
    const toL = (p) => [g * p[0] + w, p[1] + h / 2], M = toL([mx, my]);
    let depth = 1; for (const p of flap) depth = Math.max(depth, -sd(p));
    const I = .25 + .75 * Math.sin(Math.PI * clamp(prog * 1.15, 0, 1));
    const sw = clamp(depth * .45, 10, w * .4);
    shU.style.clipPath = poly(corner.map(toL));
    shU.style.background = grad(2 * w, 2 * h, M, [g * nx, ny], [[0, 'rgba(0,0,0,' + (.5 * I).toFixed(3) + ')'], [sw * .25, 'rgba(0,0,0,' + (.22 * I).toFixed(3) + ')'], [sw, 'rgba(0,0,0,0)']]);
    shS.style.clipPath = poly(flap.map(toL));
    shS.style.background = grad(2 * w, 2 * h, M, [-g * nx, -ny], [[0, 'rgba(0,0,0,.3)'], [Math.min(6, depth * .05), 'rgba(0,0,0,.12)'], [depth * .22, 'rgba(255,255,255,.16)'], [depth * .55, 'rgba(255,255,255,.04)'], [depth, 'rgba(0,0,0,.12)']]);
    // the lifted page's shadow is the costliest thing drawn; phones do without it
    flapW.style.filter = mobile ? 'none' : 'drop-shadow(0 0 ' + (3 + 10 * I).toFixed(1) + 'px rgba(0,0,0,' + (.1 + .25 * I).toFixed(3) + '))';
  }
  function animate(to, dur, ease, arc, done) {
    cancelAnimationFrame(raf);
    F.P = constrain(F.P, F.cy);
    const from = { x: F.P.x, y: F.P.y }, t0 = performance.now(), f = F;
    const step = (now) => {
      if (F !== f) return;
      const t = Math.min(1, (now - t0) / dur), e = ease(t);
      F.P = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e + arc * Math.sin(Math.PI * e) };
      draw();
      if (t < 1) raf = requestAnimationFrame(step); else done();
    };
    raf = requestAnimationFrame(step);
  }
  function stopFlip(commit) {       // tidy away the flip layer, keeping or dropping the turn
    cancelAnimationFrame(raf);
    if (!F) return;
    if (commit) cur = F.to;
    F = null;
    root.classList.remove('jf-flipping');
    fl.style.visibility = 'hidden';
    leafF.style.clipPath = leafB.style.clipPath = ''; leafB.style.transform = '';
    leafB.style.visibility = shU.style.visibility = shS.style.visibility = '';
    renderStatic();
    if (commit) arrived();
  }
  function completeFlip(speed) {
    const target = F.rev ? { x: pw, y: F.cy } : { x: -pw, y: F.cy };
    const P = constrain(F.P, F.cy), dist = Math.abs(target.x - P.x) / (2 * pw), dragged = F.state === 'drag';
    F.state = 'anim';
    root.classList.add('jf-flipping');                           // links rest while a page moves, not while a corner is only lifted
    const dur = (speed || 760) * clamp(dist, .35, 1);
    sound(dur / 1000);
    animate(target, dur, dragged || dist < .9 ? easeOut : easeInOut, (F.cy > 0 ? -1 : 1) * ph * .09 * dist, () => stopFlip(true));
  }
  function cancelTurn(dur) {
    const home = F.rev ? { x: -pw, y: F.cy } : { x: pw, y: F.cy };
    F.state = 'back';
    animate(home, dur || 240, easeOut, 0, () => stopFlip(false));
  }
  let lastFlip = 0;
  function flipTo(to, how) {
    if (F && F.state === 'anim') stopFlip(true);
    to = clamp(to, 0, views() - 1);
    if (F && !(F.state === 'peek' && F.to === to)) stopFlip(false);
    if (to === cur && !F) { flash(); return; }
    if (reduced || how === 'jump') { stopFlip(false); cur = to; renderStatic(); arrived(); return; }
    const quick = performance.now() - lastFlip < 600;
    lastFlip = performance.now();
    if (!F) beginFlip(to, to > cur ? 1 : -1, ph);
    completeFlip(quick ? 480 : 820);
  }
  const next = () => flipTo((F && F.state === 'anim' ? F.to : cur) + 1);
  const prev = () => flipTo((F && F.state === 'anim' ? F.to : cur) - 1);
  function goPage(p, how) { flipTo(viewOf(p), how); }

  /* ── pointer: drag to turn, corner peeks, clicks, pinch ─────────────────── */
  let G = null, suppress = false, tapT = 0, tapX = 0, tapY = 0, tapTimer = 0;
  const pointers = new Map();
  function toForward(x, y, g) { const o = fl.getBoundingClientRect(); return { x: g * (x - o.left), y: y - o.top }; }
  function hitPage(x, y) {          // which open page is under the pointer, and where on it (0..1)
    const q = vp(cur);
    for (const [slot, side, i] of [[slotL, 'l', q.L], [slotR, 'r', q.R]]) {
      if (i == null) continue;
      const r = slot.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return { side, i, fx: (x - r.left) / r.width, fy: (y - r.top) / r.height };
    }
    return null;
  }
  function cornerZone(x, y) {
    if (mode === 'spread' || !mobile) {
      const h = hitPage(x, y); if (!h) return null;
      const R = clamp(pw * .2, 40, 120) / pw, Ry = R * pw / ph;
      const outer = h.side === 'r' ? 1 - h.fx : h.fx;
      if (outer > R) return null;
      const d = h.side === 'r' ? 1 : -1;
      if (mode === 'single' && d < 0) return null;
      if (cur + d < 0 || cur + d >= views()) return null;
      if (h.fy > 1 - Ry) return { d, cy: ph };
      if (h.fy < Ry) return { d, cy: 0 };
    }
    return null;
  }
  stage.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && e.pointerType === 'touch') { if (G && G.drag && F) cancelTurn(120); G = null; pinchStart(); return; }
    if (e.button !== 0 || G || e.target.closest('button')) return;
    if (F && F.state === 'anim') { stopFlip(true); }
    G = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t: performance.now(), type: e.pointerType, moved: false, drag: false, hit: hitPage(e.clientX, e.clientY), hist: [], onLink: !!e.target.closest('a') };
  });
  stage.addEventListener('pointermove', (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (P2) { pinchMove(); return; }
    if (!G) { if (e.pointerType === 'mouse' && !Z.on) hover(e); return; }
    if (e.pointerId !== G.id) return;
    const dx = e.clientX - G.x0, dy = e.clientY - G.y0;
    if (!G.moved && Math.hypot(dx, dy) > (G.type === 'mouse' ? 6 : 10)) {
      G.moved = true;
      if (G.type !== 'mouse' && Math.abs(dy) > Math.abs(dx) * 1.2) { G = null; return; }
      startDrag(e, dx, dy);
    }
    if (G && G.drag && F) {
      G.hist.push([performance.now(), e.clientX]); if (G.hist.length > 6) G.hist.shift();
      const f = G.type === 'mouse' ? 1 : 1.6;
      if (G.follow) F.P = toForward(e.clientX, e.clientY, F.g);
      else F.P = { x: G.P0.x + F.g * dx * f, y: G.P0.y + dy * .5 };
      draw();
    }
  });
  function startDrag(e, dx, dy) {
    let d;
    if (F && F.state === 'peek') { d = F.d; G.follow = true; }
    else if (mode === 'single' || !G.hit) d = dx < 0 ? 1 : -1;
    else d = G.hit.side === 'r' ? 1 : -1;
    if (cur + d < 0 || cur + d >= views()) { G.drag = false; return; }
    if (F && F.state !== 'peek') stopFlip(F.state === 'anim');
    if (!F || F.to !== cur + d) {
      if (F) stopFlip(false);
      const q = G.hit ? G.hit.fy : .5;
      beginFlip(cur + d, d, q < .5 ? 0 : ph);
    }
    F.state = 'drag';
    root.classList.add('jf-flipping');
    // grabbed at a corner, the corner follows the pointer — with or without a hover lift first
    if (!G.follow && mode === 'spread' && cornerZone(G.x0, G.y0)) G.follow = true;
    G.drag = true; G.P0 = { x: F.P.x, y: F.P.y };
    if (F.rev) G.P0 = { x: -pw, y: F.cy };
    try { stage.setPointerCapture(G.id); } catch (err) { }
    suppress = true;
  }
  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (P2) { if (pointers.size < 2) pinchEnd(); return; }
    if (!G || e.pointerId !== G.id) return;
    const g = G; G = null;
    if (g.drag && F) {
      let v = 0;
      if (g.hist.length > 1) { const a = g.hist[0], b = g.hist[g.hist.length - 1]; v = (b[1] - a[1]) / Math.max(1, b[0] - a[0]) * F.g; }
      const P = constrain(F.P, F.cy);
      const done = F.rev ? (P.x > 0 || v > .35) : (P.x < 0 || v < -.35);
      if (e.type === 'pointercancel') cancelTurn(); else if (done) completeFlip(700); else cancelTurn();
      setTimeout(() => { suppress = false; }, 0);
      return;
    }
    if (g.moved || g.onLink || e.type === 'pointercancel') return;
    tap(e, g);
  }
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);
  stage.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !G && F && F.state === 'peek') cancelTurn(160); });
  root.addEventListener('click', (e) => { if (suppress) { e.preventDefault(); e.stopPropagation(); suppress = false; } }, true);

  function hover(e) {
    if (F && F.arrow) return;                                   // an arrow is holding the corner up
    const z = cornerZone(e.clientX, e.clientY);
    if (F && F.state !== 'peek' && F.state !== 'back') return;
    if (z) {
      if (F && (F.state === 'back' || F.d !== z.d || F.cy !== z.cy)) stopFlip(false);
      if (!F) { beginFlip(cur + z.d, z.d, z.cy); F.state = 'peek'; }
      const p = toForward(e.clientX, e.clientY, F.g), m = clamp(pw * .06, 14, 34);
      F.P = { x: Math.min(p.x, pw - m), y: z.cy > 0 ? Math.min(p.y, ph - m) : Math.max(p.y, m) };
      draw();
      stage.style.cursor = 'pointer';
    } else {
      if (F && F.state === 'peek') cancelTurn(170);
      const h = hitPage(e.clientX, e.clientY);
      stage.style.cursor = !h ? '' : (h.side === 'r' ? 1 - h.fx : h.fx) < .2 && cur + (h.side === 'r' ? 1 : -1) >= 0 && cur + (h.side === 'r' ? 1 : -1) < views() && !(mode === 'single' && h.side === 'l') ? 'pointer' : 'zoom-in';
    }
  }
  // Resting on an arrow lifts the corner of the page it will turn, like a hand reaching for it;
  // the click then carries on from there.
  function arrowPeek(d) {
    if (reduced || G || Z.on || cur + d < 0 || cur + d >= views() || (mode === 'single' && d < 0)) return;
    if (F && F.state === 'peek' && F.d === d) { F.arrow = true; return; }
    if (F) { if (F.state === 'anim') return; stopFlip(false); }
    beginFlip(cur + d, d, ph); F.state = 'peek'; F.arrow = true;
    animate({ x: pw - pw * .14, y: ph - ph * .075 }, 420, easeOut, 0, () => { });
  }
  function arrowLeave() { if (F && F.state === 'peek' && F.arrow) { F.arrow = false; cancelTurn(220); } }
  for (const b of $$('[data-a=next],[data-a=prev]')) {
    if (b.tagName !== 'BUTTON') continue;
    b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && !b.disabled) arrowPeek(b.dataset.a === 'next' ? 1 : -1); });
    b.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') arrowLeave(); });
  }
  function tap(e, g) {
    if (F && F.state === 'peek') { completeFlip(760); return; }
    const h = g.hit;
    if (g.type === 'mouse') {
      if (!h) return;
      const outer = h.side === 'r' ? 1 - h.fx : h.fx;
      if (outer < .2 && !(mode === 'single' && h.side === 'l')) { h.side === 'r' ? next() : prev(); return; }
      zoomAt(2.2, e.clientX, e.clientY);
      return;
    }
    // touch: the outer thirds turn the page at once; the middle waits to see if it is a double tap
    const vis = visibleRect();
    const fx = (e.clientX - vis.left) / vis.width;
    const now = performance.now();
    if (now - tapT < 320 && Math.hypot(e.clientX - tapX, e.clientY - tapY) < 40) { clearTimeout(tapTimer); tapT = 0; zoomAt(2.5, e.clientX, e.clientY); return; }
    tapT = now; tapX = e.clientX; tapY = e.clientY;
    if (fx > .7) { tapT = 0; next(); } else if (fx < .3) { tapT = 0; prev(); }
  }
  function visibleRect() {          // the open pages as they sit on screen
    const r = book.getBoundingClientRect(), q = vp(cur);
    const x0 = q.L != null ? 0 : pw, x1 = q.R != null ? 2 * pw : pw;
    return { left: r.left + x0, top: r.top, width: x1 - x0, height: ph };
  }

  /* ── zoom ───────────────────────────────────────────────────────────────── */
  const Z = { on: false, z: 1, x: 0, y: 0, w: 0, h: 0, items: [] };
  const dpr = () => window.devicePixelRatio || 1;
  function zoomAt(z, cx, cy) {
    if (!Z.on) {
      const q = vp(cur), list = [];
      if (mode === 'spread' && q.L != null) list.push({ i: q.L, side: 'l' });
      if (q.R != null) list.push({ i: q.R, side: 'r' });
      zin.textContent = ''; Z.items = [];
      list.forEach((it, k) => {
        const box = el('div', 'jf-zp'); box.style.left = k * pw + 'px'; box.style.width = pw + 'px'; box.style.height = ph + 'px';
        const e = el('div', 'jf-pg ' + it.side); e.dataset.i = it.i;
        const pc = el('div', 'jf-pc'), lo = new Image(), hi = new Image();
        lo.src = U('p/' + (it.i + 1) + X); lo.draggable = hi.draggable = false; hi.style.opacity = '0';
        hi.onload = () => { hi.style.opacity = '1'; };
        pc.append(lo, hi, el('div', 'jf-gut'), linkLayer(it.i));
        const hl = pages.get(it.i) && pages.get(it.i).querySelector('.jf-hl'); if (hl) pc.appendChild(hl.cloneNode(true));
        e.appendChild(pc); box.appendChild(e); zin.appendChild(box);
        e.dataset.side = it.side; fit(e, it.i, it.side);
        Z.items.push({ i: it.i, hi });
      });
      Z.w = list.length * pw; Z.h = ph;
      zin.style.width = Z.w + 'px'; zin.style.height = Z.h + 'px';
      const st = stage.getBoundingClientRect(), vis = visibleRect();
      Z.on = true; Z.z = 1; Z.x = vis.left - st.left; Z.y = vis.top - st.top;
      zoomBox.classList.add('on'); root.classList.add('jf-zoomed');
      applyZ(false);
      void zin.offsetWidth;
      $('.jf-zo').hidden = false;
    }
    setZoom(z, cx, cy, true);
  }
  function setZoom(z, cx, cy, anim) {
    const r = zoomBox.getBoundingClientRect();
    z = clamp(z, 1, 5);
    const ax = cx - r.left, ay = cy - r.top;
    const ux = (ax - Z.x) / Z.z, uy = (ay - Z.y) / Z.z;   // the book point under the anchor
    Z.z = z; Z.x = ax - ux * z; Z.y = ay - uy * z;
    applyZ(anim);
    if (z <= 1.001) setTimeout(() => { if (Z.on && Z.z <= 1.001) exitZoom(true); }, anim ? 260 : 0);
  }
  function applyZ(anim) {
    const r = zoomBox.getBoundingClientRect(), cw = Z.w * Z.z, ch = Z.h * Z.z;
    Z.x = cw <= r.width ? (r.width - cw) / 2 : clamp(Z.x, r.width - cw, 0);
    Z.y = ch <= r.height ? (r.height - ch) / 2 : clamp(Z.y, r.height - ch, 0);
    zin.classList.toggle('anim', !!anim);
    zin.style.transform = 'translate(' + px(Z.x) + ',' + px(Z.y) + ') scale(' + Z.z.toFixed(4) + ')';
    if (B.hd && Z.z * ph * dpr() > B.dims[Z.items[0] ? Z.items[0].i : 0][1] * 1.08) for (const it of Z.items) if (!it.hi.src) it.hi.src = U('h/' + (it.i + 1) + X);
    $('[data-a=zoom]').classList.toggle('on', Z.on);
  }
  function zoomLayout() { if (!Z.on) return; const z = Z.z; exitZoom(false); const r = stage.getBoundingClientRect(); zoomAt(z, r.left + r.width / 2, r.top + r.height / 2); }
  function exitZoom(anim) {
    if (!Z.on) return;
    const finish = () => { Z.on = false; zoomBox.classList.remove('on'); root.classList.remove('jf-zoomed'); zin.textContent = ''; Z.items = []; $('.jf-zo').hidden = true; $('[data-a=zoom]').classList.remove('on'); };
    if (!anim || reduced) { finish(); return; }
    const st = stage.getBoundingClientRect(), vis = visibleRect();
    Z.z = 1; Z.x = vis.left - st.left; Z.y = vis.top - st.top;
    zin.classList.add('anim');
    zin.style.transform = 'translate(' + px(Z.x) + ',' + px(Z.y) + ') scale(1)';
    setTimeout(finish, 270);
  }
  let ZG = null;
  zoomBox.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) { ZG = null; pinchStart(); return; }
    if (e.target.closest('a')) return;
    ZG = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: Z.x, y: Z.y, moved: false, type: e.pointerType };
    zoomBox.classList.add('drag');
  });
  zoomBox.addEventListener('pointermove', (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (P2) { pinchMove(); return; }
    if (!ZG || e.pointerId !== ZG.id) return;
    const dx = e.clientX - ZG.x0, dy = e.clientY - ZG.y0;
    if (!ZG.moved && Math.hypot(dx, dy) > 5) { ZG.moved = true; try { zoomBox.setPointerCapture(e.pointerId); } catch (err) { } suppress = true; }
    if (ZG.moved) { Z.x = ZG.x + dx; Z.y = ZG.y + dy; applyZ(false); }
  });
  const zEnd = (e) => {
    pointers.delete(e.pointerId);
    if (P2) { if (pointers.size < 2) pinchEnd(); return; }
    zoomBox.classList.remove('drag');
    if (!ZG || e.pointerId !== ZG.id) return;
    const g = ZG; ZG = null;
    if (g.moved) { setTimeout(() => { suppress = false; }, 0); return; }
    if (e.type === 'pointerup') {
      if (g.type === 'mouse') exitZoom(true);
      else { const now = performance.now(); if (now - tapT < 320) { tapT = 0; exitZoom(true); } else tapT = now; }
    }
  };
  zoomBox.addEventListener('pointerup', zEnd);
  zoomBox.addEventListener('pointercancel', zEnd);
  root.addEventListener('wheel', (e) => {
    if (e.target.closest('.jf-sheet,.jf-grid')) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const f = Math.exp(-e.deltaY * .0035);
      if (!Z.on) { if (f > 1) zoomAt(1 * f, e.clientX, e.clientY); } else setZoom(Z.z * f, e.clientX, e.clientY, false);
      return;
    }
    if (Z.on) { e.preventDefault(); Z.x -= e.deltaX; Z.y -= e.deltaY; applyZ(false); }
  }, { passive: false });
  // pinch, on the book or when already zoomed
  let P2 = null;
  function pinchStart() {
    const [a, b] = Array.from(pointers.values());
    if (!Z.on) { const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; zoomAt(1.0001, m.x, m.y); }
    P2 = { d0: Math.hypot(a.x - b.x, a.y - b.y), z0: Z.z, m0: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, x0: Z.x, y0: Z.y };
    suppress = true;
  }
  function pinchMove() {
    const [a, b] = Array.from(pointers.values()); if (!a || !b) return;
    const r = zoomBox.getBoundingClientRect(), d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const z = clamp(P2.z0 * d / P2.d0, 1, 5);
    const ux = (P2.m0.x - r.left - P2.x0) / P2.z0, uy = (P2.m0.y - r.top - P2.y0) / P2.z0;
    Z.z = z; Z.x = m.x - r.left - ux * z; Z.y = m.y - r.top - uy * z;
    applyZ(false);
  }
  function pinchEnd() { P2 = null; ZG = null; G = null; setTimeout(() => { suppress = false; }, 0); if (Z.z < 1.06) exitZoom(true); }

  /* ── the bar, the scrubber, the panels ──────────────────────────────────── */
  function label(v) {
    const q = vp(v);
    if (q.L != null && q.R != null) return (q.L + 1) + '–' + (q.R + 1);
    return String((q.L != null ? q.L : q.R) + 1);
  }
  function ui() {
    pn.innerHTML = label(cur) + ' <small>/ ' + N + '</small>';
    const atStart = cur <= 0, atEnd = cur >= views() - 1;
    $$('[data-a=prev]').forEach((b) => { b.disabled = atStart; });
    $$('[data-a=next]').forEach((b) => { b.disabled = atEnd; });
    const f = views() > 1 ? cur / (views() - 1) : 0;
    $('.jf-fill').style.width = f * 100 + '%';
    $('.jf-knob').style.left = f * 100 + '%';
    const q = vp(cur);
    $('.jf-sr').textContent = q.L != null && q.R != null ? 'Pages ' + (q.L + 1) + ' and ' + (q.R + 1) + ' of ' + N : 'Page ' + ((q.L != null ? q.L : q.R) + 1) + ' of ' + N;
    if (tocOn) markToc();
  }
  let hintTimer = 0;
  function arrived() {
    const p = firstPage(cur);
    try { history.replaceState(null, '', p > 0 ? '#p=' + (p + 1) : location.pathname + location.search); } catch (e) { }
    if (opts.hints !== false) {
      clearTimeout(hintTimer);
      const q = vp(cur);
      for (const i of [q.L, q.R]) { if (i == null) continue; const e = pages.get(i); if (e && (links[i] || []).length) { e.classList.remove('jf-hint'); void e.offsetWidth; e.classList.add('jf-hint'); } }
      hintTimer = setTimeout(() => $$('.jf-hint').forEach((e) => e.classList.remove('jf-hint')), 1800);
    }
    if (hits.q) paintHits();
    // still resting on an arrow after a turn: lift the next corner straight away
    setTimeout(() => { const b = $$('button[data-a=next],button[data-a=prev]').find((x) => x.matches(':hover') && !x.disabled); if (b && !F && !G) arrowPeek(b.dataset.a === 'next' ? 1 : -1); }, 60);
  }
  function flash() { const b = $('.jf-bsh'); b.animate && b.animate([{ opacity: 1 }, { opacity: .5 }, { opacity: 1 }], 300); }

  // scrubber
  function scrubAt(x, go) {
    const r = scrub.getBoundingClientRect(), f = clamp((x - r.left) / r.width, 0, 1), v = Math.round(f * (views() - 1));
    const tip = $('.jf-tip'); tip.style.left = f * 100 + '%';
    const p = firstPage(v); tip.querySelector('.t').setAttribute('style', thumbCss(p, 96)); tip.querySelector('span').textContent = 'Page ' + label(v);
    if (go && v !== cur) flipTo(v, 'jump');
  }
  scrub.addEventListener('pointermove', (e) => scrubAt(e.clientX, !!scrub._drag));
  scrub.addEventListener('pointerdown', (e) => { scrub._drag = true; scrub.classList.add('act'); scrub.setPointerCapture(e.pointerId); scrubAt(e.clientX, true); });
  scrub.addEventListener('pointerup', () => { scrub._drag = false; scrub.classList.remove('act'); });

  // sheets
  let tocOn = false;
  function sheet(name) {
    $$('.jf-sheet').forEach((s) => s.classList.toggle('on', s.dataset.s === name));
    $('.jf-more').classList.remove('on');
    tocOn = name === 'toc';
    const side = !!name && !mobile && root.clientWidth > 1100;
    if (side !== root.classList.contains('jf-side')) { root.classList.toggle('jf-side', side); onResize(); }
    $$('.jf-bar [data-a]').forEach((b) => b.classList.toggle('on', b.dataset.a === name));
    if (name === 'search') { const i = $('.jf-in'); setTimeout(() => i.focus(), 60); loadSearch(); }
    if (name === 'toc') buildToc();
    if (name === 'share') buildShare();
    if (name !== 'search' && hits.q && !name) { /* keep highlights until a new search */ }
  }
  function openGrid() {
    const gw = $('.jf-gw'); gw.textContent = '';
    const h = mobile ? 150 : 190;
    for (let v = 0; v < views(); v++) {
      const q = vp(v), b = el('button', 'jf-gs' + (v === cur ? ' cur' : '')), pr = el('div', 'pr');
      for (const i of [q.L, q.R]) if (i != null) { const t = el('div', 't'); t.setAttribute('style', thumbCss(i, h)); pr.appendChild(t); }
      b.append(pr, el('small', '', label(v)));
      b.onclick = () => { closeAll(); flipTo(v, Math.abs(v - cur) > 1 ? 'jump' : ''); };
      gw.appendChild(b);
    }
    $('.jf-grid').classList.add('on');
    const c = gw.querySelector('.cur'); if (c) c.scrollIntoView({ block: 'center' });
  }
  function closeAll() { sheet(null); $('.jf-grid').classList.remove('on'); $('.jf-more').classList.remove('on'); }

  function buildToc() {
    const box = $('.jf-toc'); if (box.firstChild) { markToc(); return; }
    const add = (items, depth) => {
      for (const it of items) {
        const b = el('button', 'jf-r d' + Math.min(depth, 2), '<span>' + esc(it[0]) + '</span><em>' + (it[1] + 1) + '</em>');
        b.dataset.p = it[1];
        b.onclick = () => { if (mobile) closeAll(); goPage(it[1]); };
        box.appendChild(b);
        if (it[2]) add(it[2], depth + 1);
      }
    };
    add(B.outline || [], 0);
    markToc();
  }
  function markToc() {
    const q = vp(cur); let best = null;
    for (const b of $$('.jf-toc .jf-r')) { const p = +b.dataset.p; b.classList.remove('cur'); if (p <= (q.R != null ? q.R : q.L)) best = b; }
    if (best) best.classList.add('cur');
  }
  function shareUrl(page) {
    let u = B.url || location.href.split('#')[0];
    if (page) { const p = firstPage(cur); if (p > 0) u += '#p=' + (p + 1); }
    return u;
  }
  function buildShare() {
    const box = $('.jf-share'), here = firstPage(cur) > 0;
    box.innerHTML = '<div class="url"><input readonly aria-label="Link"><button class="go" data-a="copy">Copy</button></div>' +
      (here ? '<label><input type="checkbox" class="pg"> Open at page ' + (firstPage(cur) + 1) + '</label>' : '') +
      '<div class="jf-ways">' +
        (navigator.share ? '<button class="jf-way" data-w="native">' + svg('share') + 'Share…</button>' : '') +
        '<a class="jf-way" data-w="mail" target="_blank" rel="noopener">' + svg('mail') + 'Email</a>' +
        '<a class="jf-way" data-w="wa" target="_blank" rel="noopener">' + svg('chat') + 'WhatsApp</a>' +
        '<a class="jf-way" data-w="li" target="_blank" rel="noopener">' + svg('li') + 'LinkedIn</a>' +
      '</div>';
    const input = box.querySelector('input[readonly]'), chk = box.querySelector('.pg');
    const refresh = () => {
      const u = shareUrl(chk && chk.checked); input.value = u;
      const t = B.title || document.title;
      box.querySelector('[data-w=mail]').href = 'mailto:?subject=' + encodeURIComponent(t) + '&body=' + encodeURIComponent(t + '\n' + u);
      box.querySelector('[data-w=wa]').href = 'https://wa.me/?text=' + encodeURIComponent(t + ' ' + u);
      box.querySelector('[data-w=li]').href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(u);
    };
    if (chk) chk.onchange = refresh;
    refresh();
    box.querySelector('[data-a=copy]').onclick = () => copy(input.value);
    const nat = box.querySelector('[data-w=native]');
    if (nat) nat.onclick = () => navigator.share({ title: B.title, url: input.value }).catch(() => { });
  }
  function copy(text) {
    const ok = () => toast('Link copied');
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, () => fallback());
    else fallback();
    function fallback() { const t = el('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; root.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) { } t.remove(); }
  }
  let toastT = 0;
  function toast(msg) { const t = $('.jf-toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 1800); }

  /* ── search ─────────────────────────────────────────────────────────────── */
  let S = null, sLoading = null;
  const hits = { q: '', list: [] };
  function loadSearch() {
    if (S || sLoading || !B.search) return sLoading;
    sLoading = new Promise((res) => {
      window.JORFlip._s = (data) => { S = data.map((p) => ({ t: p[0], b: p[1] })); res(); };
      const s = document.createElement('script'); s.src = U('search.js'); s.onerror = () => { $('.jf-res').innerHTML = '<div class="jf-note">Search could not be loaded.</div>'; };
      document.head.appendChild(s);
    });
    return sLoading;
  }
  function norm(s) {                // folded text plus a map back to the original offsets
    let out = '', map = [];
    for (let i = 0; i < s.length; i++) {
      const f = s[i].normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s/g, ' ');
      for (let k = 0; k < f.length; k++) { if (f[k] === ' ' && (!out || out[out.length - 1] === ' ')) continue; out += f[k]; map.push(i); }
    }
    map.push(s.length);
    return { s: out, map };
  }
  let sTimer = 0;
  $('.jf-in').addEventListener('input', () => { clearTimeout(sTimer); sTimer = setTimeout(runSearch, 140); });
  $('.jf-in').addEventListener('keydown', (e) => { if (e.key === 'Enter') { const f = $('.jf-res .jf-r'); if (f) f.click(); } e.stopPropagation(); });
  async function runSearch() {
    const raw = $('.jf-in').value.trim(), box = $('.jf-res');
    await loadSearch();
    if (!S) return;
    const q = norm(raw).s.replace(/\s+/g, ' ');
    hits.q = q.length >= 2 ? q : ''; hits.list = [];
    if (!hits.q) { box.innerHTML = raw ? '<div class="jf-note">Type at least two letters.</div>' : ''; paintHits(); return; }
    let html = '', total = 0;
    for (let i = 0; i < S.length; i++) {
      const P = S[i]; if (!P.n) P.n = norm(P.t);
      const hay = P.n.s; let at = 0, pageHits = [];
      while ((at = hay.indexOf(q, at)) >= 0 && pageHits.length < 60) { pageHits.push([P.n.map[at], P.n.map[at + q.length]]); at += q.length; }
      if (!pageHits.length) continue;
      hits.list.push({ i, m: pageHits }); total += pageHits.length;
      if (hits.list.length <= 200) {
        const [s0, s1] = pageHits[0], a = Math.max(0, s0 - 48), b = Math.min(P.t.length, s1 + 72);
        html += '<button class="jf-r" data-p="' + i + '"><span class="pg">Page ' + (i + 1) + (pageHits.length > 1 ? ' · ' + pageHits.length + ' matches' : '') + '</span>' +
          (a > 0 ? '…' : '') + esc(P.t.slice(a, s0)) + '<b>' + esc(P.t.slice(s0, s1)) + '</b>' + esc(P.t.slice(s1, b)) + (b < P.t.length ? '…' : '') + '</button>';
      }
    }
    box.innerHTML = total ? '<div class="jf-note">' + total + ' match' + (total > 1 ? 'es' : '') + ' on ' + hits.list.length + ' page' + (hits.list.length > 1 ? 's' : '') + '</div>' + html
      : '<div class="jf-note">Nothing found for “' + esc(raw) + '”.</div>';
    for (const b of box.querySelectorAll('.jf-r')) b.onclick = () => { if (mobile) closeAll(); goPage(+b.dataset.p); };
    paintHits();
  }
  function paintHits() {
    for (const [, e] of pages) { const hl = e.querySelector('.jf-hl'); if (hl) hl.textContent = ''; }
    if (!hits.q || !S) return;
    const byPage = new Map(hits.list.map((h) => [h.i, h.m]));
    for (const [i, e] of pages) {
      const m = byPage.get(i); if (!m) continue;
      const hl = e.querySelector('.jf-hl'), boxes = S[i].b;
      for (const [s, t] of m) {
        for (const bx of boxes) {
          const is = bx[0], ie = bx[0] + (bx[5] || 0);
          if (ie <= s || is >= t || ie <= is) continue;
          const f0 = (Math.max(s, is) - is) / (ie - is), f1 = (Math.min(t, ie) - is) / (ie - is);
          const r = el('i');
          Object.assign(r.style, { left: (bx[1] + bx[3] * f0) * 100 + '%', top: bx[2] * 100 + '%', width: bx[3] * (f1 - f0) * 100 + '%', height: bx[4] * 100 + '%' });
          hl.appendChild(r);
        }
      }
    }
  }

  /* ── sound ──────────────────────────────────────────────────────────────── */
  let actx = null;
  function sound(len) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      paperTurn(actx, actx.currentTime + .01, len || .8);
    } catch (e) { }
  }

  /* ── wiring ─────────────────────────────────────────────────────────────── */
  function fullscreen() {
    const d = document;
    if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else { const r = d.documentElement; (r.requestFullscreen || r.webkitRequestFullscreen).call(r); }
  }
  document.addEventListener('fullscreenchange', () => { const b = $('.jf-bar [data-a=full]'); if (b) b.innerHTML = svg(document.fullscreenElement ? 'unfull' : 'full'); });
  root.addEventListener('click', (e) => {
    const a = e.target.closest('[data-a],a[data-p]');
    if (!a || !root.contains(a)) return;
    if (a.matches('a[data-p]')) { e.preventDefault(); if (Z.on) exitZoom(false); goPage(+a.dataset.p); return; }
    const act = a.dataset.a;
    if (act === 'download') return;
    e.preventDefault();
    if (act === 'prev') { if (Z.on) exitZoom(false); prev(); }
    else if (act === 'next') { if (Z.on) exitZoom(false); next(); }
    else if (act === 'grid') { closeAll(); openGrid(); }
    else if (act === 'toc' || act === 'search' || act === 'share') { const on = $('.jf-sheet[data-s=' + act + ']').classList.contains('on'); closeAll(); if (!on) sheet(act); }
    else if (act === 'close') closeAll();
    else if (act === 'zoom') { const r = visibleRect(); if (Z.on) setZoom(Z.z * 1.5, r.left + r.width / 2, r.top + r.height / 2, true); else zoomAt(2, r.left + r.width / 2, r.top + r.height / 2); }
    else if (act === 'zoomout') { const r = zoomBox.getBoundingClientRect(); setZoom(Z.z / 1.5, r.left + r.width / 2, r.top + r.height / 2, true); }
    else if (act === 'full') { closeAll(); fullscreen(); }
    else if (act === 'sound') { soundOn = !soundOn; store.set('sound', soundOn ? '1' : '0'); const b = $('.jf-bar [data-a=sound]'); if (b) b.innerHTML = svg(soundOn ? 'snd' : 'mute'); toast(soundOn ? 'Page sound on' : 'Page sound off'); }
    else if (act === 'more') { $('.jf-more').classList.toggle('on'); }
    else if (act === 'goto') {
      const inp = el('input', 'jf-pin'); inp.type = 'text'; inp.inputMode = 'numeric'; inp.value = firstPage(cur) + 1;
      pn.replaceWith(inp); inp.select();
      const done = (go) => { if (go) { const p = parseInt(inp.value, 10); if (p >= 1 && p <= N) goPage(p - 1, Math.abs(viewOf(p - 1) - cur) > 1 ? 'jump' : ''); } if (inp.isConnected) inp.replaceWith(pn); };
      inp.onkeydown = (ev) => { ev.stopPropagation(); if (ev.key === 'Enter') done(true); if (ev.key === 'Escape') done(false); };
      inp.onblur = () => done(false);
    }
  });
  $('.jf-grid').addEventListener('click', (e) => { if (e.target.classList.contains('jf-grid') || e.target.classList.contains('jf-gw')) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input,textarea')) return;
    const k = e.key;
    if ((e.ctrlKey || e.metaKey) && k === 'f' && B.search) { e.preventDefault(); closeAll(); sheet('search'); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); if (Z.on) exitZoom(false); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); if (Z.on) exitZoom(false); prev(); }
    else if (k === 'Home') { e.preventDefault(); flipTo(0, 'jump'); }
    else if (k === 'End') { e.preventDefault(); flipTo(views() - 1, 'jump'); }
    else if (k === 'Escape') { if (Z.on) exitZoom(true); else closeAll(); }
    else if (k === '+' || k === '=') { const r = visibleRect(); Z.on ? setZoom(Z.z * 1.4, r.left + r.width / 2, r.top + r.height / 2, true) : zoomAt(1.8, r.left + r.width / 2, r.top + r.height / 2); }
    else if (k === '-') { if (Z.on) { const r = zoomBox.getBoundingClientRect(); setZoom(Z.z / 1.4, r.left + r.width / 2, r.top + r.height / 2, true); } }
  });
  function fromHash() {
    const m = /(?:^#|[#&])p(?:age)?=?(\d+)/i.exec(location.hash) || /^#(\d+)$/.exec(location.hash);
    return m ? clamp(parseInt(m[1], 10) - 1, 0, N - 1) : null;
  }
  window.addEventListener('hashchange', () => { const p = fromHash(); if (p != null && viewOf(p) !== cur) goPage(p, Math.abs(viewOf(p) - cur) > 1 ? 'jump' : ''); });
  let rz = 0;
  const onResize = () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(layout); };
  window.addEventListener('resize', onResize);
  if (window.visualViewport) visualViewport.addEventListener('resize', onResize);

  // start
  const start = fromHash();
  layout();
  if (start != null) { cur = viewOf(start); renderStatic(); }
  const q0 = vp(cur), firstImg = pageEl(q0.R != null ? q0.R : q0.L)._img;
  let shown = false;
  const show = () => {
    if (shown) return; shown = true;
    root.classList.add('jf-ready');
    book.classList.add('in');
    requestAnimationFrame(() => { root.classList.remove('jf-intro'); book.style.transition = 'opacity .5s ease, transform .6s cubic-bezier(.2,.7,.2,1)'; applyShift(shift); setTimeout(() => { book.style.transition = ''; }, 650); });
    // on a first visit, lift the corner once so people know the page turns
    if (!mobile && !reduced && cur === 0 && N > 1 && !sessionStorageGet()) {
      // it steps aside if the reader has already pressed or hovered something, and only ever drops
      // its own lift — it once dropped a corner the reader was holding up from an arrow
      let busy = false;
      const mark = () => { busy = true; };
      root.addEventListener('pointerdown', mark, true); root.addEventListener('keydown', mark, true);
      setTimeout(() => {
        root.removeEventListener('pointerdown', mark, true); root.removeEventListener('keydown', mark, true);
        if (busy || F || G || Z.on || cur !== 0) return;
        beginFlip(1, 1, ph); F.state = 'peek';
        const mine = F;
        animate({ x: pw - pw * .16, y: ph - ph * .1 }, 520, easeOut, 0, () => setTimeout(() => { if (F === mine && F.state === 'peek' && !F.arrow && !G) cancelTurn(420); }, 380));
      }, 1100);
    }
  };
  function sessionStorageGet() { try { const v = sessionStorage.getItem('jorflip.peeked'); sessionStorage.setItem('jorflip.peeked', '1'); return v; } catch (e) { return 1; } }
  if (firstImg.complete && firstImg.naturalWidth) show(); else { firstImg.addEventListener('load', show); firstImg.addEventListener('error', show); setTimeout(show, 2500); }
  arrived();

  const api = { next, prev, goPage, flipTo, get view() { return cur; }, get mode() { return mode; }, get views() { return views(); }, vp, zoomAt, exitZoom, get zoom() { return Z.on ? Z.z : 1; },
    sheet, openGrid, closeAll, setMode(m) { forced = m; layout(); }, get flipping() { return !!F; }, get state() { return F ? F.state + (F.arrow ? '+arrow' : '') : null; }, B, pages };
  window.JORFlip.book = api;
  return api;
}

window.JORFlip = { boot, version: '1.1', paperTurn };
})();
