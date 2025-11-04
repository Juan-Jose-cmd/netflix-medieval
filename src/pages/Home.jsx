import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import Header from '../components/Header/Header';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import MovieRow from '../components/MovieRow/MovieRow';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Cargar películas populares
        const popularData = await getPopularMovies();
        setPopularMovies(popularData.results);
        
        // Podríamos cargar más categorías aquí después
        setTopRatedMovies(popularData.results.slice(0, 10)); // Temporal
        
        setLoading(false);
      } catch (error) {
        console.error('Error cargando películas:', error);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', marginTop: '80px' }}>
        <h2>🛡️ Cargando el reino cinematográfico...</h2>
      </div>
    );
  }

  return (
    <div className="netflix-home">
      <Header />
      <HeroBanner />
      
      <main className="main-content">
        <MovieRow 
          title="Populares en Netflix Medieval" 
          movies={popularMovies.slice(0, 10)} 
        />
        
        <MovieRow 
          title="Top Épicas" 
          movies={topRatedMovies} 
        />
        
        <MovieRow 
          title="Continuar Viendo" 
          movies={popularMovies.slice(10, 20)} 
        />
      </main>
    </div>
  );
}

export default Home;
