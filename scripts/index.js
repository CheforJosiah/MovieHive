document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const movieCards = document.querySelectorAll(".movie-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Set the active class on the clicked button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      // Loop through all movie cards to show/hide them
      movieCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block"; // Show card
        } else {
          card.style.display = "none"; // Hide card
        }
      });
    });
  });
});
