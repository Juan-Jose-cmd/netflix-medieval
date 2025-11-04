import React from 'react';
import './MovieRow.css';

function MovieRow({ title, movies }) {
  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <div className="row-content">
          {movies.map(movie => (
            <div key={movie.id} className="movie-item">
              <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-hover-info">
                <h4>{movie.title}</h4>
                <p>⭐ {movie.vote_average?.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieRow;
