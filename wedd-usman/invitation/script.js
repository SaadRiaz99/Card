document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Fade-in Animation on Load
    const cardWrapper = document.querySelector('.card-wrapper');
    
    // Small delay to ensure styles are loaded and transition is visible
    setTimeout(() => {
        cardWrapper.classList.add('active');
    }, 200);

    // 2. Download Invitation Button (Window Print)
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Provide a small feedback before printing
            downloadBtn.innerText = "Preparing PDF...";
            downloadBtn.style.opacity = "0.7";
            
            setTimeout(() => {
                window.print();
                downloadBtn.innerText = "Download Invitation";
                downloadBtn.style.opacity = "1";
            }, 500);
        });
    }

    // 3. JS-Enhanced Hover Effect (Class Toggling)
    const invitationCard = document.querySelector('.invitation-card');
    
    if (invitationCard) {
        invitationCard.addEventListener('mouseenter', () => {
            invitationCard.classList.add('card-hover');
        });
        
        invitationCard.addEventListener('mouseleave', () => {
            invitationCard.classList.remove('card-hover');
        });
    }

    // Optional: Log success for verification
    console.log("Wedding Invitation Loaded Successfully.");
});
