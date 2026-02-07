/* ============================================
   CHEMICAL PROTOTYPING - JAVASCRIPT
   Interactive Features & Animations
   ============================================ */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: false,
        offset: 100,
        easing: 'ease-in-out-cubic'
    });
});

// ============================================
// NAVIGATION - HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle hamburger menu
hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// GALLERY - LIGHTBOX FUNCTIONALITY
// ============================================

let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-image img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');

// Open lightbox
function openLightbox(button) {
    const img = button.closest('.gallery-image').querySelector('img');
    const allImages = Array.from(galleryImages);
    
    currentImageIndex = allImages.indexOf(img);
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
    if (!lightbox.classList.contains('active')) return;
    
    if (event.key === 'ArrowLeft') prevImage();
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'Escape') closeLightbox();
});

// Close lightbox when clicking on background
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});

// ============================================
// VIDEO PLAYER FUNCTIONALITY
// ============================================

const videoModal = document.getElementById('videoModal');

// Open video modal
function playVideo() {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideo() {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close video modal when clicking on background
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) closeVideo();
});

// Keyboard shortcut to close video
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideo();
    }
});

// ============================================
// SMOOTH SCROLL WITH OFFSET
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS FOR SECTIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ============================================
// INGREDIENT CARDS - INTERACTIVE EFFECTS
// ============================================

const ingredientCards = document.querySelectorAll('.ingredient-card');

ingredientCards.forEach(card => {
    // Add hover tilt effect
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;
        
        // Subtle 3D effect (optional - can be enabled)
        // this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    // Ripple effect on click
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(0, 188, 212, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
            left: -140px;
            top: -140px;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// TIMELINE - STEP HIGHLIGHTING
// ============================================

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        // Add visual effect to current step
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ============================================
// FLOW DIAGRAM - ANIMATED ARROWS
// ============================================

const flowArrows = document.querySelectorAll('.flow-arrow');

flowArrows.forEach(arrow => {
    const svg = arrow.querySelector('svg');
    if (svg) {
        const path = svg.querySelector('path');
        if (path) {
            // Create animated dash effect
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.animation = 'dashAnimation 3s ease-in-out infinite';
        }
    }
});

// Add dash animation
const dashStyle = document.createElement('style');
dashStyle.textContent = `
    @keyframes dashAnimation {
        0% { stroke-dashoffset: 100; opacity: 0.3; }
        50% { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0.3; }
    }
`;
document.head.appendChild(dashStyle);

// ============================================
// SCROLL POSITION INDICATOR
// ============================================

const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0066cc, #00bcd4);
        z-index: 999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        indicator.style.width = scrollPercent + '%';
    });
};

createScrollIndicator();

// ============================================
// BACK TO TOP BUTTON
// ============================================

const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0066cc, #00bcd4);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 500;
        box-shadow: 0 5px 20px rgba(0, 102, 204, 0.4);
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) translateY(-5px)';
        button.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 5px 20px rgba(0, 102, 204, 0.4)';
    });
};

createBackToTopButton();

// ============================================
// ACTIVE NAVBAR LINK HIGHLIGHTING
// ============================================

const highlightNavLink = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.style.color = '#2c3e50';
                    link.style.fontWeight = '500';
                });
                
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.color = '#0066cc';
                    activeLink.style.fontWeight = '700';
                }
            }
        });
    });
};

highlightNavLink();

// ============================================
// COUNTER ANIMATION FOR PERCENTAGES
// ============================================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '%';
        }
    }, 16);
};

// Trigger counter animation when card comes into view
const ingredientPercentages = document.querySelectorAll('.ingredient-card .percentage');

ingredientPercentages.forEach(percentage => {
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                const target = parseFloat(entry.target.textContent);
                animateCounter(entry.target, target);
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(percentage);
});

// ============================================
// PARALLAX EFFECT (OPTIONAL)
// ============================================

const applyParallax = () => {
    const hero = document.querySelector('.hero');
    const liquidBg = document.querySelector('.liquid-bg');
    
    if (hero && liquidBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrollY < heroHeight) {
                liquidBg.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    }
};

applyParallax();

// ============================================
// UTILITY FUNCTION - SMOOTH SCROLL TO ELEMENT
// ============================================

function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    // Trigger AOS refresh after all content loads
    AOS.refresh();
    
    // Add loaded class to body for any fade-in effects
    document.body.classList.add('loaded');
});

// ============================================
// PRINT FRIENDLY STYLES
// ============================================

const addPrintStyles = () => {
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            .navbar, .footer, .hamburger, .cta-button {
                display: none;
            }
            
            section {
                page-break-inside: avoid;
            }
            
            body {
                background: white;
            }
        }
    `;
    document.head.appendChild(printStyle);
};

addPrintStyles();

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Tab key navigation
    if (e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-nav');
    }
    
    // Escape key closes modals
    if (e.key === 'Escape') {
        closeLightbox();
        closeVideo();
    }
});

// Remove keyboard-nav class on mouse usage
document.addEventListener('mousedown', () => {
    document.documentElement.classList.remove('keyboard-nav');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
let scrollTimeout;
const throttleScroll = (callback) => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
        callback();
        scrollTimeout = null;
    }, 100);
};

// Lazy load images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Chemical Prototyping Website Loaded Successfully! 🧪');
console.log('Theme: From Chemicals to Cleanliness');
