document.addEventListener("DOMContentLoaded", () => {
  // ===== Modal Functionality =====
  const modal = document.getElementById("facilityModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  // Translation helper (add ABOVE facilityDetails if not already present)
  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const facilityDetails = {
    indoor: {
      key: "pool_indoor_modal",
      details:
        "Heated indoor pool designed for relaxation and leisure swimming.",
    },
    slide: {
      key: "pool_slide_modal",
      details: "An exciting 80 meter water slide for adventurous guests.",
    },
    river: {
      key: "pool_river_modal",
      details:
        "Relax and float along the lazy river inside Splash Erlebniswelt.",
    },
    kids: {
      key: "pool_kids_modal",
      details: "Safe and fun children's pool area designed for young guests.",
    },
  };

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const facility = btn.dataset.facility;

      modalTitle.textContent =
        btn.parentElement.querySelector("h3").textContent;

      const item = facilityDetails[facility];

      modalDetails.textContent = item ? t(item.key, item.details) : "";

      modal.classList.add("active");
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // ===== Animation on Scroll (SAFE VERSION) =====

  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 },
  );

  animatedElements.forEach((el) => observer.observe(el));
});
