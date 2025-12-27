/* ==========================================
   Index Page JavaScript - รหัสผ่าน
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');
    const errorMsg = document.getElementById('error-msg');
    const passwordSection = document.querySelector('.password-section');

    // รหัสผ่านที่ถูกต้อง (แก้ไขตามต้องการ)
    // ตัวอย่าง: วันที่เจอกันครั้งแรก format ddmmyy
    const correctPassword = '2812'; // แก้ไขรหัสผ่านที่นี่

    // กดปุ่ม submit
    submitBtn.addEventListener('click', checkPassword);

    // กด Enter ในช่อง password
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // ลบ error message เมื่อพิมพ์ใหม่
    passwordInput.addEventListener('input', function() {
        errorMsg.textContent = '';
        passwordSection.classList.remove('shake');
    });

    function checkPassword() {
        const password = passwordInput.value.trim();

        if (password === '') {
            showError('กรุณาใส่รหัสผ่านก่อนนะ 💕');
            return;
        }

        if (password === correctPassword) {
            // รหัสถูกต้อง
            successAnimation();
        } else {
            // รหัสผิด
            showError('รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งนะ 😢');
            passwordSection.classList.add('shake');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.animation = 'none';
        errorMsg.offsetHeight; // trigger reflow
        errorMsg.style.animation = 'shake 0.5s ease-in-out';
    }

    function successAnimation() {
        // เพิ่ม animation สำเร็จ
        passwordSection.classList.add('success-animation');
        submitBtn.innerHTML = '<span>💕 รักเธอนะ 💕</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';

        // สร้างหัวใจลอยขึ้น
        createHeartExplosion();

        // ไปหน้าถัดไป
        setTimeout(function() {
            window.location.href = 'letter.html';
        }, 1500);
    }

    function createHeartExplosion() {
        const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(function() {
                const heart = document.createElement('span');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.className = 'explosion-heart';
                heart.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 30 + 20}px;
                    left: ${Math.random() * 100}vw;
                    top: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: explode ${Math.random() * 1 + 0.5}s ease-out forwards;
                `;
                document.body.appendChild(heart);

                setTimeout(function() {
                    heart.remove();
                }, 1500);
            }, i * 50);
        }

        // เพิ่ม CSS animation
        if (!document.getElementById('explosion-style')) {
            const style = document.createElement('style');
            style.id = 'explosion-style';
            style.textContent = `
                @keyframes explode {
                    0% {
                        transform: translateY(0) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-200px) scale(1.5) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});
