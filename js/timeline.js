document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 1000,        // Animation duration in milliseconds
        offset: 100,          // Offset (in px) from the original trigger point
        easing: 'ease-in-out', // Easing for AOS animations
        delay: 100,           // Delay for animations
        once: true,           // Whether animation should happen only once
        mirror: false,        // Whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom' // Defines which position of the element regarding to window should trigger the animation
    });

    const timelineItems = document.querySelectorAll('.timeline-item');

    // Add hover effect for download links
    timelineItems.forEach(item => {
        const downloadLink = item.querySelector('.download-report');
        if (downloadLink) {
            downloadLink.addEventListener('mouseenter', () => {
                const icon = downloadLink.querySelector('i');
                icon.style.transform = 'translateX(-5px)';
            });
            downloadLink.addEventListener('mouseleave', () => {
                const icon = downloadLink.querySelector('i');
                icon.style.transform = 'translateX(0)';
            });
            
            // Add click event for download
            downloadLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Alert the user that the report would be downloaded
                alert('تحميل تقرير صناع الحياة دمياط لعام 2025');
                
                // For demonstration purposes - in a real implementation, 
                // you would replace this with actual download functionality
                // window.location.href = 'path/to/report-2025.pdf';
            });
        }
        
        // Add hover effects to timeline items
        item.addEventListener('mouseenter', function() {
            this.querySelector('.content').style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.content').style.transform = 'translateY(-5px)';
        });
    });
});