// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 800);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 80);
  backToTop.classList.toggle('show', scrollY > 500);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Hero slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
  slides.forEach(s => s.classList.remove('active'));
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
  setInterval(nextSlide, 5000);
}

// Floor maps tabs
const mapTabs = document.querySelectorAll('.map-tab');
const mapDisplay = document.getElementById('mapDisplay');

mapTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mapTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const mapKey = tab.dataset.map;
    mapDisplay.style.opacity = '0';
    setTimeout(() => {
      mapDisplay.src = mapDisplay.dataset[mapKey];
      mapDisplay.style.opacity = '1';
    }, 300);
  });
});

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img').src;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `<span class="lightbox-close">&times;</span><img src="${img}">`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
      }
    });
  });
});

// Back to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  setTimeout(() => {
    btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
    this.reset();
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }, 3000);
  }, 1500);
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// Lightbox styles
const style = document.createElement('style');
style.textContent = `
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    padding: 20px;
  }
  .lightbox.active { opacity: 1; }
  .lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  .lightbox.active img { transform: scale(1); }
  .lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 3rem;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }
  .lightbox-close:hover { color: var(--accent); }
`;
document.head.appendChild(style);
