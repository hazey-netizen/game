const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
let score = 0;
let highScore = 10; // You can adjust this high score threshold

// Love messages for milestones
const messages = [
    { score: 5, text: "Hey, you're doing pretty good 💖" },
    { score: 10, text: "Good job 😘" },
    { score: 20, text: "High Score!!!!!" },
];

function showMessage(text) {
    const msg = document.createElement("div");
    msg.textContent = text;
    msg.style.position = "absolute";
    msg.style.top = "50%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.background = "#fff0f5";
    msg.style.color = "#d63384";
    msg.style.padding = "1rem";
    msg.style.borderRadius = "10px";
    msg.style.fontSize = "1.2rem";
    msg.style.boxShadow = "0 0 10px #d63384";
    gameArea.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 2000);
}

// Move basket on touch or mouse
gameArea.addEventListener("mousemove", (e) => {
    const rect = gameArea.getBoundingClientRect();
    let x = e.clientX - rect.left;
    basket.style.left = `${x}px`;
});

gameArea.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const rect = gameArea.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    basket.style.left = `${x}px`;
}, { passive: false });

// Drop hearts
function dropHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = `${Math.random() * (gameArea.clientWidth - 20)}px`;
    gameArea.appendChild(heart);

    let top = 0;
    const fallSpeed = 2 + Math.random() * 2;

    const fall = setInterval(() => {
        top += fallSpeed;
        heart.style.top = `${top}px`;

        const basketRect = basket.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if (
            heartRect.bottom >= basketRect.top &&
            heartRect.left < basketRect.right &&
            heartRect.right > basketRect.left
        ) {
            // Caught!
            score++;
            scoreDisplay.textContent = score;
            heart.remove();
            clearInterval(fall);

            checkMilestones();
        }

        if (top > gameArea.clientHeight) {
            heart.remove();
            clearInterval(fall);
        }
    }, 16);
}

function checkMilestones() {
    messages.forEach(msg => {
        if (score === msg.score) {
            showMessage(msg.text);
        }
    });

    if (score === highScore) {
        celebrate();
    }
}

function celebrate() {
    showMessage("🎉 Why tf are you so good at this lol. I love you!! 🎉");

    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement("div");
        confetti.textContent = "💖";
        confetti.style.position = "absolute";
        confetti.style.left = `${Math.random() * gameArea.clientWidth}px`;
        confetti.style.top = `0px`;
        confetti.style.fontSize = "1.5rem";
        gameArea.appendChild(confetti);

        let top = 0;
        const fallSpeed = 1 + Math.random() * 3;

        const fall = setInterval(() => {
            top += fallSpeed;
            confetti.style.top = `${top}px`;
            if (top > gameArea.clientHeight) {
                confetti.remove();
                clearInterval(fall);
            }
        }, 16);
    }
}

setInterval(dropHeart, 1000);