/* ==========================================
   Gallery Page JavaScript - รูปภาพ
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    const video = document.getElementById('centerVideo');
    const videoOverlay = document.getElementById('videoOverlay');

    // Video controls
    if (video && videoOverlay) {
        videoOverlay.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoOverlay.classList.add('hidden');
            }
        });

        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoOverlay.classList.add('hidden');
            } else {
                video.pause();
                videoOverlay.classList.remove('hidden');
            }
        });

        video.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
        });

        video.addEventListener('pause', function() {
            videoOverlay.classList.remove('hidden');
        });
    }

    // คลิกที่รูปเพื่อขยาย
    photoItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ปิด lightbox
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // กด ESC เพื่อปิด
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        
        // เพิ่ม animation ปิด
        lightboxImg.style.animation = 'none';
        lightboxImg.offsetHeight;
        lightboxImg.style.animation = '';
    }

    // เพิ่ม sparkle effect
    function createSparkle() {
        const sparkles = ['✨', '⭐', '💫'];
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 15 + 10}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            pointer-events: none;
            z-index: 5;
            animation: sparkle 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }

    // สร้าง sparkle ทุก 2 วินาที
    setInterval(createSparkle, 2000);

    // เพิ่ม CSS animation
    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
