function startPetals() {
    const container = document.getElementById('petal-container');
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        createPetal(container);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Style
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.opacity = Math.random();
    petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
    petal.innerHTML = '🌸';
    petal.style.position = 'fixed';
    petal.style.top = '-50px';
    petal.style.zIndex = '9500';
    petal.style.pointerEvents = 'none';

    container.appendChild(petal);

    // Animation
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
}
