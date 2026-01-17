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
// Reviews Carousel
// ==========================================================================

const reviewsCarousel = document.querySelector('.reviews-carousel');
const reviewsWrapper = document.querySelector('.reviews-carousel-wrapper');

// Respect user's motion preferences
if (reviewsCarousel && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reviewsCarousel.style.animation = 'none';
}

// Pause animation when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (reviewsCarousel) {
        if (document.hidden) {
            reviewsCarousel.style.animationPlayState = 'paused';
        } else {
            reviewsCarousel.style.animationPlayState = 'running';
        }
    }
});

// Smooth pause/resume on hover (handled by CSS, but adding JS fallback)
if (reviewsWrapper) {
    let hoverTimeout;
    
    reviewsWrapper.addEventListener('mouseenter', () => {
        if (reviewsCarousel) {
            reviewsCarousel.style.animationPlayState = 'paused';
        }
    });

    reviewsWrapper.addEventListener('mouseleave', () => {
        if (reviewsCarousel) {
            // Small delay before resuming for better UX
            hoverTimeout = setTimeout(() => {
                reviewsCarousel.style.animationPlayState = 'running';
            }, 300);
        }
    });
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
const heroOverlay = document.querySelector('.hero-overlay');

let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    if (!hero) return;
    
    const scrolled = window.pageYOffset || window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const parallax = scrolled * 0.3;
        const opacity = Math.min(0.88 + (scrolled / 1000), 0.95);
        
        // Only apply parallax on desktop
        if (window.innerWidth > 768) {
            hero.style.backgroundPositionY = `${parallax}px`;
        } else {
            hero.style.backgroundPositionY = 'center';
        }

        if (heroOverlay) {
            heroOverlay.style.background = `linear-gradient(135deg, rgba(15, 20, 25, ${opacity}), rgba(26, 31, 46, ${opacity - 0.1}))`;
        }
    } else {
        // Reset when scrolled past hero
        if (window.innerWidth > 768) {
            hero.style.backgroundPositionY = `${heroHeight * 0.3}px`;
        }
    }
    
    lastScrollY = scrolled;
    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Initialize on load
if (hero) {
    updateParallax();
}

// Throttled scroll handler
window.addEventListener('scroll', requestParallaxTick, { passive: true });

// Handle resize
window.addEventListener('resize', () => {
    if (hero) {
        updateParallax();
    }
}, { passive: true });

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

// ==========================================================================
// Animated Background Performance Optimization
// ==========================================================================

// Pause animations when page is not visible for better performance
let animationPaused = false;

document.addEventListener('visibilitychange', () => {
    animationPaused = document.hidden;

    const particles = document.querySelectorAll('.particle, .steam');
    const bodyBg = document.querySelector('body::before');

    if (animationPaused) {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
        // Note: CSS pseudo-elements can't be directly controlled via JS
        // The reduced motion media query handles this case
    } else {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Optimize animations based on device performance
const isLowPerformanceDevice = () => {
    // Check for mobile devices or slow connections
    return window.innerWidth < 768 ||
           navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2 ||
           navigator.connection && navigator.connection.effectiveType === 'slow-2g';
};

if (isLowPerformanceDevice()) {
    // Reduce animation complexity on low-performance devices
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.display = 'none';
    });

    // Slow down steam animations
    const steams = document.querySelectorAll('.steam');
    steams.forEach(steam => {
        steam.style.animationDuration = '15s';
    });
}

// Subtle parallax effect for background elements (disabled to avoid conflicts with CSS animations)
// The CSS animations handle the particle movement more efficiently
