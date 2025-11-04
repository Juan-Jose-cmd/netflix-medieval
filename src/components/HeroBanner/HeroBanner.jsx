import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../../services/api';
import './HeroBanner.css';

function HeroBanner() {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const loadFeaturedMovie = async () => {
      try {
        const data = await getPopularMovies();
        // Tomar una película aleatoria como destacada
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        setFeaturedMovie(randomMovie);
      } catch (error) {
        console.error('Error cargando película destacada:', error);
      }
    };

    loadFeaturedMovie();
  }, []);

  if (!featuredMovie) {
    return (
      <div className="hero-banner loading">
        <div className="loading-sword">⚔️</div>
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
            <p className="hero-description">
              {featuredMovie.overview?.substring(0, 150)}...
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
