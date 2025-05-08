// Sample donation data - Replace with actual API data later
const donationData = [
  {
    id: 1,
    title: 'مساعدة أسرة محتاجة',
    description: 'أسرة مكونة من 5 أفراد تحتاج إلى مساعدة مالية لتغطية نفقات المعيشة الأساسية',
    pros: [
      '- تساهم في تحسين مستوى المعيشة لأسرة محتاجة.',
      '- تضمن توفير الاحتياجات الأساسية مثل الغذاء والدواء.',
      '- تعزز روح التكافل والتعاون في المجتمع.',
      '- فرصة لكسب الأجر والثواب من خلال عمل خيري نبيل.'
    ],    
    image: './images/hero1.webp',
    category: 'family',
    amount: 200,
    target: 10000,
    beneficiaries: 1
  },
  {
    id: 2,
    title: 'افطار صائم',
    description: 'حملة لتوزيع وجبات الإفطار على الصائمين خلال شهر رمضان المبارك',
    pros: [
      '- تساهم في تحسين مستوى المعيشة لأسرة محتاجة.',
      '- تضمن توفير الاحتياجات الأساسية مثل الغذاء والدواء.',
      '- تعزز روح التكافل والتعاون في المجتمع.',
      '- فرصة لكسب الأجر والثواب من خلال عمل خيري نبيل.'
    ], 
    image: './images/hero2.webp',
    category: 'campaigns',
    amount: 500,
    beneficiaries: "5"
  },
  {
    id: 3,
    title: 'مساعدة أسرة 5857',
    description: 'مطلقة تعول طفلين بدخل شهري 1500 جنيه (500 من نفقة المطلقات و1000 مساهمة من جد الأطفال)، يعاني الأبناء من صعوبات تعلم وحساسية صدرية، ولا يساهم الأب في علاجهم، والأم غير قادرة على تحمل تكاليف العلاج، كما أن الوضع الغذائي غير مناسب والملابس متهالكة وتعتمد الأسرة على مساعدات أهل الخير.',
    pros: [
      '- تساهم في تحسين مستوى المعيشة لأسرة محتاجة.',
      '- تضمن توفير الاحتياجات الأساسية مثل الغذاء والدواء.',
      '- تعزز روح التكافل والتعاون في المجتمع.',
      '- فرصة لكسب الأجر والثواب من خلال عمل خيري نبيل.'
    ], 
    image: './images/family.jfif',
    category: 'family',
    amount: 200,
    target: 1400,
    beneficiaries: 2
  },
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Check if donation popup already exists to prevent duplicate elements
  if (!document.getElementById('donation-popup')) {
    // Initialize the app
    renderDonationDetails();
    injectDonationPopup();
    setupDonationPopup();
  }
});

// Get category label in Arabic
function getCategoryLabel(cat) {
  const categories = {
    'family': 'أسرة',
    'campaigns': 'بند',
    'unconditional': 'تبرع غير مشروط'
  };
  return categories[cat] || cat;
}

// Handle share functionality
window.handleShare = function(donationId) {
  const donation = donationData.find(d => d.id === donationId);
  const detailsUrl = `${window.location.origin}${window.location.pathname}?id=${donationId}`;
  
  if (navigator.share) {
    navigator.share({
      title: donation.title,
      text: donation.description,
      url: detailsUrl
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(detailsUrl).then(() => {
      alert('تم نسخ الرابط!');
    }).catch(console.error);
  }
}

// Render donation details page
function renderDonationDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const section = document.getElementById('donationDetailsSection');

  if (!section) {
    console.error('Details section element not found');
    return;
  }

  const donation = donationData.find(d => d.id === id);

  if (!donation) {
    section.innerHTML = `
      <div class="donation-details-landscape">
        <div class="error-message">
          لم يتم العثور على بيانات التبرع المطلوبة.
        </div>
      </div>
    `;
    return;
  }

  const progress = donation.category !== 'campaigns' ? Math.min(((donation.amount || 0) / (donation.target || 1)) * 100, 100) : 0;
  
  // Generate HTML for pros with each point on a separate line
  const prosHTML = donation.pros ? 
    `<div class="donation-pros">
      <h3>المميزات:</h3>
      <ul>
        ${donation.pros.map(pro => `<li>${pro}</li>`).join('')}
      </ul>
    </div>` : '';

  const donationTargetsHTML = donation.category === 'campaigns' ?
    `<div class="donation-targets">
      <div>
        <b>${donation.amount}</b> جنيه تم جمعها
      </div>
    </div>` :
    `<div class="donation-targets">
      <div>
        <b>${donation.amount}</b> جنيه تم جمعها
      </div>
      <div>
        من <b>${donation.target}</b> جنيه
      </div>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${progress}%;"></div>
    </div>
    <div class="progress-percentage">${Math.round(progress)}% من الهدف</div>`;

  section.innerHTML = `
    <div class="donation-details-landscape">
      <div class="donation-image">
        <img src="${donation.image}" alt="${donation.title}">
        <p class="donation-description">${donation.description}</p>
        ${prosHTML}
      </div>
      <div class="donation-info">
        <h3 class="donation-title">${donation.title}</h3>
        <div class="donation-category">
          <span>${getCategoryLabel(donation.category)}</span>
        </div>
        <div class="donation-beneficiaries">
          <i class="fa-solid fa-users"></i>
          <span>عدد المستفيدين: ${donation.beneficiaries}</span>
        </div>
        ${donationTargetsHTML}
        <div class="donation-actions">
          <button class="donation-share-icon" onclick="handleShare(${donation.id})">
            <i class="fa-solid fa-share-nodes"></i>
          </button>
          <button id="donate-now-btn-${donation.id}" class="donate-now-btn">تبرع الآن</button>
        </div>
      </div>
    </div>
  `;
  
  // After rendering the details, set up the donate button
  const donateButton = document.getElementById(`donate-now-btn-${donation.id}`);
  if (donateButton) {
    donateButton.addEventListener('click', (e) => {
      e.preventDefault();
      const popup = document.getElementById('donation-popup');
      if (popup) {
        popup.classList.add('show');
      } else {
        console.error('Donation popup not found');
      }
    });
  }
}

// Add donation popup HTML to the document
function injectDonationPopup() {
  const popupHTML = `
  <div id="donation-popup" class="donation-popup">
    <div class="popup-content">
      <span class="close-popup">&times;</span>
      <h3>بيانات التبرع</h3>
      <form id="donationForm">
        <div class="radio-group" style="margin-bottom: 15px;">
          <label>نوع التبرع:</label>
          <input type="radio" name="donationType" value="specific" id="specificDonation" checked /> تبرع مخصص
          <input type="radio" name="donationType" value="general" id="generalDonation" /> تبرع عام
        </div>
        <label for="donorName">الاسم:</label>
        <input type="text" id="donorName" name="donorName" required />
        <label for="donorPhone">رقم الهاتف:</label>
        <input type="tel" id="donorPhone" name="donorPhone" required />
        <label for="donorAmount">مبلغ التبرع:</label>
        <input type="tel" id="donorAmount" name="donorAmount" required />
        <label for="donorIntention">نية التبرع:</label>
        <input type="text" id="donorIntention" name="donorIntention" required value=""/>
        <div class="radio-group">
          <label>هل تريد ان يصل اليك مندوب ليأخذ التبرع؟</label>
          <input type="radio" name="needDelegate" value="yes" id="needDelegateYes" /> نعم
          <input type="radio" name="needDelegate" value="no" id="needDelegateNo" checked /> لا
        </div>
        <div id="locationField" class="hidden">
          <label for="donorLocation">العنوان:</label>
          <input type="text" id="donorLocation" name="donorLocation" />
        </div>
        <button type="submit" id="submit-donation-btn" class="submit-data">إرسال</button>
      </form>
    </div>
  </div>
  `;
  
  // Only inject if it doesn't already exist
  if (!document.getElementById('donation-popup')) {
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }
}

// Setup event listeners for the donation popup
function setupDonationPopup() {
  const popup = document.getElementById('donation-popup');
  if (!popup) {
    console.error('Donation popup element not found');
    return;
  }

  // Get donation title from URL and set it as intention
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const donation = donationData.find(d => d.id === id);
  if (donation) {
    const intentionField = document.getElementById('donorIntention');
    if (intentionField) {
      intentionField.value = donation.title;
    }
  }
  
  const closeBtn = document.querySelector('.close-popup');
  const donationForm = document.getElementById('donationForm');
  const needDelegateYes = document.getElementById('needDelegateYes');
  const needDelegateNo = document.getElementById('needDelegateNo');
  const locationField = document.getElementById('locationField');
  
  // Close popup when X is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('show');
    });
  }
  
  // Close popup when clicking outside the form
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('show');
    }
  });
  
  // Toggle location field visibility based on delegate selection
  if (needDelegateYes) {
    needDelegateYes.addEventListener('change', () => {
      locationField.classList.remove('hidden');
    });
  }
  
  if (needDelegateNo) {
    needDelegateNo.addEventListener('change', () => {
      locationField.classList.add('hidden');
    });
  }
  
  // Handle donation type change
  const generalDonation = document.getElementById('generalDonation');
  const specificDonation = document.getElementById('specificDonation');
  const intentionField = document.getElementById('donorIntention');

  if (generalDonation && specificDonation && intentionField) {
    generalDonation.addEventListener('change', () => {
      intentionField.value = 'تبرع عام';
      intentionField.readOnly = true;
    });

    specificDonation.addEventListener('change', () => {
      intentionField.readOnly = false;
      // Restore original intention if available
      const params = new URLSearchParams(window.location.search);
      const id = Number(params.get('id'));
      const donation = donationData.find(d => d.id === id);
      if (donation) {
        intentionField.value = donation.title;
      } else {
        intentionField.value = '';
      }
    });
  }

  // Handle form submission
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        name: document.getElementById('donorName').value,
        phone: document.getElementById('donorPhone').value,
        amount: document.getElementById('donorAmount').value,
        intention: document.getElementById('donorIntention').value,
        needDelegate: document.querySelector('input[name="needDelegate"]:checked').value,
        location: document.getElementById('donorLocation').value
      };
      
      // You would typically send this data to a server
      console.log('Donation form submitted:', formData);
      
      // Show success message and redirect based on delegate option
      if (formData.needDelegate === 'no') {
        window.location.href = './payment.html';
      } else {
        alert('شكرا لأدخال بيانتكم! سيتم التواصل معكم قريباً');
        donationForm.reset();
        popup.classList.remove('show');
      }
    });
  }
}