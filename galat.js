// Menangkap error JavaScript di halaman. Menampilkan kotak peringatan yang bisa ditutup.
// Ubah ke true agar error langsung mengalihkan ke 404.html (hati-hati: error ringan pun akan ikut mengalihkan).
(function () {
var ALIHKAN_KE_404 = false;
var base = location.pathname.indexOf('/jadwal-solat/') === 0 ? '/jadwal-solat/' : '/';
var tampil = false;

function sendiri(file) { return !file || file.indexOf(location.origin) === 0; }

function layar(pesan) {
if (tampil) return;
tampil = true;
if (ALIHKAN_KE_404) {
try { if (sessionStorage.getItem('galat-alih')) return; sessionStorage.setItem('galat-alih', '1'); } catch (e) {}
location.replace(base + '404.html?kode=error&dari=' + encodeURIComponent(location.pathname));
return;
}
var tunggu = function () {
var k = document.createElement('div');
k.setAttribute('role', 'alert');
k.style.cssText = 'position:fixed;left:12px;right:12px;bottom:16px;max-width:420px;margin:0 auto;padding:14px;border-radius:14px;background:#7a1f1f;color:#fff;font:13px/1.55 Inter,system-ui,sans-serif;box-shadow:0 10px 28px rgba(0,0,0,.3);z-index:9999';
k.innerHTML = '<b style="display:block;font-size:14px;margin-bottom:2px">Ada yang tidak beres di halaman ini</b>Sebagian fitur mungkin tidak berjalan. Coba muat ulang halaman.<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"></div>';
var baris = k.lastChild;
[['Muat ulang', function () { location.reload(); }], ['Ke beranda', function () { location.href = base + 'index.html'; }], ['Tutup', function () { k.remove(); }]].forEach(function (t) {
var b = document.createElement('button');
b.textContent = t[0];
b.style.cssText = 'font:inherit;font-weight:600;padding:7px 12px;border:1px solid rgba(255,255,255,.5);border-radius:10px;background:transparent;color:#fff;cursor:pointer';
b.onclick = t[1];
baris.appendChild(b);
});
document.body.appendChild(k);
};
if (document.body) tunggu(); else document.addEventListener('DOMContentLoaded', tunggu);
}

window.addEventListener('error', function (e) {
if (e.target && e.target !== window) return;          // kegagalan memuat gambar/font: abaikan
if (!sendiri(e.filename)) return;                      // error dari ekstensi atau skrip luar: abaikan
layar(e.message);
});
window.addEventListener('unhandledrejection', function (e) {
var r = e.reason;
if (r && (r.name === 'AbortError' || r.name === 'NotAllowedError')) return;   // dibatalkan atau ditolak pengguna
layar(String(r && r.message || r));
});
})();
