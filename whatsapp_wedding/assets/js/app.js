document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Personalization (URL Params)
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    if (nameParam) {
        document.getElementById('guestName').innerText = `Dear ${nameParam}`;
    }

    // 2. Entrance Transition
    const entryScreen = document.getElementById('entryScreen');
    const openBtn = document.getElementById('openBtn');
    const mainCard = document.getElementById('mainCard');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    openBtn.addEventListener('click', () => {
        gsap.to(entryScreen, {
            y: '-100%',
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => {
                entryScreen.classList.add('hidden');
                mainCard.classList.remove('hidden');
                initMainAnimations();
            }
        });
        // Play music (optional)
        bgMusic.play().catch(e => console.log("Auto-play blocked"));
        musicBtn.classList.add('playing');
    });

    // 3. Music Toggle
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // 4. Main Content Animations
    function initMainAnimations() {
        gsap.from('.hero > *', {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
        });
    }

    // 5. Slider Logic (Simple Auto-scroll for mobile)
    const slider = document.querySelector('.slider');
    let slideIndex = 0;
    setInterval(() => {
        slideIndex = (slideIndex + 1) % 3;
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }, 3000);

    // 6. Countdown Timer
    const targetDate = new Date("June 15, 2026 16:30:00").getTime();
    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d.toString().padStart(2, '0');
        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('mins').innerText = m.toString().padStart(2, '0');
        document.getElementById('secs').innerText = s.toString().padStart(2, '0');
    }
    setInterval(updateTimer, 1000);
    updateTimer();

    // 7. RSVP Handling
    const rsvpForm = document.getElementById('rsvpForm');
    const directWA = document.getElementById('directWA');
    const whatsappNumber = "1234567890"; // Replace with real number

    function getRSVPMessage() {
        const name = document.getElementById('formName').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const guests = document.getElementById('formGuests').value;
        return encodeURIComponent(`Hello! RSVP for Wedding:\nName: ${name}\nAttending: ${attendance}\nGuests: ${guests}`);
    }

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = getRSVPMessage();
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        showModal();
    });

    directWA.addEventListener('click', (e) => {
        e.preventDefault();
        const message = encodeURIComponent("Hello! I would like to RSVP for the wedding.");
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    });

    // Modal Control
    const modal = document.getElementById('successModal');
    function showModal() {
        modal.classList.remove('hidden');
    }
    window.closeModal = () => {
        modal.classList.add('hidden');
    }
});
