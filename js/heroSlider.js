document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on a page with hero slider
  const sliderTrack = document.querySelector(".hero-slider-track");
  const dotsContainer = document.querySelector(".slider-dots");
  // Return early if elements don't exist or already initialized
  if (!sliderTrack || sliderTrack.dataset.initialized) return;
  // Mark as initialized
  sliderTrack.dataset.initialized = 'true';

  // إعداد الصور
  const heroImages = [
    "./images/hero1.webp",
    "./images/hero2.webp",
    "./images/hero2.webp",
    "./images/hero1.webp"
  ];
  let current = 0;
  let animating = false;
  let intervalId;

  // إنشاء عنصر الصورة
  const img = document.createElement("img");
  img.src = heroImages[current];
  img.alt = "Hero Slide";
  img.className = "slider-image";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.borderRadius = "18px";
  img.style.transition = "opacity 0.7s cubic-bezier(.77,0,.18,1)";
  img.style.opacity = "1";
  img.draggable = false;
  sliderTrack.appendChild(img);

  // توليد النقاط
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    heroImages.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (idx === current ? " active" : "");
      dot.setAttribute("aria-label", `انتقل إلى الشريحة ${idx + 1}`);
      dot.addEventListener("click", () => {
        if (current !== idx) {
          showImage(idx);
          resetInterval();
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === current);
    });
  }

  function showImage(idx) {
    if (animating) return;
    animating = true;
    img.style.opacity = "0";
    setTimeout(() => {
      current = idx;
      img.src = heroImages[current];
      img.style.opacity = "1";
      updateDots();
      animating = false;
    }, 700);
  }

  function showNextImage() {
    let next = (current + 1) % heroImages.length;
    showImage(next);
  }

  function resetInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 5000);
  }

  resetInterval();

  // Touch swipe support
  let startX = null;
  let startY = null;

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
        showNextImage();
        resetInterval();
      } else {
        // Swipe right - previous slide
        let prevIndex = (current - 1 + heroImages.length) % heroImages.length;
        showImage(prevIndex);
        resetInterval();
      }
    }

    startX = null;
    startY = null;
  });

  // تحديث النقاط عند التحميل الأول
  updateDots();
});