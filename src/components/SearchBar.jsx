import React, { useState } from "react";
import "./SearchBar.css"; // Import the CSS file for styling

const SearchBar = ({
  onSearch,
  sectorOptions,
  selectedSector,
  onHandleSectorChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    const input = e.target.value;
    // Check if the input contains any numbers
    if (/\d/.test(input)) {
      // Display an error message
      setErrorMessage("Please enter only letters.");
      setSearchTerm("");
      onSearch("");
    } else {
      setErrorMessage("");
      setSearchTerm(input);
      onSearch(input);
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleSectorChange = (e) => {
    const sector = e.target.value;
    onHandleSectorChange(sector);
  };

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
      {errorMessage && <p className="search-bar-error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SearchBar;
