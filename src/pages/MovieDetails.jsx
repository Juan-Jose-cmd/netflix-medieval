import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import Header from '../components/Header/Header';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error('Error cargando detalles:', error);
        setError('No se pudo cargar la película');
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details loading">
        <Header />
        <div className="loading-content">
          <div className="loading-sword">⚔️</div>
          <h2>Cargando pergamino cinematográfico...</h2>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details error">
        <Header />
        <div className="error-content">
          <h2> Pergamino No Encontrado</h2>
          <p>{error || 'La película no existe'}</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Volver al Reino
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <Header />
      
      <div 
        className="movie-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="movie-hero-overlay">
          <div className="movie-hero-content">
            <button onClick={() => navigate('/')} className="btn-back">
              ← Volver al Reino
            </button>
            
            <div className="movie-info">
              <div className="movie-poster-section">
                <img 
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster-large"
                />
              </div>
              
              <div className="movie-details-content">
                <h1 className="movie-title">{movie.title}</h1>
                
                <div className="movie-meta">
                  <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                  <span className="year">{new Date(movie.release_date).getFullYear()}</span>
                  <span className="runtime">{movie.runtime} min</span>
                  <span className="language">{movie.original_language?.toUpperCase()}</span>
                </div>

                <div className="genres">
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>

                {movie.tagline && (
                  <p className="movie-tagline">"{movie.tagline}"</p>
                )}
                
                <div className="movie-actions">
                  <button className="btn-play-large">
                    <span>▶️</span> Reproducir
                  </button>
                  <button className="btn-trailer">
                    <span>🎬</span> Tráiler
                  </button>
                  <button className="btn-favorite">
                    <span>❤️</span> Favorito
                  </button>
                </div>

                <div className="movie-overview-section">
                  <h3>Sinopsis del Pergamino</h3>
                  <p className="movie-overview">{movie.overview}</p>
                </div>

                <div className="movie-stats">
                  <div className="stat">
                    <span className="stat-label">Presupuesto</span>
                    <span className="stat-value">
                      {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Ingresos</span>
                    <span className="stat-value">
                      {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Estado</span>
                    <span className="stat-value">{movie.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
