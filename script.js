// === GLOBAL VARIABLES ===
const loader = document.getElementById('loader');
const intro = document.getElementById('intro');
const mainSite = document.getElementById('mainSite');
const enterBtn = document.getElementById('enterBtn');
const navbar = document.getElementById('navbar');

// === INIT FUNCTION ===
function init() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Start particles
  initParticles();

  // Loader sequence
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 2000);
}

// === INTRO TRANSITION ===
enterBtn.addEventListener('click', () => {
  intro.style.transform = 'scale(0.8)';
  intro.style.opacity = '0';
  
  setTimeout(() => {
    intro.style.display = 'none';
    mainSite.classList.remove('hidden');
    navbar.style.background = 'rgba(244, 248, 247, 0.95)';
    
    // Trigger scroll animations
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.classList.add('loaded');
    }, 300);
  }, 800);
});

// === PARTICLE SYSTEM ===
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 100;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (