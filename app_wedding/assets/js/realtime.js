// Real-time Social Wall Engine
const RealtimeEngine = (() => {
    const wishesWall = document.getElementById('wishesWall');
    const wishInput = document.getElementById('wishInput');
    const postWishBtn = document.getElementById('postWish');

    // Simulated Initial Data
    let wishes = [
        { name: "Sarah", text: "Mubarak ho Evelyn & Alexander! ❤️", initial: "S" },
        { name: "John", text: "Can't wait to celebrate with you guys! ✨", initial: "J" },
        { name: "Ali", text: "Best wishes for your new journey! 🎉", initial: "A" }
    ];

    const renderWish = (wish) => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `
            <div class="avatar">${wish.initial}</div>
            <div class="wish-content">
                <p class="wish-text">${wish.text}</p>
            </div>
        `;
        wishesWall.prepend(item);
        gsap.from(item, { x: -30, opacity: 0, duration: 0.5 });
    };

    const init = () => {
        wishes.forEach(renderWish);

        postWishBtn.addEventListener('click', () => {
            const text = wishInput.value.trim();
            if (text) {
                const newWish = { 
                    name: "Guest", 
                    text: text, 
                    initial: "G" 
                };
                renderWish(newWish);
                wishInput.value = '';
                
                // Trigger Confetti on wish
                confetti({
                    particleCount: 40,
                    spread: 50,
                    origin: { y: 0.9 },
                    colors: ['#D4AF37']
                });
            }
        });

        // Simulate random incoming wishes every 15 seconds
        setInterval(() => {
            const simulatedWishes = ["Sending love!", "Beautiful couple!", "Blessings!", "So happy for you!"];
            const randomText = simulatedWishes[Math.floor(Math.random() * simulatedWishes.length)];
            renderWish({ name: "Friend", text: randomText, initial: "?" });
        }, 15000);
    };

    return { init };
})();

// Start Realtime Wall when App Launches
document.addEventListener('DOMContentLoaded', () => {
    // We call this after App Launch in app.js
    // For now, hook into the window
    window.initRealtime = RealtimeEngine.init;
});

// REAL FIREBASE CONFIG (TEMPLATE)
/*
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const wishesRef = db.ref('wishes');

// To Post:
// wishesRef.push({ name: "...", text: "...", initial: "..." });

// To Listen:
// wishesRef.on('child_added', (snapshot) => renderWish(snapshot.val()));
*/
