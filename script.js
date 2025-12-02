// DOM Elements
const header = document.querySelector('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const whatsappFloat = document.getElementById('whatsappFloat');
const whatsappPopup = document.getElementById('whatsappPopup');
const closePopup = document.getElementById('closePopup');
const fadeElements = document.querySelectorAll('.fade-in');
const contactForm = document.getElementById('contactForm');

// Function to set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Sticky Header on Scroll 
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Trigger fade-in animations on scroll
    triggerFadeIn();
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// WhatsApp Popup
if (whatsappFloat) {
    whatsappFloat.addEventListener('click', () => {
        whatsappPopup.classList.toggle('show');
    });
}

if (closePopup) {
    closePopup.addEventListener('click', () => {
        whatsappPopup.classList.remove('show');
    });
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (whatsappFloat && whatsappPopup && !whatsappFloat.contains(e.target) && !whatsappPopup.contains(e.target)) {
        whatsappPopup.classList.remove('show');
    }
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. We will contact you at ${email} within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Fade-in animation on scroll
function triggerFadeIn() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
}

// Form input focus effects
function initFormFocusEffects() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize animations
    triggerFadeIn();
    
    // Initialize FAQ accordion if on contact page
    initFAQAccordion();
    
    // Initialize form focus effects
    initFormFocusEffects();
    
    // Add parallax effect to elements with parallax class
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const elementOffset = element.offsetTop;
                const elementHeight = element.offsetHeight;
                
                // Only apply parallax if element is in viewport
                if (scrolled > elementOffset - window.innerHeight && scrolled < elementOffset + elementHeight) {
                    const speed = 0.5;
                    const yPos = -(scrolled - elementOffset) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
