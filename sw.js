// Service worker: menyimpan seluruh situs agar bisa dibuka tanpa internet.
// Naikkan nomor VERSI setiap kali isi situs berubah supaya penyimpanan lama dibersihkan.
const VERSI = 'jadwal-solat-v2';
const ASET = [
 "./",
 "doa.html",
 "hari-besar.html",
 "dzikir.html",
 "hukum-salat.html",
 "imam-makmum.html",
 "index.html",
 "kiblat.html",
 "puasa.html",
 "quran.html",
 "salat-khusus.html",
 "shalawat.html",
 "yasin.html",
 "zakat.html",
 "fonts/fonts.css",
 "fonts/amiri-arabic-400-normal.woff2",
 "fonts/amiri-arabic-700-normal.woff2",
 "fonts/amiri-latin-400-normal.woff2",
 "fonts/amiri-latin-700-normal.woff2",
 "fonts/inter-latin-400-normal.woff2",
 "fonts/inter-latin-500-normal.woff2",
 "fonts/inter-latin-600-normal.woff2",
 "fonts/inter-latin-700-normal.woff2",
 "fonts/inter-latin-800-normal.woff2",
 "favicon.svg",
 "manifest.webmanifest",
 "icon-192.png",
 "icon-512.png",
 "icon-maskable-512.png"
];

self.addEventListener('install', (e) => {
e.waitUntil(caches.open(VERSI).then((c) => c.addAll(ASET)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSI).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
const r = e.request;
if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
e.respondWith((async () => {
const hit = await caches.match(r, { ignoreSearch: true });
const net = fetch(r).then((res) => {
if (res && res.ok) { const salinan = res.clone(); caches.open(VERSI).then((c) => c.put(r, salinan)); }
return res;
});
if (hit) { net.catch(() => {}); return hit; } // tampilkan simpanan dulu, perbarui diam-diam
try { return await net; } catch (err) { return (await caches.match('index.html')) || Response.error(); }
})());
});
