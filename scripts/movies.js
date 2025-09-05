


const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultCount = document.getElementById("resultCount");


import { API_KEY } from "../config.js";

const fetchAndDisplayMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const movies = await response.json();
    console.log(movies); // Log the fetched movies for debugging
    movieGrid.innerHTML = "";
    movies.results.forEach((movie, index) => {
      if (index >= 20) {
        return; // Limit to no more than index number of  movies
      }
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      let title = document.createElement("h3");
      let releaseDate = document.createElement("p");
      let poster = document.createElement("img");

      title.textContent = movie.title;
      releaseDate.textContent = `Release Date: ${movie.release_date}`;
      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      poster.alt = movie.title;

      movieCard.appendChild(poster);
      movieCard.appendChild(title);
      movieCard.appendChild(releaseDate);
      movieGrid.appendChild(movieCard);

      resultCount.textContent = `(${index + 1})`;
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
  searchButton.addEventListener("click", searchMovies);
};
function searchMovies() {
  const input = document.getElementById("searchInput").value;
  const movieCards = document.getElementsByClassName("movie-card");
  Array.from(movieCards).forEach((card) => {
    const movieTitle = card.querySelector("h3").textContent;
    if (movieTitle.toLowerCase().includes(input.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
fetchAndDisplayMovies();
