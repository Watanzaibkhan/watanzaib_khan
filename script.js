// ===================================
// LOADING → WELCOME → MAIN
// ===================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const welcomeAnim   = document.getElementById('welcome-animation');

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            welcomeAnim.classList.add('active');
            setTimeout(() => {
                welcomeAnim.classList.add('fade-out');
                setTimeout(() => {
                    welcomeAnim.style.display = 'none';
                    welcomeAnim.classList.remove('active','fade-out');
                    triggerScrollReveal();
                    startTyping();
                }, 900);
            }, 2500);
        }, 500);
    }, 3000);
});

// ===================================
// NAVBAR SCROLL
// ===================================
const navbar     = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    triggerScrollReveal();
    animateProgressBars();
    highlightNavLink();
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===================================
// HAMBURGER MENU
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    const open  = navMenu.classList.contains('active');
    spans[0].style.transform = open ? 'rotate(45deg) translate(6px,6px)'  : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(6px,-6px)' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

// ===================================
// ACTIVE NAV LINK
// ===================================
function highlightNavLink() {
    document.querySelectorAll('section[id]').forEach(sec => {
        const top  = sec.offsetTop - 110;
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (!link) return;
        if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// ===================================
// SCROLL REVEAL
// ===================================
const revealSelectors = [
    '.timeline-item','.skill-card','.edu-card',
    '.cert-item','.gallery-item','.contact-card',
    '.about-content','.hero-text','.hero-image'
];

function triggerScrollReveal() {
    document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 70) {
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Set initial hidden state
document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
});

// ===================================
// SKILL PROGRESS BARS
// ===================================
let progressDone = false;
function animateProgressBars() {
    const sec = document.getElementById('skills');
    if (!sec || progressDone) return;
    if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
        progressDone = true;
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress') + '%';
        });
    }
}

// ===================================
// TYPING EFFECT
// ===================================
const phrases = [
    'Assistant Microbiologist',
    'Laboratory Technologist',
    'TB / AFB Diagnostics Expert',
    'Lab Instructor & Trainer'
];

function startTyping() {
    const el = document.querySelector('.hero-subtitle');
    if (!el) return;
    let pi = 0, ci = 0, del = false;

    function tick() {
        const word = phrases[pi];
        el.textContent = del ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
        if (!del) {
            ci++;
            if (ci === word.length) { del = true; setTimeout(tick, 1800); return; }
        } else {
            ci--;
            if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
        }
        setTimeout(tick, del ? 55 : 95);
    }
    tick();
}

// ===================================
// CONTACT FORM → WHATSAPP
// ===================================
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const text    = encodeURIComponent(`Hello Watanzaib!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
        window.open(`https://wa.me/923248190013?text=${text}`, '_blank');
        form.reset();
        toast('Message sent via WhatsApp! ✅');
    });
}

function toast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = `
        position:fixed;bottom:130px;right:2rem;
        background:linear-gradient(135deg,#6366f1,#8b5cf6);
        color:#fff;padding:.9rem 1.8rem;border-radius:50px;
        font-weight:600;z-index:9999;
        animation:fadeInUp .4s ease;
        box-shadow:0 8px 25px rgba(99,102,241,.45);`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// ===================================
// GALLERY LIGHTBOX
// ===================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.querySelector('img')?.src;
        if (!src) return;
        const overlay = document.createElement('div');
        overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.93);
            display:flex;align-items:center;justify-content:center;
            z-index:10000;cursor:zoom-out;animation:fadeIn .3s ease`;
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = `max-width:92vw;max-height:92vh;border-radius:12px;
            box-shadow:0 0 60px rgba(99,102,241,.5);animation:fadeInUp .3s ease`;
        overlay.appendChild(img);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ===================================
// CLICK SPARK BURST
// ===================================
document.addEventListener('click', e => {
    if (e.target.closest('a,button,input,textarea,.gallery-item,.float-btn')) return;
    const clrs = ['#6366f1','#8b5cf6','#06b6d4','#10b981'];
    for (let i = 0; i < 8; i++) {
        const s     = document.createElement('div');
        const size  = Math.random() * 8 + 4;
        const angle = (i / 8) * Math.PI * 2;
        const dist  = Math.random() * 55 + 25;
        s.style.cssText = `
            position:fixed;left:${e.clientX}px;top:${e.clientY}px;
            width:${size}px;height:${size}px;
            background:${clrs[i % clrs.length]};border-radius:50%;
            pointer-events:none;z-index:9998;
            transform:translate(-50%,-50%);
            animation:sparkFly .65s ease forwards;
            --dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 700);
    }
});

// ===================================
// CANVAS ANIMATED MICROORGANISMS
// ===================================
(function () {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.16;`;
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const CLRS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#7c3aed'];

    class Organism {
        constructor() { this.reset(); }
        reset() {
            this.x     = Math.random() * canvas.width;
            this.y     = Math.random() * canvas.height;
            this.r     = Math.random() * 20 + 6;
            this.vx    = (Math.random() - .5) * .55;
            this.vy    = (Math.random() - .5) * .55;
            this.color = CLRS[Math.floor(Math.random() * CLRS.length)];
            this.type  = Math.floor(Math.random() * 4);
            this.angle = Math.random() * Math.PI * 2;
            this.spin  = (Math.random() - .5) * .018;
            this.flags = Math.floor(Math.random() * 4) + 1;
        }
        update() {
            this.x += this.vx; this.y += this.vy; this.angle += this.spin;
            if (this.x < -60) this.x = canvas.width  + 60;
            if (this.x > canvas.width  + 60) this.x = -60;
            if (this.y < -60) this.y = canvas.height + 60;
            if (this.y > canvas.height + 60) this.y = -60;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.strokeStyle = this.color;
            ctx.fillStyle   = this.color + '2a';
            ctx.lineWidth   = 1.5;

            if (this.type === 0) {
                // Coccus
                ctx.beginPath(); ctx.arc(0,0,this.r,0,Math.PI*2); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.arc(0,0,this.r*.5,0,Math.PI*2); ctx.strokeStyle=this.color+'55'; ctx.stroke();
            } else if (this.type === 1) {
                // Bacillus with flagella
                const len = this.r * 2.6;
                ctx.beginPath();
                ctx.roundRect(-len/2, -this.r/2, len, this.r, this.r/2);
                ctx.fill(); ctx.stroke();
                ctx.lineWidth=1; ctx.strokeStyle=this.color+'77';
                for (let f=0; f<this.flags; f++) {
                    const fy = (f - this.flags/2) * (this.r/1.5);
                    ctx.beginPath();
                    ctx.moveTo(len/2, fy);
                    ctx.bezierCurveTo(len/2+this.r*2,fy-this.r*1.2, len/2+this.r*3,fy+this.r, len/2+this.r*4,fy);
                    ctx.stroke();
                }
            } else if (this.type === 2) {
                // Spirochete
                ctx.beginPath();
                for (let t=0; t<=Math.PI*4; t+=.15) {
                    const sx = (t - Math.PI*2) * (this.r/2.5);
                    const sy = Math.sin(t) * (this.r * .6);
                    t===0 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
                }
                ctx.lineWidth=2; ctx.stroke();
            } else {
                // Virus (spiky)
                ctx.beginPath();
                for (let i=0; i<8; i++) {
                    const a  = (i/8)*Math.PI*2;
                    const ra = i%2===0 ? this.r : this.r*.5;
                    i===0 ? ctx.moveTo(Math.cos(a)*ra, Math.sin(a)*ra)
                          : ctx.lineTo(Math.cos(a)*ra, Math.sin(a)*ra);
                }
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.lineWidth=1; ctx.strokeStyle=this.color+'88';
                for (let i=0; i<6; i++) {
                    const a=( i/6)*Math.PI*2;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(a)*this.r, Math.sin(a)*this.r);
                    ctx.lineTo(Math.cos(a)*(this.r+9), Math.sin(a)*(this.r+9));
                    ctx.stroke();
                }
            }
            ctx.restore();
        }
    }

    function drawConnections(pts) {
        for (let i=0; i<pts.length; i++) for (let j=i+1; j<pts.length; j++) {
            const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
            const d=Math.sqrt(dx*dx+dy*dy);
            if (d<200) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
                ctx.strokeStyle=`rgba(99,102,241,${(1-d/200)*.1})`;
                ctx.lineWidth=.5; ctx.stroke();
            }
        }
    }

    const pool = Array.from({length:38}, () => new Organism());

    (function loop() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawConnections(pool);
        pool.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    })();
})();

// ===================================
// INJECT EXTRA KEYFRAMES
// ===================================
const st = document.createElement('style');
st.textContent = `
    @keyframes sparkFly {
        0%   { transform:translate(-50%,-50%) scale(1); opacity:1; }
        100% { transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0); opacity:0; }
    }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
`;
document.head.appendChild(st);
