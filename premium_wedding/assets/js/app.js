document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Password Gate ---
    const passwordGate = document.getElementById('passwordGate');
    const unlockBtn = document.getElementById('unlockBtn');
    const gatePass = document.getElementById('gatePass');
    const passError = document.getElementById('passError');
    const entryScreen = document.getElementById('entryScreen');

    unlockBtn.addEventListener('click', () => {
        if (gatePass.value.toLowerCase() === 'love') {
            gsap.to(passwordGate, { y: '-100%', duration: 1, ease: 'power3.inOut', onComplete: () => {
                passwordGate.classList.add('hidden');
                entryScreen.classList.remove('hidden');
                initPersonalization();
            }});
        } else {
            passError.classList.remove('hidden');
        }
    });

    // --- 2. Personalization ---
    function initPersonalization() {
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('name');
        if (guestName) {
            document.getElementById('guestGreeting').innerText = `Dear ${guestName},`;
        }
    }

    // --- 3. Open Invitation ---
    const openInvite = document.getElementById('openInvite');
    const mainContainer = document.getElementById('mainContainer');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    openInvite.addEventListener('click', () => {
        gsap.to(entryScreen, { opacity: 0, duration: 1, onComplete: () => {
            entryScreen.classList.add('hidden');
            mainContainer.classList.remove('hidden');
            gsap.from('.card-body', { scale: 0.9, opacity: 0, duration: 1.5, ease: 'power4.out' });
            startPetals();
            initCountdown();
            initGallery();
            triggerConfetti();
        }});
    });

    // --- 12. Music Control ---
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.remove('muted');
            musicToggle.querySelector('.music-icon').classList.add('playing');
        } else {
            bgMusic.pause();
            musicToggle.classList.add('muted');
            musicToggle.querySelector('.music-icon').classList.remove('playing');
        }
    });

    // --- 6. Countdown Timer ---
    function initCountdown() {
        const target = new Date("Dec 10, 2026 16:00:00").getTime();
        setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('days').innerText = d.toString().padStart(2, '0');
            document.getElementById('hours').innerText = h.toString().padStart(2, '0');
            document.getElementById('mins').innerText = m.toString().padStart(2, '0');
            document.getElementById('secs').innerText = s.toString().padStart(2, '0');
        }, 1000);
    }

    // --- 7. Gallery Slider ---
    function initGallery() {
        const slider = document.getElementById('gallerySlider');
        let index = 0;
        setInterval(() => {
            index = (index + 1) % 3;
            slider.style.transform = `translateX(-${index * 100}%)`;
        }, 4000);
    }

    // --- 8. Live Wishes (Local Fallback) ---
    const wishesList = document.getElementById('wishesList');
    const wishForm = document.getElementById('submitWish');
    
    wishForm.addEventListener('click', () => {
        const name = document.getElementById('wishName').value;
        const text = document.getElementById('wishText').value;
        if (name && text) {
            const wish = document.createElement('div');
            wish.className = 'wish-card';
            wish.innerText = `"${text}" - ${name}`;
            wishesList.prepend(wish);
            gsap.from(wish, { x: -20, opacity: 0, duration: 0.5 });
            document.getElementById('wishName').value = '';
            document.getElementById('wishText').value = '';
        }
    });

    // --- 9. RSVP Handling ---
    const rsvpForm = document.getElementById('rsvpForm');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('rsvpName').value;
        const attend = document.getElementById('rsvpAttend').value;
        const guests = document.getElementById('rsvpGuests').value;

        // WhatsApp Redirect
        const waMsg = encodeURIComponent(`Wedding RSVP:\nName: ${name}\nAttendance: ${attend}\nGuests: ${guests}`);
        window.open(`https://wa.me/1234567890?text=${waMsg}`, '_blank');

        showSuccess("Response Sent! 💛");
        triggerConfetti();
    });

    // Helpers
    function triggerConfetti() {
        confetti({
            particleCount: 150, spread: 70, origin: { y: 0.6 },
            colors: ['#C5A059', '#FDFCF8', '#011F16']
        });
    }
});

function showSuccess(msg) {
    const overlay = document.getElementById('successOverlay');
    document.getElementById('successMsg').innerText = msg;
    overlay.classList.remove('hidden');
}

function closeSuccess() {
    document.getElementById('successOverlay').classList.add('hidden');
}
