// VeriTransGH 2026 - Interactive Features
// ===========================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-out'
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ========== MOBILE MENU TOGGLE ==========
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== UPDATE ACTIVE NAV LINK ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== QUICK BOOKING FORM ==========
const quickBookForm = document.getElementById('quickBookForm');

if (quickBookForm) {
    quickBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(quickBookForm);
        const from = quickBookForm.querySelector('select:nth-of-type(1)').value;
        const to = quickBookForm.querySelector('select:nth-of-type(2)').value;
        const date = quickBookForm.querySelector('input[type="date"]').value;

        if (!from || !to || !date) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (from === to) {
            showNotification('Departure and destination cannot be the same', 'error');
            return;
        }

        // Show success message
        showNotification('Searching for available rides...', 'success');

        // Simulate search (replace with actual API call)
        setTimeout(() => {
            showNotification(`Found 8 available rides from ${from} to ${to}`, 'success');
            // In production, redirect to booking page
            // window.location.href = `booking.html?from=${from}&to=${to}&date=${date}`;
        }, 1500);
    });
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show success message
        showNotification('Sending your message...', 'info');

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification('Message sent successfully! We will get back to you within 24 hours.', 'success');
            contactForm.reset();
        }, 1500);
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }

        .notification-success { border-left: 4px solid #10b981; }
        .notification-error { border-left: 4px solid #ef4444; }
        .notification-info { border-left: 4px solid #0ea5e9; }

        .notification-success i { color: #10b981; }
        .notification-error i { color: #ef4444; }
        .notification-info i { color: #0ea5e9; }

        .notification-close {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 0.25rem;
            transition: color 0.2s;
        }

        .notification-close:hover { color: #475569; }

        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;

    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ========== EMAIL VALIDATION ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== ANIMATED COUNTERS ==========
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Trigger counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const targetValue = parseInt(entry.target.getAttribute('data-target')) || 0;
            animateCounter(entry.target, 0, targetValue, 2000);
        }
    });
}, observerOptions);

// Apply to trust section numbers
document.querySelectorAll('.trust-number').forEach((counter, index) => {
    const values = [50000, 15, 98, 24];
    counter.setAttribute('data-target', values[index] || 0);
    counter.textContent = '0';
    counterObserver.observe(counter);
});

// ========== LIVE STATS SIMULATION ==========
function updateLiveStats() {
    const activeBuses = document.querySelector('.live-stats .stat-item:nth-child(1) strong');
    const availableSeats = document.querySelector('.live-stats .stat-item:nth-child(2) strong');
    const co2Saved = document.querySelector('.live-stats .stat-item:nth-child(3) strong');

    if (activeBuses && availableSeats && co2Saved) {
        // Simulate random updates
        setInterval(() => {
            const buses = Math.floor(Math.random() * 10) + 20;
            const seats = Math.floor(Math.random() * 100) + 120;
            const co2 = (Math.random() * 0.5 + 2.2).toFixed(1);

            activeBuses.textContent = buses;
            availableSeats.textContent = seats;
            co2Saved.textContent = co2 + 'T';
        }, 10000); // Update every 10 seconds
    }
}

// Initialize live stats
updateLiveStats();

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== FORM INPUT ENHANCEMENTS ==========
document.querySelectorAll('input, select, textarea').forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Check initial value
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ========== PREVENT DEFAULT FORM SUBMISSION ==========
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.hasAttribute('data-submit-allowed')) {
            e.preventDefault();
        }
    });
});

// ========== DATE INPUT MIN DATE ==========
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
    input.setAttribute('min', today);
    if (!input.value) {
        input.value = today;
    }
});

// ========== KEYBOARD ACCESSIBILITY ==========
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        if (navMenu && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ========== LOADING STATE ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Remove any loading overlays
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 500);
    }
});

// ========== CONSOLE BRANDING ==========
console.log('%cVeriTransGH', 'font-size: 40px; font-weight: bold; color: #10b981;');
console.log('%cPowering Africa\'s Electric Future', 'font-size: 16px; color: #475569;');
console.log('%c🚌 Interested in joining our team? Email: careers@veritransgh.com', 'font-size: 12px; color: #0ea5e9;');

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========== PERFORMANCE MONITORING ==========
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Page load time:', entry.loadEventEnd - entry.fetchStart, 'ms');
                }
            }
        });
        perfObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

console.log('✓ VeriTransGH scripts loaded successfully');
