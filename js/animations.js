// Animations JavaScript for Life Makers Damitte website
// This script handles animations that trigger on every scroll (not just once)

document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that need animations
    const sections = document.querySelectorAll('section');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Get all animatable elements in this section
            const title = entry.target.querySelector('h2');
            const content = entry.target.querySelectorAll('.about-text, .mission, .vision, .message, .timeline-item .content, .campaign-card, .stat, .sponsersLogo a, .donation-card');
            
            // If section is entering viewport
            if (entry.isIntersecting) {
                // Animate the title
                if (title) title.classList.add('animate');
                
                // Animate all content elements with a slight delay between them
                if (content) {
                    content.forEach((element, index) => {
                        // Add a small delay based on the index
                        setTimeout(() => {
                            element.classList.add('animate');
                        }, index * 100);
                    });
                }
            } else {
                // When section leaves viewport, remove animation classes
                // This ensures animations will play again when scrolling back
                if (title) title.classList.remove('animate');
                
                if (content) {
                    content.forEach(element => {
                        element.classList.remove('animate');
                    });
                }
            }
        });
    }, {
        // Trigger when element is 10% visible
        threshold: 0.1,
        // Start observing slightly before element enters viewport
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Special handling for timeline items to ensure they animate properly
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const content = entry.target.querySelector('.content');
                
                if (entry.isIntersecting) {
                    if (content) content.classList.add('animate');
                } else {
                    if (content) content.classList.remove('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Initial check for elements already in viewport on page load
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const title = section.querySelector('h2');
                const content = section.querySelectorAll('.about-text, .mission, .vision, .message, .timeline-item .content, .campaign-card, .stat, .sponsersLogo a');
                
                if (title) title.classList.add('animate');
                
                if (content) {
                    content.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, 300);
});