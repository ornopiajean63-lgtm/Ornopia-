// Mobile menu
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

// Highlight active nav link while scrolling
const sections = document.querySelectorAll('main section[id]');
const navAnchors = links.querySelectorAll('a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// Contact form validation (front-end only)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('input, textarea').forEach(field => {
    const bad = !field.value.trim() || (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value));
    field.classList.toggle('invalid', bad);
    if (bad) valid = false;
  });
  status.className = 'form-status ' + (valid ? 'ok' : 'error');
  status.textContent = valid
    ? 'Message sent. Thank you, I will get back to you soon.'
    : 'Please fill in every field with a valid email.';
  if (valid) form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();