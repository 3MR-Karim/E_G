let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
const slideDuration = 5000; // 5 seconds
const slides = document.querySelectorAll(".ItemBody .item");
const indicators = document.querySelectorAll(".carousel-indicators > li");
let autoSlideInterval;

function setPositionByIndex() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
}

function showSlide(index) {
  currentSlide = index;
  setPositionByIndex();
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  } else {
    showSlide(0);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  } else {
    showSlide(slides.length - 1);
  }
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, slideDuration);
}

function startDragging(index) {
  return function (event) {
    isDragging = true;
    startPos = event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
    currentTranslate = prevTranslate;
  };
}

function endDragging() {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentSlide < slides.length - 1) {
    nextSlide();
  } else if (movedBy > 100 && currentSlide > 0) {
    prevSlide();
  } else {
    setPositionByIndex();
  }

  resetAutoSlide();
  prevTranslate = currentTranslate;
}

function dragging(event) {
  if (isDragging) {
    const currentPosition = event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;

    const movementX = currentPosition - startPos;

    // Prevent dragging beyond the first and last slides
    if (
      (currentSlide === 0 && movementX > 0) ||
      (currentSlide === slides.length - 1 && movementX < 0)
    ) {
      return;
    }

    currentTranslate = prevTranslate + movementX * 0.5; // Slower dragging effect
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${
        (index - currentSlide) * 100 +
        (currentTranslate / window.innerWidth) * 100
      }%)`;
    });
  }
}

// Automatically change slide every 5 seconds
resetAutoSlide();

// Initialize the first slide as active
showSlide(currentSlide);

// Add event listeners for dragging
slides.forEach((slide, index) => {
  slide.addEventListener("touchstart", startDragging(index));
  slide.addEventListener("touchend", endDragging);
  slide.addEventListener("touchmove", dragging);

  slide.addEventListener("mousedown", startDragging(index));
  slide.addEventListener("mouseup", endDragging);
  slide.addEventListener("mouseleave", endDragging);
  slide.addEventListener("mousemove", dragging);
});

// Add event listeners for manual interaction (arrows and indicators)
document.querySelector(".right-arrow").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

document.querySelector(".left-arrow").addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
    resetAutoSlide();
  });
});

// _______________________________________________________________________
let close = document.querySelector(".close");

close.addEventListener("click", () => {
  document.querySelector(".itemmmm").style.display = "none"; // استخدم النقطة مع الفئة
});

let List = document.querySelector(".Lists");
List.addEventListener("click", () => {
  document.querySelector(".itemmmm").style.display = "flex"; // استخدم النقطة مع الفئة
});
// _________________________________________________
