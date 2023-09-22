

import React, { useState } from 'react';
import './Filter.css';
function SearchBarComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search project name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchBarComponent;

