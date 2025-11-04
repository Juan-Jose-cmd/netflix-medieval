import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="medieval-header">
      <div className="header-content">
        <div className="logo">
          <h1>🏰 Netflix Medieval</h1>
        </div>
        
        <nav className="navigation">
          <button className="nav-btn active">Inicio</button>
          <button className="nav-btn">Series</button>
          <button className="nav-btn">Películas</button>
          <button className="nav-btn">Mi Lista</button>
        </nav>

        <div className="user-section">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar pergaminos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span>🔍</span>
          </div>
          <button className="user-btn">👤</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
