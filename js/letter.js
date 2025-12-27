/* ==========================================
   Letter Page JavaScript - จดหมาย
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const letterContainer = document.getElementById('letter-container');

    // คลิกที่ซองจดหมาย
    envelope.addEventListener('click', openEnvelope);

    function openEnvelope() {
        // เพิ่ม class opened ให้ซองจดหมาย
        envelope.classList.add('opened');

        // รอ animation เสร็จแล้วแสดงจดหมาย
        setTimeout(function() {
            envelope.style.display = 'none';
            letterContainer.classList.add('show');
            
            // สร้างหัวใจตกลงมา
            createFallingHearts();
        }, 800);
    }

    function createFallingHearts() {
        const hearts = ['💕', '💖', '💗', '💓', '💝'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(function() {
                const heart = document.createElement('span');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 20 + 15}px;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: fall ${Math.random() * 2 + 2}s ease-in forwards;
                `;
                document.body.appendChild(heart);

                setTimeout(function() {
                    heart.remove();
                }, 4000);
            }, i * 100);
        }

        // เพิ่ม CSS animation
        if (!document.getElementById('fall-style')) {
            const style = document.createElement('style');
            style.id = 'fall-style';
            style.textContent = `
                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // เพิ่ม effect ให้ข้อความค่อยๆ ปรากฏ
    function animateText() {
        const paragraphs = document.querySelectorAll('.letter-content p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
    }

    // เรียกใช้เมื่อจดหมายปรากฏ
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('show')) {
                animateText();
            }
        });
    });

    observer.observe(letterContainer, { attributes: true, attributeFilter: ['class'] });
});
