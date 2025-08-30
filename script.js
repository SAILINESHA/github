// Mobile nav toggle
const burger = document.querySelector('.hamburger');
const links = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    const show = links.classList.toggle('show');
    burger.setAttribute('aria-expanded', show ? 'true' : 'false');
  });
}

// 3D tilt effect on hero image
const tiltCard = document.getElementById('tilt-card');
if (tiltCard) {
  const damp = 20; // lower = stronger tilt
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * damp;
    const rotX = -((y - cy) / cy) * damp;
    tiltCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    tiltCard.style.setProperty('--mx', `${(x/rect.width)*100}%`);
    tiltCard.style.setProperty('--my', `${(y/rect.height)*100}%`);
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

// Simple add-to-cart toasts
const addButtons = document.querySelectorAll('.add-cart');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.dataset.item || 'Item';
    toast(`${item} added to cart 🛒`);
  });
});

function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = 'toast';
  Object.assign(t.style, {
    position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg,#ee0979,#ff6a00,#7c3aed)',
    color: 'white', padding: '10px 16px', borderRadius: '14px',
    boxShadow: '0 10px 20px rgba(0,0,0,.35)', zIndex: 9999, fontWeight: 700
  });
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity = '0', 1200);
  setTimeout(()=> t.remove(), 1700);
}

// Gallery carousel
const track = document.querySelector('.car-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;
function updateCarousel() {
  if (!track) return;
  const width = track.children[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * width}px)`;
}
if (next && prev) {
  next.addEventListener('click', () => { index = (index + 1) % track.children.length; updateCarousel(); });
  prev.addEventListener('click', () => { index = (index - 1 + track.children.length) % track.children.length; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);
}

// Contact form (fake submit)
const form = document.getElementById('bookForm');
const formMsg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    form.reset();
    formMsg.textContent = `Thanks ${data.name || 'friend'}! We’ll confirm your reservation soon.`;
    setTimeout(()=> formMsg.textContent = '', 4000);
  });
}

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
