// 1. Inisialisasi Audio
const music = document.getElementById("weddingMusic");
const musicIcon = document.getElementById("musicIcon");

// 2. Fungsi Putar Musik (Dipanggil saat Klik Pertama)
function playWeddingMusic() {
    if (music && music.paused) {
        music.play().then(() => {
            if (musicIcon) musicIcon.innerText = "▶︎"; 
            if (musicIcon) musicIcon.parentElement.style.opacity = "1";
        }).catch(e => console.log("Musik tertunda..."));
    }
}

// 3. Fungsi Buka Undangan (Jika Cover ada di halaman yang sama)
function openInvitation() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    
    if (cover) cover.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    
    document.body.style.overflow = 'auto'; 
    window.scrollTo(0, 0);

    // Trigger musik saat tombol "Open" diklik
    playWeddingMusic();
}

// 4. Tombol Scroll ke Bawah
function scrollNext() {
    // Pastikan musik jalan saat scroll tombol panah
    playWeddingMusic();

    const nextSection = document.getElementById("next-section");
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
    }
}

// 5. Toggle Musik (On/Off)
function toggleMusic() {
    if (music.paused) {
        music.play();
        if (musicIcon) musicIcon.parentElement.style.opacity = "1";
    } else {
        music.pause();
        if (musicIcon) musicIcon.parentElement.style.opacity = "0.5";
    }
}

// 6. Logika Slide Gallery (Agar lancar)
function moveSlide(direction) {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;
    const frameWidth = grid.clientWidth;
    grid.scrollBy({
        left: direction * frameWidth,
        behavior: "smooth"
    });
}

// 7. Auto Play Musik jika ada Parameter ?play=true
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('play') === 'true') {
        // Karena aturan browser, kita pasang listener di seluruh layar
        document.body.addEventListener('click', playWeddingMusic, { once: true });
        document.body.addEventListener('touchstart', playWeddingMusic, { once: true });
        document.body.addEventListener('wheel', playWeddingMusic, { once: true });
    }
});

// 8. Countdown Logic (Pastikan targetDate benar)
const targetDate = new Date("Jan 21, 2026 13:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff < 0) return;

    document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
}, 1000);