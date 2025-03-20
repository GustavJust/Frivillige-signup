document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".description-container");
    const prevBtn = document.querySelector(".previous").closest("button");
    const nextBtn = document.querySelector(".next").closest("button");
    const indicators = document.querySelectorAll(".progress div");
    const locationDots = document.querySelectorAll(".dot");
  
    const slideWidth = window.innerWidth;
    const totalSlides = container.children.length;
    let currentIndex = 0;
    let scrollTimeout; // Timeout variable for debouncing
  
    // Function to update active indicators
    function updateIndicators() {
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("filled", i === currentIndex);
      });
  
      locationDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  
    // Function to move to a specific slide
    function moveToSlide(newIndex) {
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
  
    // Event listeners for buttons
    nextBtn.addEventListener("click", () => moveToSlide(currentIndex + 1));
    prevBtn.addEventListener("click", () => moveToSlide(currentIndex - 1));
  
    // Listen for manual scrolling with debouncing
    container.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
  
      scrollTimeout = setTimeout(() => {
        let newIndex = Math.round(container.scrollLeft / slideWidth);
        if (newIndex !== currentIndex) {
          currentIndex = newIndex;
          updateIndicators();
        }
      }, 100); // Delay to prevent flickering
    });
  
    // Initialize the first active indicator
    updateIndicators();
  });
  