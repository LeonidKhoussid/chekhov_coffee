// ==========================================================================
// Mobile Navigation Toggle
// ==========================================================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================================================
// Smooth Scroll & Active Navigation
// ==========================================================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// Reviews Slider
// ==========================================================================

const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.querySelector('.review-prev');
const nextBtn = document.querySelector('.review-next');
let currentReview = 0;

function showReview(index) {
    reviewCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

function nextReview() {
    currentReview = (currentReview + 1) % reviewCards.length;
    showReview(currentReview);
}

function prevReview() {
    currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
    showReview(currentReview);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextReview);
    prevBtn.addEventListener('click', prevReview);

    // Auto-advance reviews every 5 seconds
    setInterval(nextReview, 5000);
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.feature-card, .menu-item, .gallery-item, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==========================================================================
// Contact Form Handling
// ==========================================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        const privacy = formData.get('privacy');

        // Validate
        if (!name || !phone || !privacy) {
            alert('Пожалуйста, заполните все обязательные поля и согласитесь на обработку персональных данных.');
            return;
        }

        // In a production environment, this would send data to a server
        // For now, we'll just show a success message
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
}

// ==========================================================================
// Navbar Background on Scroll
// ==========================================================================

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 20, 25, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 20, 25, 0.95)';
    }
});

// ==========================================================================
// Parallax Effect for Hero
// ==========================================================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = `${parallax}px`;
    }
});

// ==========================================================================
// Image Lazy Loading Enhancement
// ==========================================================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================================================
// Smooth Scroll Polyfill for Safari
// ==========================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just '#'
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
