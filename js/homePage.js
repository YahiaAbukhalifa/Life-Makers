// JavaScript for the homepage

document.addEventListener('DOMContentLoaded', function() {
    // Custom donation amount functionality
    const customAmountInput = document.querySelector('.custom-amount-input');
    
    if (customAmountInput) {
        // Input change
        customAmountInput.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
        });
        
        // Input keyup for real-time validation
        customAmountInput.addEventListener('keyup', function() {
            if (this.value < 0) this.value = 1;
        });
    }
    
    // Animate the number counters
    const numberBoxes = document.querySelectorAll('.number-box');

    // Function to animate the counter
    const animateCounter = (digitElements, target, digits) => {
        const duration = 1500; // Animation duration in ms
        const steps = 100; // Number of animation steps
        const increment = target / steps;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                current = target;
            }

            // Convert current value to string and pad with leading zeros
            const currentStr = Math.floor(current).toString().padStart(digits, '0');

            // Update each digit
            digitElements.forEach((digit, index) => {
                digit.textContent = currentStr[index];
            });

            // Continue animation if not reached target
            if (current < target) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Intersection Observer to trigger animation when section is visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const numberBoxes = entry.target.querySelectorAll('.number-box');
                    numberBoxes.forEach((box) => {
                        if (!box.classList.contains('animated')) {
                            const target = parseInt(box.getAttribute('data-target'));
                            const digits = parseInt(box.getAttribute('data-digits'));
                            const digitElements = box.querySelectorAll('.digit');

                            // Initialize with zeros
                            digitElements.forEach((digit) => {
                                digit.textContent = '0';
                            });

                            // Animate to target number
                            animateCounter(digitElements, target, digits);
                            box.classList.add('animated');
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe the harvest section
    const harvestSection = document.querySelector('.harvest-section');
    if (harvestSection) {
        observer.observe(harvestSection);
    }

    // Help-familly scroll visibility logic
    let helpFamillyShown = false;
    const helpFamilly = document.querySelector('.help-familly');
    const heroSection = document.querySelector('.hero-section');
    const footer = document.querySelector('footer');
    
    if (helpFamilly && heroSection && footer) {
      helpFamilly.style.display = 'none';
      
      // Add a class for slide-out animation
      const addSlideOutClass = () => {
        helpFamilly.classList.remove('slideIn');
        helpFamilly.classList.add('slideOut');
        // After animation completes, hide the element
        setTimeout(() => {
          helpFamilly.style.display = 'none';
        }, 800); // Match the animation duration
      };
      
      // Add a class for slide-in animation
      const addSlideInClass = () => {
        helpFamilly.style.display = 'flex';
        helpFamilly.classList.remove('slideOut');
        helpFamilly.classList.add('slideIn');
      };
      
      function toggleHelpFamilly() {
        const heroRect = heroSection.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if hero section is visible
        const isHeroVisible = (heroRect.top < windowHeight && heroRect.bottom > 0);
        
        // Check if footer is visible
        const isFooterVisible = (footerRect.top < windowHeight && footerRect.bottom > 0);
        
        // If hero or footer is visible, hide help-familly with animation
        if (isHeroVisible || isFooterVisible) {
          if (helpFamilly.style.display !== 'none' && helpFamilly.classList.contains('slideIn')) {
            addSlideOutClass();
          }
        } else {
          // If neither hero nor footer is visible, show help-familly
          if (helpFamilly.style.display === 'none' || !helpFamilly.classList.contains('slideIn')) {
            addSlideInClass();
          }
        }
      }
      
      window.addEventListener('scroll', toggleHelpFamilly);
      toggleHelpFamilly();
    }

    // Campaign filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const campaignCards = document.querySelectorAll('.campaign-card');

    // Find the default active button
    const activeButton = document.querySelector('.filter-btn.active');
    const defaultCategory = activeButton ? activeButton.dataset.category : null;

    // Show only the campaigns matching the default active category
    campaignCards.forEach(card => {
        if (!defaultCategory || card.dataset.category === defaultCategory) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            campaignCards.forEach(card => {
                if (card.dataset.category === category) {
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                }
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const helpFamilyDiv = document.getElementById('helpFamilyDiv');
    const heroSection = document.querySelector('.hero-section');
    const footer = document.querySelector('footer');
    let isVisible = false;
    let mobileMenuOpen = false;

    // Function to check if help-family should be visible
    function checkHelpFamilyVisibility() {
      if (!helpFamilyDiv || !heroSection || !footer) return;
      
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const footerTop = footer.offsetTop;
      const currentScroll = window.scrollY;
      
      // Only show help-family when not in hero section, not in footer, and mobile menu is closed
      if (currentScroll > heroBottom && currentScroll < footerTop && !mobileMenuOpen) {
        if (!isVisible) {
          helpFamilyDiv.classList.add('visible');
          isVisible = true;
        }
      } else {
        if (isVisible) {
          helpFamilyDiv.classList.remove('visible');
          isVisible = false;
        }
      }
    }

    // Check visibility on scroll
    window.addEventListener('scroll', checkHelpFamilyVisibility);
    
    // Listen for mobile menu state changes from mobileNav.js
    document.addEventListener('mobileMenuStateChange', function(event) {
      mobileMenuOpen = event.detail.isOpen;
      checkHelpFamilyVisibility();
    });
    
    // Also update on mobile menu toggle click for redundancy
    document.querySelector('.mobile-menu-toggle')?.addEventListener('click', function() {
      mobileMenuOpen = this.classList.contains('active');
      checkHelpFamilyVisibility();
    });
    
    // Initial check
    checkHelpFamilyVisibility();
  });
  // Scroll-based logo transition
  let lastScrollPosition = 0;
  const scrollThreshold = 100; // Adjust this value to control when the transition happens

  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    const logo = document.getElementById('logo');
    const logo2 = document.getElementById('logo2');
    if (currentScrollPosition > scrollThreshold) {
      if (logo) logo.classList.add('scroll-active');
      if (logo2) logo2.classList.add('scroll-active');
    } else {
      if (logo) logo.classList.remove('scroll-active');
      if (logo2) logo2.classList.remove('scroll-active');
    }
    lastScrollPosition = currentScrollPosition;
  });