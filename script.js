// Simple media carousel logic
(function () {
  const carousel = document.getElementById("mediaCarousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotsContainer = document.getElementById("mediaDots");
  const prevBtn = document.querySelector(".carousel-arrow.arrow-left");
  const nextBtn = document.querySelector(".carousel-arrow.arrow-right");

  let currentIndex = 0;

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (index === 0 ? " active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to media ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    if (index === currentIndex) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides[currentIndex].classList.remove("active");
    slides[index].classList.add("active");

    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots[currentIndex].classList.remove("active");
    dots[index].classList.add("active");

    currentIndex = index;
  }

  function handlePrev() {
    goToSlide(currentIndex - 1);
  }

  function handleNext() {
    goToSlide(currentIndex + 1);
  }

  if (dotsContainer) {
    createDots();
  }

  if (prevBtn) prevBtn.addEventListener("click", handlePrev);
  if (nextBtn) nextBtn.addEventListener("click", handleNext);

  // Optional: share button using Web Share API where available
  const shareButton = document.getElementById("shareButton");
  if (shareButton && navigator.share) {
    shareButton.addEventListener("click", async () => {
      try {
        await navigator.share({
          title: "Spaceflight Simulator 2",
          text: "Wishlist Spaceflight Simulator 2 and join the community!",
          url: window.location.href,
        });
      } catch {
        // ignore user cancellation
      }
    });
  }

  // FAQ Modal functionality
  const faqButton = document.getElementById("faqButton");
  const faqOverlay = document.getElementById("faqOverlay");
  const faqClose = document.getElementById("faqClose");

  function openFAQ() {
    if (faqOverlay) {
      // Trigger reflow to ensure initial state is applied
      faqOverlay.offsetHeight;
      faqOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeFAQ() {
    if (faqOverlay) {
      faqOverlay.classList.remove("active");
      // Wait for animation to complete before allowing body scroll
      setTimeout(() => {
        if (!faqOverlay.classList.contains("active")) {
          document.body.style.overflow = "";
        }
      }, 300);
    }
  }

  if (faqButton) {
    faqButton.addEventListener("click", openFAQ);
  }

  if (faqClose) {
    faqClose.addEventListener("click", closeFAQ);
  }

  if (faqOverlay) {
    faqOverlay.addEventListener("click", (e) => {
      if (e.target === faqOverlay) {
        closeFAQ();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && faqOverlay.classList.contains("active")) {
        closeFAQ();
      }
    });
  }
})();


