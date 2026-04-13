// Specialized Cinematic Effects Engine
const EffectEngine = (() => {
    
    // Falling Petals System (GSAP)
    const startPetals = () => {
        const container = document.body;
        const petalCount = 10;
        
        for (let i = 0; i < petalCount; i++) {
            createPetal(container);
        }
    };

    const createPetal = (container) => {
        const petal = document.createElement('div');
        petal.innerHTML = '🌸';
        petal.style.position = 'fixed';
        petal.style.top = '-50px';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.zIndex = '9500';
        petal.style.pointerEvents = 'none';
        petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(petal);

        gsap.to(petal, {
            y: '110vh',
            x: '+=100',
            rotation: 360,
            duration: Math.random() * 5 + 5,
            ease: 'none',
            onComplete: () => {
                petal.remove();
                createPetal(container);
            }
        });
    };

    return { startPetals };
})();

// Hook into window for app.js to call
window.startCinematicEffects = EffectEngine.startPetals;
