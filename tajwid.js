// Tampilkan nama hukum tajwid saat bagian berwarna diketuk.
(function () {
var INFO = {"gh": ["Ghunnah (dengung)", "Nun atau mim bertasydid. Ditahan dengan dengung sekitar 2 harakat.", "#1f9d55"], "ib": ["Idgham bighunnah", "Nun sukun atau tanwin bertemu huruf ي ن م و. Bunyinya melebur ke huruf berikutnya disertai dengung.", "#0f8b8d"], "il": ["Idgham bilaghunnah", "Nun sukun atau tanwin bertemu huruf ل atau ر. Bunyinya melebur tanpa dengung.", "#2f6fdb"], "im": ["Idgham mutamatsilain / mimi", "Dua huruf yang sama atau sejenis bertemu, huruf pertama melebur ke huruf kedua. Mim sukun bertemu mim disertai dengung.", "#5b5fc7"], "ik": ["Ikhfa haqiqi", "Nun sukun atau tanwin bertemu salah satu dari 15 huruf ikhfa. Nun disamarkan dengan dengung sekitar 2 harakat.", "#e08a1e"], "iks": ["Ikhfa syafawi", "Mim sukun bertemu huruf ب. Mim disamarkan dengan dengung.", "#e08a1e"], "iq": ["Iqlab", "Nun sukun atau tanwin bertemu huruf ب. Bunyinya berubah menjadi mim yang samar dengan dengung.", "#8e44ad"], "mt": ["Mad thabi'i", "Dibaca panjang 2 harakat.", "#e57373"], "ms": ["Mad shilah qashirah", "Ha kata ganti (هُ atau هِ) dipanjangkan 2 harakat saat bersambung dengan huruf hidup.", "#e57373"], "mb": ["Mad badal", "Huruf mad setelah hamzah. Dibaca 2 harakat.", "#e57373"], "mi": ["Mad 'iwadh", "Tanwin fathah di akhir kata saat berhenti dibaca seperti alif panjang 2 harakat.", "#e57373"], "mf": ["Mad jaiz munfasil", "Huruf mad bertemu hamzah di kata berikutnya. Boleh dibaca 2 sampai 5 harakat.", "#d64545"], "mc": ["Mad wajib muttasil", "Huruf mad bertemu hamzah dalam satu kata. Dibaca 4 sampai 5 harakat.", "#d64545"], "ml": ["Mad lazim", "Huruf mad bertemu huruf sukun atau bertasydid yang tetap. Dibaca 6 harakat.", "#a31515"], "qs": ["Qalqalah sughra", "Huruf ق ط ب ج د yang sukun di tengah kata. Dipantulkan ringan.", "#d6336c"], "qk": ["Qalqalah kubra", "Huruf qalqalah yang berhenti (waqaf). Dipantulkan lebih kuat.", "#d6336c"]};
var kotak = null, timer = 0;
function tutup() { if (kotak) kotak.classList.remove('buka'); }
document.addEventListener('click', function (e) {
var el = e.target.closest ? e.target.closest('[data-r]') : null;
if (!el) { tutup(); return; }
var i = INFO[el.getAttribute('data-r')];
if (!i) return;
if (!kotak) { kotak = document.createElement('div'); kotak.className = 'tj-toast'; kotak.setAttribute('role', 'status'); document.body.appendChild(kotak); }
kotak.innerHTML = '<b style="color:' + i[2] + '">' + i[0] + '</b><span>' + i[1] + '</span>';
kotak.classList.add('buka');
clearTimeout(timer); timer = setTimeout(tutup, 7000);
});
})();
