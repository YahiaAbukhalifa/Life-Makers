document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const campaignCards = document.querySelectorAll('.campaign-card');

    // Initial display is handled by api-settings.js
    // This is a fallback in case the API fails
    if (!window.siteSettings || !window.siteSettings.active_campaign) {
        const activeCampaign = document.querySelector('.filter-btn.active')?.dataset.category;
        if (activeCampaign) {
            campaignCards.forEach(card => {
                if (card.dataset.category === activeCampaign) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
    
    // Add click handlers for manual filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter campaigns
            campaignCards.forEach(card => {
                if (category === card.dataset.category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update the active campaign in the settings object
            if (window.siteSettings) {
                window.siteSettings.active_campaign = category;
            }
        });
    });
})