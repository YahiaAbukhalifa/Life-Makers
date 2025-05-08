// Donation Slider for Mobile View
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const donationCardsContainer = document.querySelector('.donation-cards-container');
    let donationCards = document.querySelectorAll('.donation-card');
    const sliderDots = document.querySelector('.donation-slider-dots');
    const prevButton = document.querySelector('.donation-slider-prev');
    const nextButton = document.querySelector('.donation-slider-next');
    
    // Variables
    let currentIndex = 0;
    let isMobile = window.innerWidth <= 768;
    
    // Initialize slider
    function initSlider() {
        // Create dots for each card
        if (sliderDots) {
            sliderDots.innerHTML = '';
            donationCards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('donation-slider-dot');
                if (index === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                sliderDots.appendChild(dot);
            });
        }
        
        // Add event listeners to buttons
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        
        // Set initial state
        updateSlider();
        
        // Add responsive behavior
        window.addEventListener('resize', handleResize);
    }
    
    // Update slider based on current index
    function updateSlider() {
        if (!isMobile) return;
        
        // Update cards position
        donationCards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            card.style.transition = 'transform 0.3s ease';
            card.style.opacity = index === currentIndex ? '1' : '0.5';
        });
        
        // Update dots
        const dots = document.querySelectorAll('.donation-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = donationCards.length - 1;
        }
        updateSlider();
    }
    
    // Go to next slide
    function nextSlide() {
        if (currentIndex < donationCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Handle window resize
    function handleResize() {
        isMobile = window.innerWidth <= 768;
        
        // Reset styles if not mobile
        if (!isMobile) {
            donationCards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '1';
            });
        } else {
            updateSlider();
        }
    }

    // Function to reinitialize slider after content changes
    function reinitializeSlider() {
        currentIndex = 0;
        donationCards = document.querySelectorAll('.donation-card');
        initSlider();
    }

    // Initialize if elements exist
    if (donationCardsContainer && donationCards.length > 0) {
        initSlider();
    }

    // Listen for filter changes
    document.addEventListener('filterApplied', function() {
        if (isMobile) {
            reinitializeSlider();
        }
    });
});