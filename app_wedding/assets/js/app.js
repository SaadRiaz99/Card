document.addEventListener('DOMContentLoaded', () => {
    
    const gate = document.getElementById('gate');
    const gateBtn = document.getElementById('gateBtn');
    const tokenInput = document.getElementById('tokenInput');
    const decrypting = document.getElementById('decrypting');
    const gateError = document.getElementById('gateError');
    
    const intro = document.getElementById('intro');
    const enterApp = document.getElementById('enterApp');
    const app = document.getElementById('app');
    
    const bgAudio = document.getElementById('bgAudio');
    const audioControl = document.getElementById('audioControl');
    const audioWaves = document.getElementById('audioWaves');
    const clickSound = document.getElementById('clickSound');

    // 1. Gate Logic
    gateBtn.addEventListener('click', () => {
        const token = tokenInput.value.toUpperCase();
        if (token === 'LOVE2026') {
            gateBtn.classList.add('hidden');
            decrypting.classList.remove('hidden');
            
            setTimeout(() => {
                gsap.to(gate, { opacity: 0, duration: 1, onComplete: () => {
                    gate.classList.add('hidden');
                    startIntro();
                }});
            }, 2000);
        } else {
            gateError.classList.remove('hidden');
            gsap.from(gateError, { x: 10, repeat: 5, duration: 0.1 });
        }
    });

    // 2. Intro Sequence
    function startIntro() {
        intro.classList.remove('hidden');
        const tl = gsap.timeline();
        tl.to('.intro-line', { opacity: 1, y: -20, duration: 2, delay: 0.5 })
          .to('.intro-names', { opacity: 1, scale: 1.1, duration: 2.5 }, "-=0.5")
          .to('#enterApp', { opacity: 1, duration: 1 });
    }

    enterApp.addEventListener('click', () => {
        clickSound.play();
        gsap.to(intro, { scale: 1.5, opacity: 0, duration: 1.5, ease: "power4.in", onComplete: () => {
            intro.classList.add('hidden');
            launchApp();
        }});
    });

    // 3. App Launch
    function launchApp() {
        app.classList.remove('hidden');
        audioControl.classList.remove('hidden');
        bgAudio.play().catch(e => console.log("Autoplay blocked"));
        
        // Start Realtime Wall
        if(window.initRealtime) window.initRealtime();
        if(window.startCinematicEffects) window.startCinematicEffects();

        // Personalization from URL
        const params = new URLSearchParams(window.location.search);
        const guest = params.get('guest');
        if (guest) {
            document.getElementById('dynamicName').innerText = `Dear ${guest} & Family`;
        }

        initScrollAnimations();
        initReactions();
        initMusicVisualizer();
        triggerConfetti();
    }

    // Scroll Animations (GSAP ScrollTrigger)
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.expand-on-scroll').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // 3D Parallax effect on scroll
        document.querySelector('.scroll-container').addEventListener('scroll', (e) => {
            const scrolled = e.target.scrollTop;
            gsap.to('.hero-parallax-card', { y: scrolled * 0.2, rotationX: scrolled * 0.02 });
            
            // Dynamic Volume based on scroll
            const maxScroll = e.target.scrollHeight - e.target.clientHeight;
            const scrollPercent = scrolled / maxScroll;
            bgAudio.volume = Math.max(0.2, 1 - scrollPercent);
        });
    }

    // Reaction System
    function initReactions() {
        const btns = document.querySelectorAll('.reaction-btn');
        const container = document.getElementById('reactionBubbles');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                const emoji = btn.innerText;
                createBubble(emoji);
                // In real app, sync with Firebase here
            });
        });

        function createBubble(emoji) {
            const bubble = document.createElement('div');
            bubble.className = 'reaction-bubble';
            bubble.innerText = emoji;
            bubble.style.left = (Math.random() * 40 + 20) + 'px';
            bubble.style.bottom = '80px';
            bubble.style.position = 'fixed';
            bubble.style.fontSize = '2rem';
            bubble.style.zIndex = '2000';
            container.appendChild(bubble);

            gsap.to(bubble, {
                y: -400,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: 2,
                ease: "power1.out",
                onComplete: () => bubble.remove()
            });
        }
    }

    // Music Visualizer
    function initMusicVisualizer() {
        const bars = audioWaves.querySelectorAll('span');
        bars.forEach((bar, i) => {
            gsap.to(bar, {
                height: 20,
                duration: 0.5 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.1
            });
        });

        audioControl.addEventListener('click', () => {
            if (bgAudio.paused) {
                bgAudio.play();
                gsap.to(bars, { opacity: 1, duration: 0.3 });
            } else {
                bgAudio.pause();
                gsap.to(bars, { opacity: 0.3, duration: 0.3 });
            }
        });
    }

    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FDFCF8', '#011F16']
        });
    }

    // Initial Particles
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#D4AF37' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: { enable: true, color: '#D4AF37', opacity: 0.2 }
        }
    });
});
