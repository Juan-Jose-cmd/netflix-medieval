import React, { useState } from 'react';
import './Header.css';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim() && onSearch) {
      onSearch(e.target.value.trim());
    }
  };

  return (
    <header className="medieval-header">
      <div className="header-content">
        <div className="logo">
          <h1>Netflix Medieval</h1>
        </div>
        
        <nav className="navigation">
          <button className="nav-btn active">Inicio</button>
          <button className="nav-btn">Series</button>
          <button className="nav-btn">Películas</button>
          <button className="nav-btn">Mi Lista</button>
        </nav>

        <div className="user-section">
          <div className={`search-container ${isSearchActive ? 'active' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Buscar pergaminos cinematográficos..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => setIsSearchActive(false)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
            
            {isSearchActive && searchQuery && (
              <div className="search-suggestions">
                <p>Buscar: "{searchQuery}"</p>
              </div>
            )}
          </div>
          
          <button className="user-btn">👤</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
