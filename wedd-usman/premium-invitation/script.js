document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('invitationWrapper');
    const card = document.getElementById('card');
    const downloadBtn = document.getElementById('downloadBtn');

    // 1. Fade-in Animation on Load
    setTimeout(() => {
        wrapper.classList.add('visible');
    }, 300);

    // 2. Download/Print Functionality
    downloadBtn.addEventListener('click', () => {
        // UI Feedback
        const originalText = downloadBtn.querySelector('span').innerText;
        downloadBtn.querySelector('span').innerText = "PREPARING...";
        
        setTimeout(() => {
            window.print();
            downloadBtn.querySelector('span').innerText = originalText;
        }, 800);
    });

    // 3. Gentle Mouse Interaction (Hover Glow)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add a subtle dynamic glow following the mouse
        card.style.background = `
            radial-gradient(circle at ${x}px ${y}px, rgba(251, 245, 183, 0.15) 0%, transparent 50%),
            url("https://www.transparenttextures.com/patterns/marble-similar.png"),
            var(--pearl)
        `;
    });

    card.addEventListener('mouseleave', () => {
        // Reset background
        card.style.background = `
            url("https://www.transparenttextures.com/patterns/marble-similar.png"),
            var(--pearl)
        `;
    });
});
