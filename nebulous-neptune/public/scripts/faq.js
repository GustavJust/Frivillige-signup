document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const faqContent = button.closest(".drop_menu").querySelector(".faq-content");
      const svgIcon = button.querySelector("svg"); 

      if (faqContent.classList.contains("show")) {
        faqContent.style.maxHeight = null; 
        svgIcon.style.transform = "rotate(0deg)"; 
      } else {
        faqContent.style.maxHeight = faqContent.scrollHeight + "px"; 
        svgIcon.style.transform = "rotate(180deg)"; 
      }

      faqContent.classList.toggle("show");
    });
  });
});