/**
 * Volunteer Form Handler
 * Handles the volunteer form submission when volunteer registration is open
 */

document.addEventListener('DOMContentLoaded', function() {
  // Wait for the API settings to be applied and potentially create the form
  setTimeout(() => {
    const volunteerForm = document.getElementById('volunteer-form');
    
    if (volunteerForm) {
      volunteerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
          name: document.getElementById('volunteer-name').value,
          email: document.getElementById('volunteer-email').value,
          phone: document.getElementById('volunteer-phone').value,
          area: document.getElementById('volunteer-area').value,
          message: document.getElementById('volunteer-message').value
        };
        
        // Here you would typically send this data to your backend
        // For now, we'll just show a success message
        console.log('Volunteer form submitted:', formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <h3>تم تقديم طلبك بنجاح!</h3>
          <p>شكرًا لك على رغبتك في التطوع معنا. سنتواصل معك قريبًا.</p>
        `;
        
        // Replace form with success message
        volunteerForm.parentNode.replaceChild(successMessage, volunteerForm);
        
        // Scroll to the success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, 1000); // Wait 1 second for the API settings to be applied
});