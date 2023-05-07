import React, { useState } from "react";
import "./SearchBar.css"; // Import the CSS file for styling

const SearchBar = ({ onSearch, sectorOptions, selectedSector, onHandleSectorChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(searchTerm)
    console.log(e.target.value);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleSectorChange=(e)=>{ 
    const sector = e.target.value;
    onHandleSectorChange(sector);
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
        <button className="search-bar-button" type="submit">
          Search
        </button>
          <select
            id="sector"
            className="search-bar-dropdown-button"
            value={selectedSector}
            onChange={handleSectorChange}
          >
            <option value="">Sector</option>
            {sectorOptions.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
      </form>
    </div>
  );
};

export default SearchBar;
