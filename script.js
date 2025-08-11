// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Animate numbers on scroll
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateCounter(target, finalNumber);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(number => observer.observe(number));
};

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
};

// Service card click handlers
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('.service-title').textContent;
        console.log(`Clicked on: ${serviceName}`);
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // You can add navigation logic here
        // For example: window.location.href = `/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}`;
    });
    
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', () => {
        // You can add a subtle sound effect here if desired
    });
});

// Scroll reveal animation
const revealElements = () => {
    const elements = document.querySelectorAll('.stat-card, .service-card, .client-logo');
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => observer.observe(element));
};

// Social media link handlers
const socialLinks = document.querySelectorAll('.social-icon, .social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const platform = link.querySelector('i').className;
        console.log(`Opening ${platform} profile`);
        
        // Add your actual social media URLs here
        let url = '#';
        
        if (platform.includes('linkedin')) {
            url = 'https://linkedin.com/in/jamesadams';
        } else if (platform.includes('github')) {
            url = 'https://github.com/jamesadams';
        } else if (platform.includes('instagram')) {
            url = 'https://instagram.com/jamesadams';
        } else if (platform.includes('twitter')) {
            url = 'https://twitter.com/jamesadams';
        } else if (platform.includes('facebook')) {
            url = 'https://facebook.com/jamesadams';
        } else if (platform.includes('pinterest')) {
            url = 'https://pinterest.com/jamesadams';
        } else if (platform.includes('behance')) {
            url = 'https://behance.net/jamesadams';
        }
        
        if (url !== '#') {
            window.open(url, '_blank');
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    revealElements();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Custom cursor effect for service cards (optional enhancement)
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = '#ffd700';
        });
        
        card.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(255, 255, 255, 0.5)';
        });
    });
};

// Performance optimization: debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Portfolio item interactions
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.portfolio-title').textContent;
        console.log(`Clicked on portfolio item: ${title}`);
        // Add navigation logic here
    });
});

// Smooth page transitions
const pageLinks = document.querySelectorAll('a[href$=".html"]');

pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Add fade out effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});