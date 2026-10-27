// Pencarian di dalam browser: memakai cari.json, tanpa server.
(function () {
var B = location.pathname.indexOf('/jadwal-solat/') === 0 ? '/jadwal-solat/' : '/';
var PAIRS = [['dz','z'],['dh','d'],['sy','s'],['sh','s'],['kh','h'],['th','t'],['ts','s'],['gh','g'],['q','k'],['aa','a'],['ii','i'],['uu','u'],['ee','i'],['oo','u'],['ph','f']];
function N(s) {
s = String(s).toLowerCase().replace(/[\u02bf\u02be'\u2019`\u00b4\u2018\-\u2013\u2014_]/g, '');
PAIRS.forEach(function (p) { s = s.split(p[0]).join(p[1]); });
return s.replace(/o/g, 'a').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
var data = null, janji = null;
function muat() {
if (!janji) janji = fetch(B + 'cari.json').then(function (r) { return r.json(); }).then(function (d) { data = d; return d; });
return janji;
}
function cari(q) {
var tok = N(q).split(' ').filter(function (t) { return t.length > 1 || /\d/.test(t); });
if (!tok.length || !data) return [];
var kunci = tok.join(' '), penuh = [], sebagian = [];
data.e.forEach(function (e) {
var skor = 0, cocok = 0;
tok.forEach(function (t) {
var s = e.a.indexOf(t) >= 0 ? 6 : (e.g.indexOf(t) >= 0 ? 2 : (e.n.indexOf(t) >= 0 ? 1 : 0));
if (s) { cocok++; skor += s; }
});
if (!cocok) return;
var pos = e.a.indexOf(kunci);
if (pos === 0) skor += 4; else if (pos > 0) skor += 2;
(cocok === tok.length ? penuh : sebagian).push({ e: e, s: skor });
});
var daftar = penuh.length ? penuh : sebagian;
daftar.sort(function (a, b) { return b.s - a.s; });
return daftar.map(function (h) { return h.e; });
}
function jarak(a, b) {
var d = [], i, j;
for (i = 0; i <= a.length; i++) d[i] = [i];
for (j = 1; j <= b.length; j++) d[0][j] = j;
for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
return d[a.length][b.length];
}
function saran(q) {
var hasil = [];
N(q).split(' ').forEach(function (t) {
if (t.length < 3) return;
var terbaik = null, nilai = 99;
data.v.forEach(function (w) { var n = jarak(t, N(w)); if (n < nilai) { nilai = n; terbaik = w; } });
if (terbaik && nilai <= Math.max(1, Math.floor(t.length / 3)) && hasil.indexOf(terbaik) < 0) hasil.push(terbaik);
});
return hasil.slice(0, 4);
}
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
window.Cari = { muat: muat, cari: cari, saran: saran, esc: esc, B: B };

function ui() {
var f = document.getElementById('cari-form');
if (!f) return;
var st = document.createElement('style');
st.textContent = '.cari{padding:0 20px 14px}.cari form{display:flex;gap:8px}.cari input{flex:1;min-width:0;font:inherit;font-size:15px;padding:11px 14px;border:1px solid var(--line);border-radius:12px;background:#fff}' +
'.cari button{font:inherit;font-weight:700;font-size:13.5px;padding:0 16px;border:0;border-radius:12px;background:var(--teal);color:#fff;cursor:pointer}' +
'.cari ul{list-style:none;margin:8px 0 0;padding:0}.cari li a{display:block;padding:10px 12px;margin-bottom:6px;border-radius:12px;background:#eaf3f1;text-decoration:none;color:var(--ink)}' +
'.cari li b{display:block;font-size:14px;color:var(--teal-dark)}.cari li small{font-size:11.5px;color:var(--gold);font-weight:700}.cari li span{display:block;font-size:12.5px;color:var(--muted);margin-top:2px}.cari li.kosong{padding:10px 12px;font-size:13px;color:var(--muted)}';
document.head.appendChild(st);
var q = document.getElementById('cari-q'), ul = document.getElementById('cari-hasil'), t;
function jalan() {
var s = q.value.trim();
if (!s) { ul.innerHTML = ''; return; }
muat().then(function () {
var r = cari(s);
ul.innerHTML = r.length ? r.slice(0, 8).map(function (e) { return '<li><a href="' + e.u + '"><b>' + esc(e.t) + '</b>' + (e.p ? '<small>' + esc(e.p) + '</small>' : '') + '<span>' + esc(e.d) + '</span></a></li>'; }).join('')
: '<li class="kosong">Tidak ada hasil untuk “' + esc(s) + '”. Tekan Cari untuk melihat saran.</li>';
});
}
q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(jalan, 120); });
f.addEventListener('submit', function (e) {
e.preventDefault();
var s = q.value.trim();
if (!s) return;
muat().then(function () {
var r = cari(s);
location.href = r.length ? B + r[0].u : B + '404.html?kode=cari&q=' + encodeURIComponent(s);
});
});
var awal = new URLSearchParams(location.search).get('cari');
if (awal) { q.value = awal; jalan(); }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ui); else ui();
})();
