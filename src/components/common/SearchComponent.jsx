import React from 'react';

const SearchComponent = ({ searchTerm, handleSearchChange }) => {

console.log(searchTerm);

  return (
    <>
      {/* Table search input */}
      <div className="search-box">
        <input
          type="text"
          className="form-control search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <i className="ri-search-line search-icon"></i>
      </div>
    </>
  );
};

export default SearchComponent;
