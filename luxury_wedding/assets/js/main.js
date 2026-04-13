document.addEventListener('DOMContentLoaded', () => {
    
    // --- Entrance Gate ---
    const entranceGate = document.getElementById('entranceGate');
    const enterBtn = document.getElementById('enterInvite');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');

    enterBtn.addEventListener('click', () => {
        entranceGate.classList.add('exit');
        bgMusic.play();
        musicIcon.classList.add('playing');
        
        // Start Animations
        initGSAP();
        initConfetti();
    });

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.classList.add('playing');
        } else {
            bgMusic.pause();
            musicIcon.classList.remove('playing');
        }
    });

    // --- GSAP Animations ---
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Reveal
        const tl = gsap.timeline();
        tl.from('.date-reveal', { y: 20, opacity: 0, duration: 1, delay: 0.5 })
          .from('.couple-names', { y: 50, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.5")
          .from('.wedding-date', { opacity: 0, duration: 1 }, "-=1");

        // Section Transitions (Parallax)
        gsap.utils.toArray('.scene').forEach((section, i) => {
            if (i === 0) return; // Skip hero

            gsap.from(section.querySelectorAll('.glass-card, .section-title, .countdown-timer'), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out"
            });
        });

        // Mouse Parallax for Hero
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to('.parallax-layer', {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // --- Countdown Timer ---
    const targetDate = new Date("Dec 10, 2026 16:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const gap = targetDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- RSVP Modal ---
    const rsvpModal = document.getElementById('rsvpModal');
    const openRSVP = document.getElementById('openRSVP');
    const closeModal = document.querySelector('.close-modal');
    const rsvpForm = document.getElementById('rsvpForm');

    openRSVP.addEventListener('click', () => {
        rsvpModal.style.display = 'flex';
        gsap.from('.modal-content', { scale: 0.8, opacity: 0, duration: 0.5 });
    });

    closeModal.addEventListener('click', () => {
        rsvpModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === rsvpModal) rsvpModal.style.display = 'none';
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you! Your response has been received.");
        rsvpModal.style.display = 'none';
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FDFCF8', '#011F16']
        });
    });

    function initConfetti() {
        // Subtle gold dust effect on start
        const end = Date.now() + (2 * 1000);
        const colors = ['#D4AF37', '#FDFCF8'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});
