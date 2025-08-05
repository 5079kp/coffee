// ============================================
// WIMP COFFEE WEBSITE JAVASCRIPT
// ============================================

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initHamburgerMenu();
    initFAQToggle();
    initPopupModal();
    initScrollEffects();
    initSmoothScroll();
    initLetterAnimation();
}

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navbar) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.navbar ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navbar.contains(e.target)) {
                navbar.classList.remove('active');
            }
        });
    }
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('active');
    }
}

// ============================================
// FAQ TOGGLE FUNCTIONALITY
// ============================================
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// POPUP MODAL FUNCTIONALITY
// ============================================
function initPopupModal() {
    const modal = document.getElementById('popup-modal');
    const popupTriggers = document.querySelectorAll('.popup-trigger');
    const closeBtn = document.querySelector('.close');
    const popupImage = document.getElementById('popup-image');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    
    // Coffee data
    const coffeeData = {
        'krubiks1.webp': {
            title: 'Swiss Water Decaf Blend',
            description: 'A rich, full-bodied blend with notes of chocolate and caramel. Perfect for those who want the coffee experience without the caffeine.',
            price: '$24.99'
        },
        'krubiks2.webp': {
            title: 'Colombian Decaf Single Origin',
            description: 'Smooth and balanced with bright acidity and fruity undertones. Sourced from the mountains of Colombia.',
            price: '$27.99'
        },
        'krubiks3.webp': {
            title: 'Ethiopian Decaf Light Roast',
            description: 'Floral and complex with wine-like characteristics. A unique decaf experience from Ethiopian highlands.',
            price: '$29.99'
        }
    };
    
    // Open modal
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const imgSrc = e.target.getAttribute('src');
            const fileName = imgSrc.split('/').pop();
            const coffeeInfo = coffeeData[fileName] || {
                title: 'Premium Decaf Coffee',
                description: 'Discover the perfect balance of flavor and quality in our premium decaf selection.',
                price: '$25.99'
            };
            
            popupImage.src = imgSrc;
            popupTitle.textContent = coffeeInfo.title;
            popupDescription.textContent = coffeeInfo.description;
            document.querySelector('.popup-price').textContent = coffeeInfo.price;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const home = document.querySelector('.home');
        if (home) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            home.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.coffee-card, .blog-post, .reason, .faq-item');
    animateElements.forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// LETTER ANIMATION FOR HERO TEXT
// ============================================
function initLetterAnimation() {
    const letters = document.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
        letter.addEventListener('mouseenter', () => {
            letter.style.transform = 'scale(1.2) rotate(5deg)';
            letter.style.transition = 'transform 0.3s ease';
        });
        
        letter.addEventListener('mouseleave', () => {
            letter.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Animate on page load
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ============================================
// CART FUNCTIONALITY (BASIC)
// ============================================
function addToCart(productName, price) {
    // Basic cart functionality - can be expanded
    console.log(`Added to cart: ${productName} - ${price}`);
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Update cart count (if you have a cart counter)
    updateCartCount();
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #8B4513;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateCartCount() {
    // Update cart counter if exists
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        let count = parseInt(cartCounter.textContent) || 0;
        cartCounter.textContent = count + 1;
    }
}

// ============================================
// FORM HANDLING (IF NEEDED)
// ============================================
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                showNotification('Form submitted successfully!');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.');
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ============================================
// EVENT LISTENERS FOR BUTTONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.closest('.modal-content').querySelector('#popup-title').textContent;
            const price = e.target.closest('.modal-content').querySelector('.popup-price').textContent;
            addToCart(productName, price);
        });
    });
    
    // Shop button
    const shopButton = document.getElementById('shopButton');
    if (shopButton) {
        shopButton.addEventListener('click', () => {
            const shopSection = document.getElementById('Shop Coffee');
            if (shopSection) {
                shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images (if needed)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// initLazyLoading();