document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("roomModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  // Translation helper (SAFE fallback)
  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const suiteDetails = {
    onebed: {
      titleKey: "apartments_onebed_title",
      detailsKey: "apartments_onebed_modal",
      title: "Executive Suite",
      details: "Spacious suite with premium comfort."
    },

    twobed: {
      titleKey: "apartments_twobed_title",
      detailsKey: "apartments_twobed_modal",
      title: "Balcony Suite",
      details: "Suite with balcony and sea views."
    },

    superior: {
      titleKey: "apartments_superior_title",
      detailsKey: "apartments_superior_modal",
      title: "Deluxe Suite",
      details: "Large suite with elegant interiors."
    },

    deluxe: {
      titleKey: "apartments_deluxe_title",
      detailsKey: "apartments_deluxe_modal",
      title: "Premium Suite",
      details: "Luxury suite with sea views."
    }
  };


  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.room;
      const apt = suiteDetails[type];

      modalTitle.textContent = t(apt.titleKey, apt.title);
      modalDetails.textContent = t(apt.detailsKey, apt.details);

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

  // ===== Animation Fix =====
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
    { threshold: 0.15 }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // ===== FILTER FUNCTIONALITY =====
  const filterButtons = document.querySelectorAll(".filter-btn");
  const roomCards = document.querySelectorAll(".room-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      roomCards.forEach((card) => {
        const type = card.getAttribute("data-type");

        if (filter === "all" || type === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});