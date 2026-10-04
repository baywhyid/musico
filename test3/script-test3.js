const $ = (s) => document.querySelector(s);
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const root = document.documentElement;

/* ===== 1. Konversi warna ===== */
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s: s * 100, l: l * 100 };
}
const toHex = (rgb) => '#' + rgb.map((x) => x.toString(16).padStart(2, '0')).join('');
function parseHex(v) {
  v = v.trim().replace('#', '');
  if (v.length === 3) v = [...v].map((c) => c + c).join('');
  return /^[0-9a-f]{6}$/i.test(v) ? [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)) : null;
}
const hexOf = (h, s, l) => toHex(hslToRgb(((h % 360) + 360) % 360, s, l));
// Pilih teks gelap/terang supaya terbaca di atas warna tertentu
const ink = (hex) => { const [r, g, b] = parseHex(hex); return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? '#111' : '#fff'; };

/* ===== 2. State: satu sumber kebenaran (HSL) ===== */
let hsl = { h: 232, s: 82, l: 60 };
let extras = [hexOf(272, 82, 60)]; // warna tambahan untuk gradien
const cur = () => hslToRgb(hsl.h, hsl.s, hsl.l);

function setHex(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  hsl = rgbToHsl(...rgb);
  return true;
}

/* ===== 3. Slider dibuat dari array (lebih ringkas daripada menulis 6x di HTML) ===== */
const sliderDefs = [['h', 'Hue', 360], ['s', 'Saturasi', 100], ['l', 'Lightness', 100], ['r', 'R', 255], ['g', 'G', 255], ['b', 'B', 255]];
$('#sliders').innerHTML = sliderDefs.map(([k, label, max]) => `
  <label class="block">
    <div class="mb-2 flex justify-between text-sm font-semibold"><span>${label}</span><output id="v-${k}"></output></div>
    <input type="range" id="s-${k}" min="0" max="${max}" data-k="${k}">
  </label>`).join('');

$('#sliders').addEventListener('input', (e) => {
  const k = e.target.dataset.k;
  if (!k) return;
  const v = +e.target.value;
  if ('hsl'.includes(k)) hsl[k] = v;                    // slider H/S/L langsung mengubah state
  else { const rgb = cur(); rgb['rgb'.indexOf(k)] = v; hsl = rgbToHsl(...rgb); } // R/G/B: ubah dulu ke HSL
  update();
});

/* ===== 4. Gradien ===== */
function gradient(hex) {
  const cols = [hex, ...extras].join(', ');
  const a = $('#gAngle').value, t = $('#gType').value;
  if (t === 'radial') return `radial-gradient(circle, ${cols})`;
  if (t === 'conic') return `conic-gradient(from ${a}deg, ${cols})`;
  return `linear-gradient(${a}deg, ${cols})`;
}

/* ===== 5. Render bagian-bagian UI ===== */
function renderStops(hex) {
  $('#stops').innerHTML = `<span class="dot" style="background:${hex}" title="Warna utama"></span>` +
    extras.map((c, i) => `<button class="dot" style="background:${c}" data-rm="${i}" title="Klik untuk menghapus ${c}"></button>`).join('');
}

function renderOutputs(hex, rgb) {
  const rows = [
    ['HEX', hex.toUpperCase()],
    ['RGB', `rgb(${rgb.join(', ')})`],
    ['HSL', `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`],
    ['Variabel', `--warna: ${hex};`],
    ['Gradien', `background: ${gradient(hex)};`]
  ];
  $('#outputs').innerHTML = rows.map(([l, v]) =>
    `<button class="out" data-copy="${v}"><span class="text-sm text-muted">${l}</span><code>${v}</code></button>`).join('');
}

function applyStage(hex, rgb) {
  const st = $('#stage');
  st.style.cssText = $('#css').value;          // terapkan CSS buatan pengguna
  st.style.setProperty('--color', hex);        // lalu sediakan variabelnya
  st.style.setProperty('--gradient', gradient(hex));
  $('#stageHex').textContent = hex.toUpperCase();
  $('#stageRgb').textContent = `rgb(${rgb.join(', ')})`;
}

// strip() dipakai ulang untuk harmoni dan palet pilihan
function strip(name, cols) {
  return `<div>
    <div class="mb-2 flex items-center justify-between"><h3 class="font-semibold">${name}</h3><button class="link-btn" data-apply="${cols.join(',')}">Pakai di gradien</button></div>
    <div class="strip">${cols.map((c) => `<button class="sw" data-hex="${c}" style="background:${c};color:${ink(c)}">${c.toUpperCase()}</button>`).join('')}</div>
  </div>`;
}

const schemes = [['Komplementer', [0, 180]], ['Analog', [-30, 0, 30]], ['Triadik', [0, 120, 240]], ['Split komplementer', [0, 150, 210]], ['Tetradik', [0, 90, 180, 270]]];

function renderHarmony() {
  const { h, s, l } = hsl;
  const html = schemes.map(([n, offs]) => strip(n, offs.map((o) => hexOf(h + o, s, l))));
  html.push(strip('Monokrom', [20, 35, 50, 65, 80].map((x) => hexOf(h, s, x))));
  $('#harmony').innerHTML = html.join('');
}

/* ===== 6. update(): dipanggil setiap ada perubahan ===== */
function update() {
  const rgb = cur(), hex = toHex(rgb), { h, s, l } = hsl;
  root.style.setProperty('--c', hex);

  const vals = { h: Math.round(h), s: Math.round(s), l: Math.round(l), r: rgb[0], g: rgb[1], b: rgb[2] };
  for (const k in vals) { $('#s-' + k).value = vals[k]; $('#v-' + k).textContent = vals[k]; }

  // Track slider berwarna: menunjukkan hasil akhir jika slider digeser
  const track = {
    h: `linear-gradient(90deg, ${[0, 60, 120, 180, 240, 300, 360].map((x) => `hsl(${x} 100% 50%)`).join(',')})`,
    s: `linear-gradient(90deg, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))`,
    l: `linear-gradient(90deg, #000, hsl(${h} ${s}% 50%), #fff)`,
    r: `linear-gradient(90deg, rgb(0 ${rgb[1]} ${rgb[2]}), rgb(255 ${rgb[1]} ${rgb[2]}))`,
    g: `linear-gradient(90deg, rgb(${rgb[0]} 0 ${rgb[2]}), rgb(${rgb[0]} 255 ${rgb[2]}))`,
    b: `linear-gradient(90deg, rgb(${rgb[0]} ${rgb[1]} 0), rgb(${rgb[0]} ${rgb[1]} 255))`
  };
  for (const k in track) $('#s-' + k).style.setProperty('--track', track[k]);

  if (document.activeElement !== $('#hex')) $('#hex').value = hex;
  $('#picker').value = hex;
  $('#angleOut').textContent = $('#gAngle').value + '°';

  renderStops(hex); renderOutputs(hex, rgb); applyStage(hex, rgb); renderHarmony();
}

/* ===== 7. Palet pilihan (dirender sekali) ===== */
const presets = [
  ['Senja',  ['#1f1147', '#7b2d8e', '#e0457b', '#ff8a5c', '#ffd166']],
  ['Laut',   ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8']],
  ['Hutan',  ['#1b4332', '#2d6a4f', '#52b788', '#95d5b2', '#d8f3dc']],
  ['Neon',   ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0']],
  ['Kopi',   ['#3e2723', '#6d4c41', '#a1887f', '#d7ccc8', '#f3ece7']],
  ['Pastel', ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#a0c4ff']]
];
$('#presets').innerHTML = presets.map(([n, c]) => `<div class="card p-4">${strip(n, c)}</div>`).join('');

/* ===== 8. Event: satu listener untuk semua tombol dinamis (event delegation) ===== */
let timer;
function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(timer); timer = setTimeout(() => t.classList.remove('show'), 1800);
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); showToast('Tersalin'); }
  catch { showToast('Gagal menyalin'); }
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-hex],[data-apply],[data-copy],[data-rm]');
  if (!t) return;
  const d = t.dataset;
  if (d.hex) { setHex(d.hex); update(); }
  else if (d.apply) { const c = d.apply.split(','); setHex(c[0]); extras = c.slice(1); update(); }
  else if (d.copy) copy(d.copy);
  else if (d.rm !== undefined && extras.length > 1) { extras.splice(+d.rm, 1); update(); }
});

$('#hex').addEventListener('input', (e) => { if (setHex(e.target.value)) update(); });
$('#picker').addEventListener('input', (e) => { setHex(e.target.value); update(); });
$('#css').addEventListener('input', update);
$('#gType').addEventListener('change', update);
$('#gAngle').addEventListener('input', update);
$('#addStop').addEventListener('click', () => { if (extras.length < 5) { extras.push(toHex(cur())); update(); } else showToast('Maksimal 6 warna'); });
$('#resetStops').addEventListener('click', () => { extras = [hexOf(hsl.h + 40, hsl.s, hsl.l)]; update(); });

/* "Kejutkan saya": warna acak + skema harmoni acak untuk gradiennya */
function shuffle() {
  hsl = { h: rand(0, 359), s: rand(60, 90), l: rand(45, 65) };
  const [, offs] = schemes[rand(0, schemes.length - 1)];
  extras = offs.filter((o) => o).map((o) => hexOf(hsl.h + o, hsl.s, hsl.l));
  update();
}
$('#shuffle').addEventListener('click', shuffle);
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName)) { e.preventDefault(); shuffle(); }
});

/* Tema */
root.dataset.theme = localStorage.getItem('theme') || 'light';
$('#themeBtn').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', root.dataset.theme);
});

update();
