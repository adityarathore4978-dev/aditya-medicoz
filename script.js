// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex' || navLinks.style.display === '';
    if (window.matchMedia('(max-width: 960px)').matches) {
      navLinks.style.display = open ? 'none' : 'flex';
      menuBtn.setAttribute('aria-expanded', (!open).toString());
    }
  });
}

// Toast helper
const toastEl = document.getElementById('toast');
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// Appointment form
const apptForm = document.getElementById('appointmentForm');
if (apptForm) {
  apptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(apptForm).entries());
    if (!data.name || !data.email || !data.dept || !data.date) {
      toast('Please fill all required fields');
      return;
    }
    toast('✅ Appointment booked successfully!');
    apptForm.reset();
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toast('📩 Your message has been sent!');
    contactForm.reset();
  });
}

// Doctor consult modal
const modal = document.getElementById('consultModal');
const docName = document.getElementById('docName');
document.querySelectorAll('.btn.sm[data-doctor]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (docName) docName.textContent = 'Doctor: ' + btn.dataset.doctor;
    modal?.showModal();
  });
});
modal?.addEventListener('close', () => {
  if (modal.returnValue === 'ok') toast('🔔 Consultation started');
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
