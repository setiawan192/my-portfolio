// js/background.js
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas agar memenuhi seluruh layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Karakter yang akan "hujan" - Katakana Jepang memberikan nuansa cyberpunk klasik
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
// Hitung berapa banyak kolom karakter yang muat di layar
const columns = Math.floor(canvas.width / fontSize);

// Buat array 'drops', satu untuk setiap kolom
// Setiap drop akan menyimpan posisi Y saat ini di kolomnya
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    // Buat latar belakang semi-transparan untuk menciptakan efek jejak (fade)
    ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Atur warna dan font untuk karakter yang jatuh
    ctx.fillStyle = '#00FFFF'; // Warna Cyan Neon
    ctx.font = fontSize + 'px monospace';

    // Loop melalui setiap kolom (setiap drop)
    for (let i = 0; i < drops.length; i++) {
        // Pilih karakter acak dari 'alphabet'
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        // Gambar karakter di posisi x, y
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Kirim drop kembali ke atas secara acak setelah melewati layar
        // Ini membuat hujan terlihat tidak seragam dan lebih natural
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Pindahkan drop ke bawah
        drops[i]++;
    }
}

// Jalankan fungsi draw berulang kali untuk menciptakan animasi
setInterval(draw, 33);

// Update ukuran canvas jika ukuran window berubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalculate columns if needed, although a full refresh might be simpler
});