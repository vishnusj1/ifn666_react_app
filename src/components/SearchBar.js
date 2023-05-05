import React, { useState } from 'react';
import './SearchBar.css'; // Import the CSS file for styling


const SearchBar = ({onSearch}) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm)
    setSearchTerm('');
  }

  return (
    <div className="search-bar-container">
    <form onSubmit={onSearchSubmit}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="search-bar-button" type='submit'>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
