import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieRow.css';

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 300;
      rowRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button 
          className="row-nav left" 
          onClick={() => scroll(-1)}
        >
          ‹
        </button>
        
        <div className="row-content" ref={rowRef}>
          {movies.map(movie => (
            <div 
              key={movie.id} 
              className="movie-item"
              onClick={() => handleMovieClick(movie.id)}
            >
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
              <div className="movie-hover-info">
                <h4>{movie.title}</h4>
                <div className="movie-meta">
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                  <span>🗓️ {new Date(movie.release_date).getFullYear()}</span>
                </div>
                <p className="movie-overview">
                  {movie.overview?.substring(0, 100)}...
                </p>
                <div className="movie-actions">
                  <button className="action-btn play">▶️</button>
                  <button className="action-btn info">ℹ️</button>
                  <button className="action-btn add">➕</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="row-nav right" 
          onClick={() => scroll(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
