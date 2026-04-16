document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Fade-in on Page Load
    const invitationCard = id('invitationCard');
    
    // Add active class after a short delay
    setTimeout(() => {
        invitationCard.classList.add('active');
    }, 200);

    // 2. Download Button Functionality (Print)
    const downloadBtn = id('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Provide visual feedback before printing
            const btnText = downloadBtn.querySelector('span');
            const originalText = btnText.innerText;
            btnText.innerText = "PREPARING...";
            
            setTimeout(() => {
                window.print();
                btnText.innerText = originalText;
            }, 500);
        });
    }

    // 3. Subtle Glow/Mouse Effect
    const card = document.querySelector('.invitation-card');
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set custom properties for a subtle dynamic glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});

// Helper: Get element by ID
function id(elementId) {
    return document.getElementById(elementId);
}
