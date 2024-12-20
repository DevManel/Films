import tmdbApi from './classes/TmdbApi.js';

const elements = {
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('#search'),
    movieList: document.querySelector('#movie-list'),
    prevPageButton: document.querySelector('#prev-page'),
    nextPageButton: document.querySelector('#next-page'),
    currentPage: document.querySelector('#current-page'),
    totalPages: document.querySelector('#total-pages')
};

let currentPage = 1;
let totalPages = 1;

// Fonction pour afficher les films dans la liste
function displayMovies(movies) {
    if (movies.length === 0) {
        elements.movieList.innerHTML = '<li>Aucun film trouvé.</li>';
        return;
    }

    elements.movieList.innerHTML = movies
        .map(movie => {
            return `<li>${movie.title} (${movie.release_date})</li>`;
        })
        .join('');
}

// Fonction pour charger les films populaires
async function loadDiscoverMovies() {
    const movies = await tmdbApi.discoverMovies(currentPage);
    displayMovies(movies);
    updatePagination();  // Mettre à jour la pagination
}

// Fonction pour rechercher des films
async function searchMovies(query) {
    const movies = await tmdbApi.searchMovies(query, currentPage);
    displayMovies(movies);
    updatePagination();  // Mettre à jour la pagination
}

// Mettre à jour les boutons de pagination
function updatePagination() {
    elements.currentPage.textContent = currentPage;
    elements.totalPages.textContent = totalPages;
    
    elements.prevPageButton.disabled = currentPage === 1;
    elements.nextPageButton.disabled = currentPage === totalPages;
}

// Gérer la soumission du formulaire de recherche
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = elements.searchInput.value.trim();
    if (query) {
        currentPage = 1;  // Réinitialiser la page à 1
        searchMovies(query); // Effectuer la recherche
    }
});

// Gérer les événements de pagination
elements.prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadDiscoverMovies();
    }
});

elements.nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadDiscoverMovies();
    }
});

// Initialisation : charger les films populaires
loadDiscoverMovies();
