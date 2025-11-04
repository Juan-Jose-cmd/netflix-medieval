const API_KEY = '05bb171bc32c1beb33fbb2092d6dc83c';

const API_CONFIG = {
    baseURL: 'https://api.themoviedb.org/3',
    apiKey: API_KEY,  // ← CORREGIDO: "Key" con K minúscula
    imageBaseURL: 'https://image.tmdb.org/t/p'
};

export const fetchFromAPI = async (endpoint) => {
  try {
    const url = `${API_CONFIG.baseURL}${endpoint}?api_key=${API_CONFIG.apiKey}&language=es-ES`;
    console.log('🔍 Haciendo request a:', url);
    
    const response = await fetch(url);
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Datos recibidos:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching from API:', error);
    throw error;
  }
};

export const getPopularMovies = () => fetchFromAPI('/movie/popular');
export const getMovieDetails = (movieId) => fetchFromAPI(`/movie/${movieId}`);
