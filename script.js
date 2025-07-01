const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
let score = 0;
let highScore = 10; // milestone for celebration

// Personalized milestone messages for Andrea
const messages = [
  { score: 5, text: "5 hearts = 5 kisses!!!! 💖" },
  { score: 10, text: "10!!!! Keep it up babe!!!!!!!! 😘" },
  { score: 20, text: "20 hearts!!!! Beat my high score haha👑❤️" },
];

// Show message overlay in the game area
function showMessage(text) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.position = "absolute";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.background = "rgba(255, 240, 245, 0.9)";
  msg.style.color = "#d63384";
  msg.style.padding = "1rem 2rem";
  msg.style.borderRadius = "15px";
  msg.style.fontSize = "1.2rem";
  msg.style.boxShadow = "0 0 15px #d63384";
  msg.style.zIndex = "1000";
  gameArea.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}

// Move basket on mouse move (desktop)
gameArea.addEventListener("mousemove", (e) => {
  const rect = gameArea.getBoundingClientRect();
  let x = e.clientX - rect.left;
  x = Math.max(20, Math.min(x, gameArea.clientWidth - 20)); // keep inside bounds
  basket.style.left = `${x}px`;
});

// Move basket on touch move (mobile)
gameArea.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const rect = gameArea.getBoundingClientRect();
  let x = e.touches[0].clientX - rect.left;
  x = Math.max(20, Math.min(x, gameArea.clientWidth - 20)); // keep inside bounds
  basket.style.left = `${x}px`;
}, { passive: false });

// Create and drop hearts at intervals
function dropHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  heart.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`;
  heart.style.top = `-30px`; // start above game area
  gameArea.appendChild(heart);

  let top = -30;
  const fallSpeed = 2 + Math.random() * 2;

  const fall = setInterval(() => {
    top += fallSpeed;
    heart.style.top = `${top}px`;

    const basketRect = basket.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    // Detect catch (heart overlaps basket)
    if (
      heartRect.bottom >= basketRect.top &&
      heartRect.left < basketRect.right &&
      heartRect.right > basketRect.left
    ) {
      score++;
      scoreDisplay.textContent = score;
      heart.remove();
      clearInterval(fall);

      checkMilestones();
    }

    // Remove heart if it falls beyond game area
    if (top > gameArea.clientHeight) {
      heart.remove();
      clearInterval(fall);
    }
  }, 16);
}

// Check and display milestone messages & celebrate
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

// Celebrate high score with confetti hearts
function celebrate() {
  showMessage("🎉 Andrea, you reached a high score! I love you! 🎉");

  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.textContent = "💖";
    confetti.style.position = "absolute";
    confetti.style.left = `${Math.random() * gameArea.clientWidth}px`;
    confetti.style.top = `0px`;
    confetti.style.fontSize = "1.5rem";
    confetti.style.pointerEvents = "none";
    confetti.style.animation = `confettiFall ${3 + Math.random() * 2}s linear forwards`;
    gameArea.appendChild(confetti);

    confetti.addEventListener('animationend', () => confetti.remove());
  }
}

// Confetti fall animation (CSS injected dynamically)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(500px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

// Drop hearts every 900ms
setInterval(dropHeart, 900);