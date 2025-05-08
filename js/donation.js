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

// Handle donation type change
const setupDonationTypeHandlers = () => {
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
      const cardTitle = document.querySelector('.donation-title')?.textContent || '';
      intentionField.value = cardTitle;
    });
  }
};

// DOM Elements
const cardsContainer = document.getElementById('donationCardsContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const popup = document.getElementById('donation-popup');
const closePopupBtn = document.querySelector('.close-popup');
const donationForm = document.getElementById('donationForm');
const locationField = document.getElementById('locationField');
const needDelegateRadios = document.querySelectorAll('input[name="needDelegate"]');

// Touch scroll handling for donation cards with swipe functionality
if (cardsContainer) {
  let isScrolling = false;
  let startX;
  let scrollLeft;
  let startTime;
  let isMobile = window.innerWidth <= 768;
  let currentIndex = 0;
  let cardWidth = 0;
  let threshold = 100; // Minimum distance to trigger swipe

  function setupSwipeHandlers() {
    // Only apply swipe behavior on mobile
    if (!isMobile) return;
    
    // Get current cards and their width
    const cards = document.querySelectorAll('.donation-card');
    if (cards.length > 0) {
      cardWidth = cards[0].offsetWidth;
      // Reset current index if needed
      if (currentIndex >= cards.length) {
        currentIndex = 0;
      }
    }
  }

  // Update card positions and active state
  function updateCardsPosition() {
    if (!isMobile) return;
    
    const cards = document.querySelectorAll('.donation-card');
    cards.forEach((card, index) => {
      card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
      card.style.transition = 'transform 0.3s ease';
      card.style.opacity = index === currentIndex ? '1' : '0.5';
    });
    
    // Update dots
    const dots = document.querySelectorAll('.donation-slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    const cards = document.querySelectorAll('.donation-card');
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    
    currentIndex = index;
    updateCardsPosition();
  }

  cardsContainer.addEventListener('touchstart', (e) => {
    if (!isMobile) return;
    
    isScrolling = true;
    startX = e.touches[0].pageX;
    startTime = new Date().getTime();
    
    // Disable transitions during touch
    const cards = document.querySelectorAll('.donation-card');
    cards.forEach(card => {
      card.style.transition = 'none';
    });
  });

  cardsContainer.addEventListener('touchmove', (e) => {
    if (!isScrolling || !isMobile) return;
    e.preventDefault();
    
    const currentX = e.touches[0].pageX;
    const diff = startX - currentX;
    const cards = document.querySelectorAll('.donation-card');
    
    cards.forEach((card, index) => {
      const offset = (index - currentIndex) * 100 - (diff / cardWidth * 100);
      card.style.transform = `translateX(${offset}%)`;
    });
  });

  cardsContainer.addEventListener('touchend', (e) => {
    if (!isScrolling || !isMobile) return;
    
    const currentX = e.changedTouches[0].pageX;
    const diff = startX - currentX;
    const timeDiff = new Date().getTime() - startTime;
    const cards = document.querySelectorAll('.donation-card');
    
    // Enable transitions again
    cards.forEach(card => {
      card.style.transition = 'transform 0.3s ease';
    });
    
    // Determine if swipe should change slide
    // Fast swipe or distance greater than threshold
    if (Math.abs(diff) > threshold || (Math.abs(diff) > 30 && timeDiff < 300)) {
      if (diff > 0 && currentIndex < cards.length - 1) {
        // Swipe left - go to next
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - go to previous
        currentIndex--;
      }
    }
    
    updateCardsPosition();
    isScrolling = false;
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    setupSwipeHandlers();
    updateCardsPosition();
  });
  
  // Initialize swipe functionality
  setupSwipeHandlers();
  
  // Listen for filter changes to reinitialize
  document.addEventListener('filterApplied', () => {
    currentIndex = 0;
    setupSwipeHandlers();
    updateCardsPosition();
  });
}

// Add donation type radio buttons to popup
if (!document.getElementById('donationType')) {
  const donationTypeHtml = `
    <div class="radio-group" style="margin-bottom: 15px;">
      <label>نوع التبرع:</label>
      <input type="radio" name="donationType" value="specific" id="specificDonation" checked /> تبرع مخصص
      <input type="radio" name="donationType" value="general" id="generalDonation" /> تبرع عام
    </div>
  `;
  const form = document.getElementById('donationForm');
  if (form) {
    form.insertAdjacentHTML('afterbegin', donationTypeHtml);
    setupDonationTypeHandlers();
  }
}
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
    const cardTitle = document.querySelector('.donation-title')?.textContent || '';
    intentionField.value = cardTitle;
  });
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    window.history.pushState({}, '', url);
    // Update active button state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    // Render filtered cards
    renderDonationCards(category);
  });
});

// Functions
function createDonationCard(donation) {
  const card = document.createElement('div');
  card.className = 'donation-card';
  card.dataset.category = donation.category;

  // Handle progress calculation differently based on category
  let progressHtml = '';

  if (donation.category === 'campaigns') {
    // For campaigns, simply show collected amount without progress bar
    progressHtml = `
      <div class="donation-progress">
        <div class="donation-progress-text">
          <span class="donation-amount" style='text-align:right'>المبلغ المجمع: ${donation.amount ? donation.amount : '0'}</span>
        </div>
      </div>
    `;
  } else {
    // For other categories, calculate and show progress
    donation.progress = ((donation.amount || 0) / (donation.target || 1)) * 100;
    progressHtml = `
      <div class="donation-progress">
        <div class="donation-progress-text">
          <span class="donation-amount">${donation.amount ? donation.amount : '0'}</span>
          <span class="donation-separator">/</span>
          <span class="donation-target">${donation.target ? donation.target : '0'}</span>
        </div>
        <div class="donation-progress-bar">
          <div class="donation-progress-fill" style="width: ${donation.progress ? donation.progress : '0'}%;"></div>
        </div>
        <div class="donation-percentage">${donation.progress ? Math.round(donation.progress) : '0'}%</div>
      </div>
    `;
  }

  // Add description for campaigns only
  const descriptionHtml = donation.category === 'campaigns'
    ? `<p class="donation-dexcription" style='padding: 7px 0 7px 0'>${donation.description}</p>`
    : '';

  card.innerHTML = `
    <div class="donation-card-header">
      <img src="${donation.image}" alt="${donation.title}" class="donation-card-image">
      <div class="donation-share-icon share-btn" data-id="${donation.id}">
        <i class="fa-solid fa-share-nodes"></i>
      </div>
    </div>
    <div class="donation-card-content">
      <h3 class="donation-title">${donation.title}</h3>
      <div class="donation-info">
        <div class="donation-location">
          <i class="fa-solid fa-location-dot"></i>
          <span>${donation.location ? donation.location : 'منطقة دمياط'}</span>
        </div>
        <div class="donation-beneficiaries">
          <i class="fa-solid fa-users"></i>
          <span> عددالمستفيدين: ${donation.beneficiaries ? donation.beneficiaries : '1'}</span>
        </div>
      </div>
      ${descriptionHtml}
      ${progressHtml}
      <div class="donation-quantity">
        <h4>المبلغ</h4>
        <div class="donation-amount-input">
          <input type="number" class="custom-amount-input" value="${donation.suggestedAmount ? donation.suggestedAmount : ''}" min="1" placeholder="أدخل مبلغ التبرع">
          <div class="donation-currency"><span>جنيه</span></div>
        </div>
      </div>
      <div class="donation-actions">
        <button class="donation-details" onclick="location.href='details.html?id=${donation.id}'">التفاصيل</button>
        <button class="donation-now" data-id="${donation.id}">تبرع</button>
      </div>
    </div>
  `;
  return card;
}

function renderDonationCards(category = null) {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = '';
  
  // Check URL parameters for category filter
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category');
  
  // On index.html, only show family category
  const isHomePage = window.location.pathname.endsWith('index.html');
  const activeCategory = category || urlCategory;
  
  const filteredData = isHomePage
    ? donationData.filter(donation => donation.category === 'family')
    : activeCategory
      ? donationData.filter(donation => donation.category === activeCategory)
      : donationData;

  // Update filter button states
  filterButtons.forEach(button => {
    if (button.dataset.category === activeCategory) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  filteredData.forEach(donation => {
    cardsContainer.appendChild(createDonationCard(donation));
  });

  // Dispatch filterApplied event after cards are added
  setTimeout(() => {
    document.dispatchEvent(new Event('filterApplied'));
  }, 100);
}

function handleShare(donationId) {
  const donation = donationData.find(d => d.id === donationId);
  // Get the base path from current location
  const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
  const detailsUrl = `${window.location.origin}${basePath}details.html?id=${donationId}`;

  if (navigator.share) {
    navigator.share({
      title: donation.title,
      text: donation.description,
      url: detailsUrl
    }).catch(console.error);
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(detailsUrl).then(() => {
      alert('تم نسخ الرابط!');
    }).catch(console.error);
  }
}


// Event Listeners
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderDonationCards(button.dataset.category);
  });
});

cardsContainer.addEventListener('click', (e) => {
  const donateBtn = e.target.closest('.donation-now');
  const shareBtn = e.target.closest('.share-btn');

  if (donateBtn) {
    // تحديد البطاقة التي تم الضغط عليها
    const card = donateBtn.closest('.donation-card');
    // جلب عنوان البطاقة
    const cardTitle = card.querySelector('.donation-title')?.textContent || '';
    // جلب قيمة المبلغ من input داخل البطاقة
    const amountInput = card.querySelector('.custom-amount-input');
    const cardAmount = amountInput ? amountInput.value : '';
    // فتح النافذة المنبثقة
    popup.classList.remove('hidden');
    popup.classList.add('show');
    // تعبئة الحقول في النافذة المنبثقة
    document.getElementById('donorAmount').value = cardAmount;
    document.getElementById('donorIntention').value = cardTitle;
  } else if (shareBtn) {
    handleShare(Number(shareBtn.dataset.id));
  }
});

closePopupBtn.addEventListener('click', () => {
  popup.classList.remove('show');
  setTimeout(() => {
    popup.classList.add('hidden');
    donationForm.reset();
    locationField.classList.add('hidden');
  }, 300);
});

needDelegateRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    locationField.classList.toggle('hidden', radio.value === 'no');
  });
});

donationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form submission - Add API integration later
  const formData = new FormData(donationForm);
  console.log('Form submitted:', Object.fromEntries(formData));
  alert('شكرا لأدخال بيانتكم! يرجى اتمام عملية التبرع من خلال البيانات الموضحة في الصفحة القادمة');  
  popup.classList.add('hidden');
  donationForm.reset();
});

// Initialize
renderDonationCards();

// Check URL parameters for automatic filtering
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');
if (categoryParam) {
  const filterBtn = document.querySelector(`[data-category="${categoryParam}"]`);
  if (filterBtn) {
    filterBtn.click();
  }
}