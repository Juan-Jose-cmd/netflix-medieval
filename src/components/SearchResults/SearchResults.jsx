import React from 'react';
import MovieRow from '../MovieRow/MovieRow';
import './SearchResults.css';

function SearchResults({ searchQuery, searchResults, isLoading }) {
  if (isLoading) {
    return (
      <div className="search-results loading">
        <div className="loading-spinner">⚔️</div>
        <h2>Buscando "{searchQuery}" en los archivos del reino...</h2>
      </div>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="search-results empty">
        <div className="empty-icon">📜</div>
        <h2>No se encontraron pergaminos para "{searchQuery}"</h2>
        <p>Intenta con otras palabras mágicas</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-header">
        <h1>Resultados para: "{searchQuery}"</h1>
        <p className="results-count">{searchResults.length} películas encontradas</p>
      </div>
      
      <div className="search-grid">
        {searchResults.map(movie => (
          <div key={movie.id} className="search-movie-card">
            <img 
              src={movie.poster_path ? 
                `https://image.tmdb.org/t/p/w300${movie.poster_path}` :
                '/placeholder-poster.jpg'
              }
              alt={movie.title}
              className="movie-poster"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMkY0RjRGIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0I4ODYwQiIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkNpbnplbCI+8J+arjwvdGV4dD4KPC9zdmc+';
              }}
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                <span className="year">{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <p className="movie-overview">
                {movie.overview?.substring(0, 120)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
