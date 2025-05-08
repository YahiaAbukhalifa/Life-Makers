// JavaScript for mobile navigation (mibilenav.js)

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainLinks = document.querySelector('.mainLinks');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    // Get About and Volunteer links for nested navigation
    const aboutLink = document.querySelector('.mainLinks a[href="./about.html"]');
    const volunteerLink = document.querySelector('.mainLinks a[href="./volunteer.html"]');

    // Add click event listeners to logo elements for redirection
    const logo = document.getElementById('logo');
    const logo2 = document.getElementById('logo2');
    
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => window.location.href = './index.html');
    }
    
    if (logo2) {
        logo2.style.cursor = 'pointer';
        logo2.addEventListener('click', () => window.location.href = './index.html');
    }

    if (mobileMenuToggle && mainLinks) {
        // First, reverse the order of the main links directly
        // Only do this for the direct children (main anchors) of mainLinks
        const mainAnchors = Array.from(mainLinks.children);
        mainAnchors.reverse().forEach(anchor => {
            mainLinks.appendChild(anchor);
        });
        
        mobileMenuToggle.addEventListener('click', function() {
            mainLinks.classList.toggle('active');
            this.classList.toggle('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.toggle('active');
            }

            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (icon && icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                // Hide help-familly, logo, logo2, and disable scroll
                const helpFamilly = document.querySelector('.help-familly');
                if (helpFamilly) {
                    helpFamilly.style.display = 'none';
                    // Trigger custom event for mobile menu state change
                    document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { detail: { isOpen: true } }));
                }
                const logo = document.getElementById('logo');
                if (logo) logo.style.display = 'none';
                const logo2 = document.getElementById('logo2');
                if (logo2) logo2.style.display = 'none';
                document.body.style.overflow = 'hidden';
            } else if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                // Show help-familly, logo, logo2, and enable scroll after a short delay
                setTimeout(() => {
                    const helpFamilly = document.querySelector('.help-familly');
                    if (helpFamilly) {
                        helpFamilly.style.display = '';
                        // Trigger custom event for mobile menu state change
                        document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { detail: { isOpen: false } }));
                    }
                    const logo = document.getElementById('logo');
                    if (logo) logo.style.display = '';
                    const logo2 = document.getElementById('logo2');
                    if (logo2) logo2.style.display = '';
                    document.body.style.overflow = '';
                }, 300); // Add a small delay to ensure smooth transition
            }
        });

        // Create nested menu for About section in mobile view
        if (aboutLink) {
            // Create container for nested items if it doesn't exist already
            let aboutNestedMenu = aboutLink.querySelector('.mobile-nested-menu');
            
            if (!aboutNestedMenu) {
                aboutNestedMenu = document.createElement('div');
                aboutNestedMenu.className = 'mobile-nested-menu';
                
                // Add nested menu items for About page
                aboutNestedMenu.innerHTML = `
                    <a href="./about.html#about-us">من نحن</a>
                    <a href="./about.html#leader-board">مجلس الادارة</a>
                    <a href="./about.html#sponsers">شركاء النجاح</a>
                    <a href="./about.html#achievments">مسيرة النجاح</a>
                `;
                
                // Append nested menu to about link
                aboutLink.appendChild(aboutNestedMenu);
                
                // Add click event listeners to the newly created nested menu items
                aboutNestedMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', function(e) {
                        // Don't prevent default here to allow normal navigation
                        // Close mobile menu when clicking on a nested item
                        mainLinks.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        if (mobileMenuOverlay) {
                            mobileMenuOverlay.classList.remove('active');
                        }
                        const icon = mobileMenuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-xmark');
                            icon.classList.add('fa-bars');
                        }
                        // Restore help-familly, logo, logo2, and scrolling
                        const helpFamilly = document.querySelector('.help-familly');
                        if (helpFamilly) {
                            helpFamilly.style.display = '';
                            // Trigger custom event for mobile menu state change
                            document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { detail: { isOpen: false } }));
                        }
                        const logo = document.getElementById('logo');
                        if (logo) logo.style.display = '';
                        const logo2 = document.getElementById('logo2');
                        if (logo2) logo2.style.display = '';
                        document.body.style.overflow = '';
                        
                        // Allow a small delay before the redirect happens
                        // This ensures the menu animation completes
                        e.stopPropagation();
                    });
                });
            }
            
            // Add click event for mobile
            aboutLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    aboutNestedMenu.classList.toggle('active');
                    
                    // Close other nested menus
                    const volunteerNestedMenu = document.querySelector('.mainLinks a[href="./volunteer.html"] .mobile-nested-menu');
                    if (volunteerNestedMenu && volunteerNestedMenu !== aboutNestedMenu) {
                        volunteerNestedMenu.classList.remove('active');
                    }
                }
            });
        }
        
        // Create nested menu for Volunteer section in mobile view
        if (volunteerLink) {
            // Create container for nested items if it doesn't exist already
            let volunteerNestedMenu = volunteerLink.querySelector('.mobile-nested-menu');
            
            if (!volunteerNestedMenu) {
                volunteerNestedMenu = document.createElement('div');
                volunteerNestedMenu.className = 'mobile-nested-menu';
                
                // Add nested menu items for Volunteer page
                volunteerNestedMenu.innerHTML = `
                    <a href="./volunteer.html#volunteer-now">انضم للتطوع</a>
                    <a href="./volunteer.html#volunteering-benefits">فوائد التطوع</a>
                    <a href="./volunteer.html#success-stories">قصص النجاح</a>
                    <a href="./volunteer.html#volunteering-teams">فرق التطوع</a>
                `;
                
                // Append nested menu to volunteer link
                volunteerLink.appendChild(volunteerNestedMenu);
                
                // Add click event listeners to the newly created nested menu items
                volunteerNestedMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', function(e) {
                        // Don't prevent default here to allow normal navigation
                        // Close mobile menu when clicking on a nested item
                        mainLinks.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        if (mobileMenuOverlay) {
                            mobileMenuOverlay.classList.remove('active');
                        }
                        const icon = mobileMenuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-xmark');
                            icon.classList.add('fa-bars');
                        }
                        // Restore help-familly, logo, logo2, and scrolling
                        const helpFamilly = document.querySelector('.help-familly');
                        if (helpFamilly) {
                            helpFamilly.style.display = '';
                            // Trigger custom event for mobile menu state change
                            document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { detail: { isOpen: false } }));
                        }
                        const logo = document.getElementById('logo');
                        if (logo) logo.style.display = '';
                        const logo2 = document.getElementById('logo2');
                        if (logo2) logo2.style.display = '';
                        document.body.style.overflow = '';
                        
                        // Allow a small delay before the redirect happens
                        // This ensures the menu animation completes
                        e.stopPropagation();
                    });
                });
            }
            
            // Add click event for mobile
            volunteerLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    volunteerNestedMenu.classList.toggle('active');
                    
                    // Close other nested menus
                    const aboutNestedMenu = document.querySelector('.mainLinks a[href="./about.html"] .mobile-nested-menu');
                    if (aboutNestedMenu && aboutNestedMenu !== volunteerNestedMenu) {
                        aboutNestedMenu.classList.remove('active');
                    }
                }
            });
        }
        
        // Close mobile menu when a link is clicked (except About and Volunteer main links)
        const navLinks = mainLinks.querySelectorAll('a:not([href="./about.html"]):not([href="./volunteer.html"])');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                  icon.classList.remove('fa-xmark');
                  icon.classList.add('fa-bars');
                }
                // Restore help-familly, logo, logo2, and scrolling
                const helpFamilly = document.querySelector('.help-familly');
                if (helpFamilly) {
                    helpFamilly.style.display = '';
                    // Trigger custom event for mobile menu state change
                    document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { detail: { isOpen: false } }));
                }
                const logo = document.getElementById('logo');
                if (logo) logo.style.display = '';
                const logo2 = document.getElementById('logo2');
                if (logo2) logo2.style.display = '';
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking on the overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function() {
                mainLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                this.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                  icon.classList.remove('fa-xmark');
                  icon.classList.add('fa-bars');
                }
                // Restore help-familly, logo, logo2, and scrolling
                const helpFamilly = document.querySelector('.help-familly');
                if (helpFamilly) {
                    helpFamilly.style.display = '';
                    // Trigger custom event for mobile menu state change
                    document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { detail: { isOpen: false } }));
                }
                const logo = document.getElementById('logo');
                if (logo) logo.style.display = '';
                const logo2 = document.getElementById('logo2');
                if (logo2) logo2.style.display = '';
                document.body.style.overflow = '';
            });
        }
        
        // Add the new links for Activities and Campaigns
        const mainLinksContainer = document.querySelector('.mainLinks');
        if (mainLinksContainer) {
            // Check if the links already exist before adding them
            const activitiesLink = mainLinksContainer.querySelector('a[href="./activites.html"]');
            const campaignsLink = mainLinksContainer.querySelector('a[href="./campaigns.html"]');
            
            if (!activitiesLink) {
                const newActivitiesLink = document.createElement('a');
                newActivitiesLink.href = './activites.html';
                newActivitiesLink.textContent = 'الأنشطة';
                mainLinksContainer.appendChild(newActivitiesLink);
            }
            
            if (!campaignsLink) {
                const newCampaignsLink = document.createElement('a');
                newCampaignsLink.href = './campaigns.html';
                newCampaignsLink.classList.add('active');
                newCampaignsLink.textContent = 'الحملات';
                mainLinksContainer.appendChild(newCampaignsLink);
            }
        }
        
        // Add a click event listener to the document to handle any nested links that might have been missed
        document.addEventListener('click', function(e) {
            // Check if the clicked element is a nested menu link
            if (e.target && e.target.closest('.mobile-nested-menu a')) {
                // Let the link's normal behavior happen (navigation)
                // but make sure the menu closes properly
                setTimeout(() => {
                    mainLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    if (mobileMenuOverlay) {
                        mobileMenuOverlay.classList.remove('active');
                    }
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Restore help-familly, logo, logo2, and scrolling
                    const helpFamilly = document.querySelector('.help-familly');
                    if (helpFamilly) helpFamilly.style.display = '';
                    const logo = document.getElementById('logo');
                    if (logo) logo.style.display = '';
                    const logo2 = document.getElementById('logo2');
                    if (logo2) logo2.style.display = '';
                    document.body.style.overflow = '';
                }, 50);
            }
        });
    }
});