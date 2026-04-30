// document.addEventListener("DOMContentLoaded", () => {
//   /* ===============================
//      ROOM DETAILS MODAL
//   =============================== */

//   const modal = document.getElementById("roomModal");
//   const modalTitle = document.getElementById("modalTitle");
//   const modalDetails = document.getElementById("modalDetails");
//   const closeModal = document.querySelector(".modal-close");
//   function t(key, fallback) {
//     if (window.translations && window.currentLang) {
//       return window.translations[window.currentLang][key] || fallback;
//     }
//     return fallback;
//   }

//   const roomDetails = {
//     standard: {
//       titleKey: "hotel_standard_title",
//       detailsKey: "hotel_standard_modal",
//       title: "Standard Double Room",
//       details:
//         "Peaceful garden views with natural decorative elements such as wood and linen. A relaxing atmosphere perfect for unwinding during your stay on Rügen.",
//     },

//     superior: {
//       titleKey: "hotel_superior_title",
//       detailsKey: "hotel_superior_modal",
//       title: "Superior Double Room",
//       details:
//         "Classic continental style with additional comfort, a sleeper chair for an extra guest and a furnished balcony overlooking the Jasmunder Bodden.",
//     },

//     junior: {
//       titleKey: "hotel_junior_title",
//       detailsKey: "hotel_junior_modal",
//       title: "Junior Suite",
//       details:
//         "Ideal for couples or families with one child. Features a double bed, comfortable seating area, work desk and private balcony with scenic views.",
//     },

//     landauer: {
//       titleKey: "hotel_landauer_title",
//       detailsKey: "hotel_landauer_modal",
//       title: "Landauer Suite",
//       details:
//         "Spacious two-bedroom suite for up to six guests with a living room, sofa bed, dining area and furnished balcony.",
//     },
//   };

//   document.querySelectorAll(".details-btn").forEach((button) => {
//     button.addEventListener("click", () => {
//       const roomType = button.dataset.room;

//       const room = roomDetails[roomType];

//       modalTitle.textContent = t(room.titleKey, room.title);
//       modalDetails.textContent = t(room.detailsKey, room.details);

//       modal.classList.add("active");
//     });
//   });

//   if (closeModal) {
//     closeModal.addEventListener("click", () => {
//       modal.classList.remove("active");
//     });
//   }

//   if (modal) {
//     modal.addEventListener("click", (e) => {
//       if (e.target === modal) {
//         modal.classList.remove("active");
//       }
//     });
//   }

//   /* ===============================
//      ROOM FILTER SYSTEM
//   =============================== */

//   const filterButtons = document.querySelectorAll(".filter-btn");
//   const roomCards = document.querySelectorAll(".room-card");

//   filterButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const filter = button.dataset.filter;

//       filterButtons.forEach((btn) => {
//         btn.classList.remove("active");
//       });

//       button.classList.add("active");

//       roomCards.forEach((card) => {
//         const type = card.dataset.type;

//         if (filter === "all" || filter === type) {
//           card.classList.remove("hidden");
//         } else {
//           card.classList.add("hidden");
//         }
//       });
//     });
//   });

//   /* ===============================
//      SCROLL ANIMATION
//      (safe version so text never disappears)
//   =============================== */

//   const animatedElements = document.querySelectorAll("[data-animate]");

//   if (animatedElements.length > 0) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("visible");
//           }
//         });
//       },
//       { threshold: 0.15 },
//     );

//     animatedElements.forEach((el) => observer.observe(el));
//   }
// });
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ROOM DETAILS MODAL
  =============================== */

  const modal = document.getElementById("roomModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  function t(key, fallback) {
    if (window.translations && window.currentLang) {
      return window.translations[window.currentLang][key] || fallback;
    }
    return fallback;
  }

  const roomDetails = {
    standard: {
      titleKey: "hotel_standard_title",
      detailsKey: "hotel_standard_modal",
      title: "Classic Double Room",
      details: "Comfortable double room ideal for couples."
    },

    superior: {
      titleKey: "hotel_superior_title",
      detailsKey: "hotel_superior_modal",
      title: "Balcony Room",
      details: "Room with private balcony and sea views."
    },

    junior: {
      titleKey: "hotel_junior_title",
      detailsKey: "hotel_junior_modal",
      title: "Family Room",
      details: "Spacious room ideal for families."
    },

    landauer: {
      titleKey: "hotel_landauer_title",
      detailsKey: "hotel_landauer_modal",
      title: "Executive Room",
      details: "Premium room with elegant design."
    }
  };

  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", () => {

      const key = button.dataset.room;
      const room = roomDetails[key];

      // ✅ IMPORTANT FIX (prevents crash)
      if (!room) return;

      modalTitle.textContent = t(room.titleKey, room.title);
      modalDetails.textContent = t(room.detailsKey, room.details);

      modal.classList.add("active");
    });
  });

  /* CLOSE MODAL */
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
  /* ===============================
     FILTER SYSTEM
  =============================== */

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".room-card");

  filters.forEach(btn => {
    btn.addEventListener("click", () => {

      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const type = card.dataset.type;

        if (filter === "all" || filter === type) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

});