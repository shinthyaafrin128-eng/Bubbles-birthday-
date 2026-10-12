// Customize the birthday person's name here:
const birthdayPerson = "Someone Special";

const recipientName = document.getElementById("recipientName");
const surpriseBtn = document.getElementById("surpriseBtn");
const surprisePanel = document.getElementById("surprisePanel");
const celebrateBtn = document.getElementById("celebrateBtn");
const toast = document.getElementById("toast");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

recipientName.textContent = birthdayPerson;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let pieces = [];
let animating = false;
function confettiBurst(amount = 150) {
  const colors = ["#ff79b8", "#d4b8ff", "#fff0a8", "#9cf4df", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    pieces.push({
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * (0.12 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -8 - 2,
      gravity: 0.13 + Math.random() * 0.12,
      size: 3 + Math.random() * 5,
      rotation: Math.random() * 6,
      spin: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100 + Math.random() * 65
    });
  }
  if (!animating) {
    animating = true;
    requestAnimationFrame(drawConfetti);
  }
}
function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces = pieces.filter(p => p.life > 0 && p.y < window.innerHeight + 30);
  for (const p of pieces) {
    p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.spin; p.life--;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.min(1, p.life / 25);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    ctx.restore();
  }
  if (pieces.length) requestAnimationFrame(drawConfetti);
  else { animating = false; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
}

surpriseBtn.addEventListener("click", () => {
  surprisePanel.classList.add("show");
  surprisePanel.scrollIntoView({ behavior: "smooth", block: "center" });
  confettiBurst(190);
  surpriseBtn.innerHTML = "<span>Your Surprise Is Open!</span><span class='button-sparkle'>♥</span>";
  showToast("Happy Birthday! তুমি অনেক স্পেশাল 💖");
});

celebrateBtn.addEventListener("click", () => {
  confettiBurst(240);
  showToast("আরও অনেক হাসি আর আনন্দ তোমার হোক! ✨");
});

// Small floating hearts appear when the page is tapped.
document.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  const heart = document.createElement("span");
  heart.textContent = ["♥", "♡", "✦"][Math.floor(Math.random() * 3)];
  heart.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;z-index:9;pointer-events:none;color:#ff8bc5;font-size:${14 + Math.random()*16}px;transition:all 900ms ease;`;
  document.body.appendChild(heart);
  requestAnimationFrame(() => {
    heart.style.transform = `translate(${(Math.random()-.5)*45}px,-65px) rotate(${Math.random()*40-20}deg)`;
    heart.style.opacity = "0";
  });
  window.setTimeout(() => heart.remove(), 950);
});
