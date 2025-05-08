document.addEventListener('DOMContentLoaded', function() {
    // Animate sponsors logos with staggered delay
    const sponsorLogos = document.querySelectorAll('.sponsersLogo img');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        sponsorLogos.forEach((logo, index) => {
            if (isInViewport(logo) && !logo.classList.contains('sponsor-visible')) {
                // Add staggered delay based on index
                setTimeout(() => {
                    logo.classList.add('sponsor-visible');
                }, 150 * index);
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Enhance campaign cards
    const campaignCards = document.querySelectorAll('.campaign-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Show default category (ramadan)
    showCategory('ramadan');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Show selected category
            showCategory(category);
        });
    });
    
    // Function to show campaign cards by category
    function showCategory(category) {
        campaignCards.forEach(card => {
            // Hide all cards first
            card.classList.remove('visible');
            
            // If card matches category, show it with a slight delay for animation
            if (card.getAttribute('data-category') === category) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 50);
            }
        });
    }
});