document.addEventListener('DOMContentLoaded', function () {
    // Define the campaigns with correct IDs matching the HTML
    const campaigns = [
        { id: 'ramadan', imageCount: 7, prefix: 'campaigns-ramadan-' },
        { id: 'winter', imageCount: 6, prefix: 'campaigns-winter-' },
        { id: 'adha', imageCount: 4, prefix: 'campaigns-adahy-' }, // Fixed from 'adahy' to 'adha' to match HTML
        { id: '9astr', imageCount: 11, prefix: 'campaigns-9astr-' }
    ];

    campaigns.forEach(campaign => {
        let currentIndex = 0;
        let images = [];
        let isTransitioning = false;

        // Get DOM elements - improved selector logic
        const sliderTrack = document.getElementById(`${campaign.id}-slider-track`);
        const dotsContainer = document.getElementById(`${campaign.id}-slider-dots`);

        // If elements don't exist, skip this campaign
        if (!sliderTrack || !dotsContainer) {
            console.warn(`Slider elements for ${campaign.id} not found`);
            return;
        }

        const sliderContainer = sliderTrack.closest('.slider-container');
        const prevBtn = sliderContainer.querySelector('.slider-arrow.prev');
        const nextBtn = sliderContainer.querySelector('.slider-arrow.next');

        // Preload images with better error handling
        function preloadImages() {
            const loadPromises = [];

            for (let i = 1; i <= campaign.imageCount; i++) {
                const imgPath = `./images/${campaign.prefix}${i}.jpeg`;

                const promise = new Promise((resolve) => {
                    const img = new Image();

                    img.onload = () => {
                        images.push(imgPath);
                        resolve();
                    };

                    img.onerror = () => {
                        console.warn(`Failed to load image: ${imgPath}`);
                        resolve();
                    };

                    img.src = imgPath;
                });

                loadPromises.push(promise);
            }

            Promise.all(loadPromises).then(() => {
                if (images.length > 0) {
                    updateDots();
                    updateSlider();
                } else {
                    console.warn(`No images loaded for ${campaign.id} campaign`);
                }
            });
        }

        // Create dots for navigation
        function updateDots() {
            dotsContainer.innerHTML = '';

            images.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = `slider-dot${i === currentIndex ? ' active' : ''}`;
                dot.setAttribute('aria-label', `انتقل إلى الصورة رقم ${i + 1}`);

                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }

        // Update the slider with the current image
        function updateSlider() {
            if (isTransitioning || !images.length) return;

            sliderTrack.innerHTML = '';
            const img = document.createElement('img');
            img.src = images[currentIndex];
            img.alt = `Campaign image ${currentIndex + 1}`;
            img.className = 'slider-image fade-in';

            img.addEventListener('animationend', () => img.classList.remove('fade-in'));
            sliderTrack.appendChild(img);

            // Update dot states
            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // Go to a specific slide
        function goToSlide(index) {
            if (isTransitioning || index === currentIndex || images.length === 0) return;
            isTransitioning = true;

            const currentImg = sliderTrack.querySelector('.slider-image');
            if (currentImg) {
                currentImg.classList.add('fade-out');

                currentImg.addEventListener('animationend', function handler() {
                    currentImg.removeEventListener('animationend', handler);
                    currentIndex = index;
                    isTransitioning = false;
                    updateSlider();
                });
            } else {
                currentIndex = index;
                isTransitioning = false;
                updateSlider();
            }
        }

        // Handle slider navigation
        function handleSwipe(direction) {
            if (images.length <= 1) return;

            const newIndex = direction === 'next'
                ? (currentIndex + 1) % images.length
                : (currentIndex - 1 + images.length) % images.length;

            goToSlide(newIndex);
        }

        // Touch events
        let startX = null;
        let startY = null;

        // Add touch event listeners if sliderTrack exists
        if (sliderTrack) {
            sliderTrack.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: false });

            sliderTrack.addEventListener('touchmove', (e) => {
                if (!startX || !startY) return;

                const xDiff = startX - e.touches[0].clientX;
                const yDiff = startY - e.touches[0].clientY;

                // Prevent vertical scrolling when swiping horizontally
                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    e.preventDefault();
                }
            }, { passive: false });

            sliderTrack.addEventListener('touchend', (e) => {
                if (!startX || !startY) return;

                const xDiff = startX - e.changedTouches[0].clientX;

                if (Math.abs(xDiff) > 50) {
                    handleSwipe(xDiff > 0 ? 'next' : 'prev');
                }

                startX = null;
                startY = null;
            });
        }

        // Button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => handleSwipe('prev'));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => handleSwipe('next'));
        }

        // Start automatic slideshow (optional)
        let slideshowInterval;

        function startSlideshow() {
            stopSlideshow(); // Prevent multiple intervals
            slideshowInterval = setInterval(() => {
                if (!document.hidden && images.length > 1) {
                    handleSwipe('next');
                }
            }, 5000); // Change slide every 5 seconds
        }

        function stopSlideshow() {
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
            }
        }

        // Start slideshow and handle visibility changes
        startSlideshow();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideshow();
            } else {
                startSlideshow();
            }
        });

        // Stop slideshow when user interacts with slider
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideshow);
            sliderContainer.addEventListener('mouseleave', startSlideshow);
            sliderContainer.addEventListener('touchstart', stopSlideshow, { passive: true });
            sliderContainer.addEventListener('touchend', startSlideshow);
        }

        // Initialize
        preloadImages();
    });

    // Filter functionality for campaign categories
    const filterBtns = document.querySelectorAll('.filter-btn');
    const campaignCards = document.querySelectorAll('.campaign-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            // Show/hide campaign cards based on category
            campaignCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initially trigger the active filter
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
        activeFilter.click();
    }
});