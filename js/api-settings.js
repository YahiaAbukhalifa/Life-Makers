/**
 * API Settings Integration
 * This file handles fetching settings from the API including logo path, active campaign, and volunteer status
 */

const API_URL = 'http://localhost/life_makers/api/settings.php';
const API_KEY = 'jqk8MrXv2TZpN5DhF6LyJ4bC9RsA7wYeG3xKtPWcH1QgUzEnVdB';

// Main settings object to store API data
let siteSettings = {
  logo_path: null,
  active_campaign: 'ramadan', // Default value
  volunteer_status: 'closed' // Default value
};

/**
 * Fetch settings from the API
 * @returns {Promise} Promise that resolves with the settings data
 */
async function fetchSettings() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'success' && data.data && data.data.length > 0) {
      // Update settings with API data
      data.data.forEach(setting => {
        if (setting.key === 'logo_path') {
          siteSettings.logo_path = setting.value;
        } else if (setting.key === 'active_campaign') {
          siteSettings.active_campaign = setting.value;
        } else if (setting.key === 'volunteer_status') {
          siteSettings.volunteer_status = setting.value;
        }
      });
      console.log('Settings fetched successfully:', data);
      return siteSettings;
    } else {
      console.error('API returned success but no data was found');
      return siteSettings; // Return default settings
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    return siteSettings; // Return default settings on error
  }
}

/**
 * Apply settings to the page elements
 */
async function applySettings() {
  try {
    await fetchSettings();
    
    // Apply logo if available
    if (siteSettings.logo_path) {
      const logoElements = document.querySelectorAll('#logo, #logo2');
      logoElements.forEach(logo => {
        logo.src = siteSettings.logo_path;
      });
    }
    
    // Apply active campaign
    const campaignButtons = document.querySelectorAll('.filter-btn');
    campaignButtons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-category') === siteSettings.active_campaign) {
        button.classList.add('active');
      }
    });
    
    // Show only the active campaign cards initially
    const campaignCards = document.querySelectorAll('.campaign-card');
    campaignCards.forEach(card => {
      card.style.display = 'none';
      if (card.getAttribute('data-category') === siteSettings.active_campaign) {
        card.style.display = 'block';
      }
    });
    
    // Apply volunteer status
    const volunteerSection = document.querySelector('.volunteer-section');
    if (volunteerSection) {
      if (siteSettings.volunteer_status === 'open') {
        volunteerSection.innerHTML = `
          <h2>تطوع معنا</h2>
          <div class="volunteer-cta open">
            <p>باب التطوع مفتوح الآن! انضم إلى فريقنا وكن جزءًا من التغيير الإيجابي</p>
            <a href="./volunteer.html#volunteer-now" class="volunteer-button">سجل الآن</a>
          </div>
        `;
      }
      // If closed, keep the default content
    }
    
    // Apply volunteer status on volunteer.html page
    const volunteerHero = document.querySelector('.volunteer-hero');
    if (volunteerHero) {
      const volunteerNotice = volunteerHero.querySelector('.volunteer-notice');
      if (volunteerNotice && siteSettings.volunteer_status === 'open') {
        volunteerNotice.innerHTML = `
          <form id="volunteer-form" class="volunteer-form">
            <h3>نموذج التسجيل للتطوع</h3>
            <div class="form-group">
              <label for="volunteer-name">الاسم الكامل</label>
              <input type="text" id="volunteer-name" name="name" required>
            </div>
            <div class="form-group">
              <label for="volunteer-email">البريد الإلكتروني</label>
              <input type="email" id="volunteer-email" name="email" required>
            </div>
            <div class="form-group">
              <label for="volunteer-phone">رقم الهاتف</label>
              <input type="tel" id="volunteer-phone" name="phone" required>
            </div>
            <div class="form-group">
              <label for="volunteer-area">مجال التطوع المفضل</label>
              <select id="volunteer-area" name="area" required>
                <option value="">اختر مجال التطوع</option>
                <option value="education">التعليم</option>
                <option value="health">الصحة</option>
                <option value="environment">البيئة</option>
                <option value="social">التنمية الاجتماعية</option>
                <option value="media">الإعلام</option>
              </select>
            </div>
            <div class="form-group">
              <label for="volunteer-message">لماذا تريد التطوع معنا؟</label>
              <textarea id="volunteer-message" name="message" rows="4"></textarea>
            </div>
            <button type="submit" class="submit-btn">إرسال الطلب</button>
          </form>
        `;
      }
    }
  } catch (error) {
    console.error('Error applying settings:', error);
  }
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', applySettings);

// Export for use in other scripts if needed
window.siteSettings = siteSettings;
window.fetchSettings = fetchSettings;