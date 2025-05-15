// === CONFIG ===
const START_DATE = new Date("May 20, 2025 09:00:00").getTime(); // Set this to a fixed launch date
const DYNAMIC_COUNTDOWN = false; // Set to true to use 7-day countdown instead

// === COUNTDOWN TIMER ===
const countdown = () => {
  let targetDate;

  if (DYNAMIC_COUNTDOWN) {
    // 7 days from now, 9AM
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    futureDate.setHours(9, 0, 0, 0);
    targetDate = futureDate.getTime();
  } else {
    targetDate = START_DATE;
  }

  const now = new Date().getTime();
  const gap = targetDate - now;

  if (gap < 0) return; // Already launched

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((gap % (1000 * 60)) / 1000);

  const countdownEl = document.getElementById("countdown");

  // If using one element with HTML inside
  if (countdownEl && !document.getElementById("days")) {
    countdownEl.innerHTML = `
      <div>${days} <span class="text-sm">Days</span></div>
      <div>${hours} <span class="text-sm">Hours</span></div>
      <div>${minutes} <span class="text-sm">Minutes</span></div>
    `;
  }

  // If using separate elements
  if (document.getElementById("days")) {
    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");

    // Pulse effect if <1 minute remaining
    if (days === 0 && hours === 0 && minutes < 1) {
      document.getElementById("countdown")?.classList.add("animate-pulse");
    }
  }
};

setInterval(countdown, 1000);
countdown(); // Run on page load



// === FAKE LIVE COUNTER ===
setInterval(() => {
  const counter = document.getElementById("live-count");
  if (counter) {
    const current = parseInt(counter.innerText.replace(/,/g, "")) || 0;
    counter.innerText = (current + Math.floor(Math.random() * 3)).toLocaleString();
  }
}, 5000);

// === MOBILE MENU TOGGLE ===
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// === SCROLL ANIMATIONS ===
const fadeElements = document.querySelectorAll('.fade-in');

const checkVisibility = () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
