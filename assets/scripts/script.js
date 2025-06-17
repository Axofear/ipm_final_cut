document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Testimonial Slider
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    const slideCount = slides.length;

    // Function to update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Auto slide functionality
    function autoSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }

    // Set up auto slide interval
    let slideInterval = setInterval(autoSlide, 5000);

    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            // Reset auto slide timer
            clearInterval(slideInterval);
            slideInterval = setInterval(autoSlide, 5000);
        });
    });

    // Form submission handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                business: document.getElementById('business').value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);

            // Show success message
            alert('Thank you for your submission! We will contact you soon.');
            form.reset();
        });
    }

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});