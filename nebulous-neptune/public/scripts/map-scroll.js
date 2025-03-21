document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".description-container");
  const prevBtn = document.querySelector(".previous").closest("button");
  const nextBtn = document.querySelector(".next").closest("button");
  const indicators = document.querySelectorAll(".progress div");
  const locationDots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  let scrollTimeout;

  const getSlideWidth = () => {
    // Get the width of the first child div inside the container
    const slide = container.querySelector("div");
    return slide ? slide.offsetWidth : window.innerWidth;
  };

  const totalSlides = container.children.length;

  function updateIndicators() {
    indicators.forEach((el, i) => {
      el.classList.toggle("filled", i === currentIndex);
    });

    locationDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function moveToSlide(newIndex) {
    const slideWidth = getSlideWidth();

    if (newIndex >= totalSlides) {
      currentIndex = 0;
    } else if (newIndex < 0) {
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = newIndex;
    }

    container.scrollTo({
      left: currentIndex * slideWidth,
      behavior: "smooth",
    });

    updateIndicators();
  }

  nextBtn.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
  });

  container.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const slideWidth = getSlideWidth();
      const newIndex = Math.round(container.scrollLeft / slideWidth);

      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateIndicators();
      }
    }, 100);
  });

  window.addEventListener("resize", () => {
    // Recalculate scroll position on resize to match current index
    const slideWidth = getSlideWidth();
    container.scrollTo({
      left: currentIndex * slideWidth,
      behavior: "instant"
    });
  });

  // Initialize
  updateIndicators();
});
