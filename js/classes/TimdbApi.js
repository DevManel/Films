class TmdbApi {
    constructor(apiKey, accessToken) {
        this.apiKey = apiKey;
        this.accessToken = accessToken; // Ajout du jeton d'accès
        this.baseUrl = 'https://api.themoviedb.org/3'; // URL de base pour l'API TMDb
    }

    // Méthode pour récupérer la liste des films populaires
    async discoverMovies(page = 1) {
        const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&page=${page}&sort_by=popularity.desc`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`  // Ajout du jeton dans l'en-tête
                }
            });
            const data = await response.json();
            if (data.results) {
                return data.results; // Retourne la liste des films
            } else {
                throw new Error('Aucun film trouvé dans la réponse');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des films populaires:', error);
            return [];
        }
    }

    // Méthode pour rechercher des films par texte
    async searchMovies(query, page = 1) {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`  // Ajout du jeton dans l'en-tête
                }
            });
            const data = await response.json();
            if (data.results) {
                return data.results; // Retourne la liste des films correspondants à la recherche
            } else {
                throw new Error('Aucun film trouvé pour cette recherche');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de films:', error);
            return [];
        }
    }
}

// Exemple d'utilisation avec API Key et Token
const apiKey = '4224f36f34d316d5ac7828af7366e68d'; // Ta clé API
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjI0ZjM2ZjM0ZDMxNmQ1YWM3ODI4YWY3MzY2ZTY4ZCIsIm5iZiI6MTczNDcwMzM2Mi41ODcwMDAxLCJzdWIiOiI2NzY1NzkwMjhlOWQ5Y2NkZWI5MGNkZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LO6XyMRXKkiyNUhGne7n3nEM6WbK6w3uKq3kZbVniXc';  // Ton jeton d'authentification
const tmdbApi = new TmdbApi(apiKey, accessToken);

export default tmdbApi;
