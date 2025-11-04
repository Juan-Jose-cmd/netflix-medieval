import React, { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies, getTopRatedMovies } from '../services/api';
import Header from '../components/Header/Header';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import MovieRow from '../components/MovieRow/MovieRow';
import SearchResults from '../components/SearchResults/SearchResults';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const [popularData, topRatedData] = await Promise.all([
          getPopularMovies(),
          getPopularMovies()
        ]);
        
        setPopularMovies(popularData.results);
        setTopRatedMovies(topRatedData.results.slice(0, 15));
        setNowPlayingMovies(popularData.results.slice(10, 25));
        
        setLoading(false);
      } catch (error) {
        console.error('Error cargando películas:', error);
        setLoading(false);
      }
    };

    loadInitialMovies();
  }, []);


  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchQuery('');
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);

    try {
      const allMovies = [...popularMovies, ...topRatedMovies, ...nowPlayingMovies];
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      

      const uniqueResults = filtered.filter((movie, index, self) =>
        index === self.findIndex(m => m.id === movie.id)
      );
      
      setSearchResults(uniqueResults);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', marginTop: '80px' }}>
        <h2>Cargando el reino cinematográfico...</h2>
      </div>
    );
  }


  if (searchResults !== null) {
    return (
      <div className="netflix-home">
        <Header onSearch={handleSearch} />
        <SearchResults 
          searchQuery={searchQuery}
          searchResults={searchResults}
          isLoading={isSearching}
        />
      </div>
    );
  }


  return (
    <div className="netflix-home">
      <Header onSearch={handleSearch} />
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
          title="En Cartelera" 
          movies={nowPlayingMovies} 
        />
        
        <MovieRow 
          title="Recomendadas para Ti" 
          movies={popularMovies.slice(15, 25)} 
        />
      </main>
    </div>
  );
}

export default Home;
