// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.toggle('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('active');
    }
});

// Back to Top Button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Portfolio Filter
const filterItems = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterItems.length > 0 && portfolioItems.length > 0) {
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active class
            filterItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Filter items
            const filter = item.textContent;
            
            if (filter === 'Wszystkie') {
                portfolioItems.forEach(p => {
                    p.style.display = 'block';
                });
            } else {
                portfolioItems.forEach(p => {
                    const category = p.querySelector('.portfolio-category').textContent;
                    if (category === filter) {
                        p.style.display = 'block';
                    } else {
                        p.style.display = 'none';
                    }
                });
            }
        });
    });
}



// Testimonial Slider
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateTestimonial();
        });
    });
    
    // Update testimonial
    function updateTestimonial() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Here you would update the testimonial content if you have multiple testimonials
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        updateTestimonial();
    }, 5000);
}

// Galeria na stronie realizacji
const portfolioGalleryItems = document.querySelectorAll('.portfolio-gallery-item');

if (portfolioGalleryItems.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    portfolioGalleryItems.forEach(item => {
        item.addEventListener('click', e => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = e.currentTarget.querySelector('img').src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });
}

// Initialize Swiper for the portfolio slider   