class TmdbApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.themoviedb.org/3'; // URL de base pour l'API TMDb
    }

    // Méthode pour récupérer la liste des films populaires
    async discoverMovies(page = 1) {
        const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&page=${page}&sort_by=popularity.desc`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                return { movies: data.results, total_pages: data.total_pages }; // Retourne les films et le nombre total de pages
            } else {
                throw new Error('Aucun film trouvé dans la réponse');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des films populaires:', error);
            return { movies: [], total_pages: 1 };
        }
    }

    // Méthode pour rechercher des films par texte
    async searchMovies(query, page = 1) {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                return { movies: data.results, total_pages: data.total_pages }; // Retourne les films recherchés et le nombre total de pages
            } else {
                throw new Error('Aucun film trouvé pour cette recherche');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de films:', error);
            return { movies: [], total_pages: 1 };
        }
    }
}

// Exemple d'utilisation avec API Key
const apiKey = '4224f36f34d316d5ac7828af7366e68d'; // Ta clé API
const tmdbApi = new TmdbApi(apiKey);

export default tmdbApi;
