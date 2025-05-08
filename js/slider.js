document.addEventListener('DOMContentLoaded', function() {
  const sliderTrack = document.querySelector('.slider-track');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  let images = [];
  let currentIndex = 0;
  let total = 0;

  // Dynamically detect slider images
  const imageExtensions = ['jpg','jpeg','png','webp'];
  for (let i = 1; i <= 4; i++) {
    for (let ext of imageExtensions) {
      const imgPath = `./images/slider${i}.${ext}`;
      const img = new Image();
      img.src = imgPath;
      img.className = 'slider-image';
      img.onerror = function(){};
      img.onload = function() {
        if (!images.some(im => im.src === img.src)) {
          images.push(imgPath);
          updateDots();
          updateSlider();
        }
      };
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    total = images.length;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', `انتقل إلى الصورة رقم ${i+1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    if (!sliderTrack) return;
    sliderTrack.innerHTML = '';
    if (images.length > 0) {
      const img = document.createElement('img');
      img.src = images[currentIndex];
      img.className = 'slider-image fade-in';
      img.addEventListener('animationend', function() {
        img.classList.remove('fade-in');
      });
      sliderTrack.appendChild(img);
    }
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const currentImg = sliderTrack.querySelector('.slider-image');
      if (currentImg) {
        currentImg.classList.remove('fade-in');
        currentImg.classList.add('fade-out');
        currentImg.addEventListener('animationend', function handler() {
          currentImg.removeEventListener('animationend', handler);
          currentIndex = (currentIndex - 1 + total) % total;
          updateSlider();
        });
      } else {
        currentIndex = (currentIndex - 1 + total) % total;
        updateSlider();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentImg = sliderTrack.querySelector('.slider-image');
      if (currentImg) {
        currentImg.classList.remove('fade-in');
        currentImg.classList.add('fade-out');
        currentImg.addEventListener('animationend', function handler() {
          currentImg.removeEventListener('animationend', handler);
          currentIndex = (currentIndex + 1) % total;
          updateSlider();
        });
      } else {
        currentIndex = (currentIndex + 1) % total;
        updateSlider();
      }
    });
  }

  // Touch swipe support for mobile
  let startX = null;
  let startY = null;
  if (sliderTrack) {
    sliderTrack.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: false });

    sliderTrack.addEventListener('touchmove', function(e) {
      if (!startX || !startY) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const diffX = startX - x;
      const diffY = startY - y;
      // Ensure horizontal swipe is more significant than vertical scroll
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault(); // Prevent scrolling when swiping horizontally
      }
    }, { passive: false });

    sliderTrack.addEventListener('touchend', function(e) {
      if (!startX) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          // Swipe left - next slide
          nextBtn && nextBtn.click();
        } else {
          // Swipe right - previous slide
          prevBtn && prevBtn.click();
        }
      }
      startX = null;
      startY = null;
    });
  }
});
