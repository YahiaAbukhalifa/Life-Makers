// JavaScript for nested navigation menu and smooth scrolling

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation elements
    const aboutLink = document.querySelector('.mainLinks a[href="./about.html"]');
    const volunteerLink = document.querySelector('.mainLinks a[href="./volunteer.html"]');
    
    // Create nested menu structure for About page
    if (aboutLink) {
        // Create container for nested items
        const aboutNestedMenu = document.createElement('div');
        aboutNestedMenu.className = 'nested-menu';
        
        // Add nested menu items for About page
        aboutNestedMenu.innerHTML = `
            <a href="./about.html#about-us">من نحن</a>
            <a href="./about.html#leader-board">مجلس الادارة</a>
            <a href="./about.html#sponsers">شركاء النجاح</a>
            <a href="./about.html#achievments">مسيرة النجاح</a>
        `;
        
        // Append nested menu to about link
        aboutLink.appendChild(aboutNestedMenu);
        
        // Add hover event for desktop
        aboutLink.addEventListener('mouseenter', function() {
            aboutNestedMenu.classList.add('active');
        });
        aboutLink.addEventListener('mouseleave', function() {
            aboutNestedMenu.classList.remove('active');
        });
        // Add click event for mobile
        aboutLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                aboutNestedMenu.classList.toggle('active');
            }
        });
    }
    
    // Create nested menu structure for Volunteer page
    if (volunteerLink) {
        // Create container for nested items
        const volunteerNestedMenu = document.createElement('div');
        volunteerNestedMenu.className = 'nested-menu';
        
        // Add nested menu items for Volunteer page
        volunteerNestedMenu.innerHTML = `
            <a href="./volunteer.html#volunteer-now">انضم للتطوع</a>
            <a href="./volunteer.html#volunteering-benefits">فوائد التطوع</a>
            <a href="./volunteer.html#success-stories">قصص النجاح</a>
            <a href="./volunteer.html#volunteering-teams">فرق التطوع</a>
        `;
        
        // Append nested menu to volunteer link
        volunteerLink.appendChild(volunteerNestedMenu);
        
        // Add hover event for desktop
        volunteerLink.addEventListener('mouseenter', function() {
            volunteerNestedMenu.classList.add('active');
        });
        volunteerLink.addEventListener('mouseleave', function() {
            volunteerNestedMenu.classList.remove('active');
        });
        // Add click event for mobile
        volunteerLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                volunteerNestedMenu.classList.toggle('active');
            }
        });
    }
    
    // Smooth scrolling functionality with delay after page load
    function setupSmoothScrolling() {
        // Get all links with hash
        const links = document.querySelectorAll('a[href*="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only apply smooth scrolling for links to sections on the current page
                const href = this.getAttribute('href');
                const isCurrentPageLink = href.includes(window.location.pathname) || href.startsWith('#');
                
                if (isCurrentPageLink) {
                    // Extract the hash part
                    const hashPart = href.includes('#') ? href.substring(href.indexOf('#')) : '';
                    
                    if (hashPart && document.querySelector(hashPart)) {
                        e.preventDefault();
                        
                        // Close mobile menu if open
                        const mainLinks = document.querySelector('.mainLinks');
                        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                        
                        if (mainLinks && mainLinks.classList.contains('active')) {
                            mainLinks.classList.remove('active');
                            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                            
                            const icon = mobileMenuToggle.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-xmark');
                                icon.classList.add('fa-bars');
                            }
                            
                            // Restore elements visibility
                            const helpFamilly = document.querySelector('.help-familly');
                            if (helpFamilly) helpFamilly.style.display = '';
                            
                            const logo = document.getElementById('logo');
                            if (logo) logo.style.display = '';
                            
                            const logo2 = document.getElementById('logo2');
                            if (logo2) logo2.style.display = '';
                            
                            document.body.style.overflow = '';
                            
                            // Dispatch event for mobile menu state change
                            document.dispatchEvent(new CustomEvent('mobileMenuStateChange', { 
                                detail: { isOpen: false } 
                            }));
                        }
                        
                        // Smooth scroll to the section
                        const targetElement = document.querySelector(hashPart);
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Set up smooth scrolling after page load with delay
    if (document.readyState === 'complete') {
        setTimeout(setupSmoothScrolling, 1500); // 1.5s delay
    } else {
        window.addEventListener('load', function() {
            setTimeout(setupSmoothScrolling, 1500); // 1.5s delay
        });
    }
    
    // Handle nested menu items in mobile view
    document.querySelectorAll('.nested-menu a').forEach(nestedLink => {
        nestedLink.addEventListener('click', function() {
            // Close mobile menu when clicking on a nested item
            const mainLinks = document.querySelector('.mainLinks');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
            
            if (window.innerWidth <= 768 && mainLinks && mainLinks.classList.contains('active')) {
                mainLinks.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
                
                // Restore elements visibility
                const helpFamilly = document.querySelector('.help-familly');
                if (helpFamilly) helpFamilly.style.display = '';
                
                const logo = document.getElementById('logo');
                if (logo) logo.style.display = '';
                
                const logo2 = document.getElementById('logo2');
                if (logo2) logo2.style.display = '';
                
                document.body.style.overflow = '';
            }
        });
    });}
);