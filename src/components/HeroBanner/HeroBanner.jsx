import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../../services/api';
import './HeroBanner.css';

function HeroBanner() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMovie = async () => {
      try {
        const data = await getPopularMovies();
        // Filtrar películas con backdrop
        const moviesWithBackdrop = data.results.filter(movie => movie.backdrop_path);
        const randomMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];
        setFeaturedMovie(randomMovie);
      } catch (error) {
        console.error('Error cargando película destacada:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovie();
  }, []);

  if (loading) {
    return (
      <div className="hero-banner loading">
        <div className="loading-sword">⚔️</div>
        <p>Cargando épica cinematográfica...</p>
      </div>
    );
  }

  if (!featuredMovie) {
    return (
      <div className="hero-banner error">
        <h2>No se pudo cargar la película destacada</h2>
      </div>
    );
  }

  return (
    <div className="hero-banner">
      <div 
        className="hero-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{featuredMovie.title}</h1>
            <div className="hero-meta">
              <span className="rating">⭐ {featuredMovie.vote_average?.toFixed(1)}</span>
              <span className="year">{new Date(featuredMovie.release_date).getFullYear()}</span>
              <span className="duration">2h 28m</span>
            </div>
            <p className="hero-description">
              {featuredMovie.overview?.substring(0, 200)}...
            </p>
            
            <div className="hero-actions">
              <button className="btn-play">
                <span>▶️</span> Reproducir
              </button>
              <button className="btn-info">
                <span>ℹ️</span> Más Información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
