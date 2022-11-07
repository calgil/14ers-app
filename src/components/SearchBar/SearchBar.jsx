import React, { useState } from "react";
import s from "./SearchBar.module.css";

const SearchBar = ({
  searchResults,
  setSearchResults,
  resetSearch,
  setCurrentPage,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const clearSearch = () => {
    setSearchInput("");
    resetSearch();
  };

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
  };

  const filterResults = (e) => {
    e.preventDefault();
    if (!searchInput.length) {
      return console.log("no search input");
    }
    const result = searchResults.filter(
      (peak) =>
        peak.name.toLowerCase().includes(searchInput) ||
        peak.range.toLowerCase().includes(searchInput)
    );
    if (!result.length) {
      return console.log(`No results matching ${searchInput}`);
    }
    setCurrentPage(1);
    setSearchResults(result);
  };
  return (
    <div className={s.searchContainer}>
      <form className={s.searchForm} onSubmit={filterResults}>
        <div className={s.searchBar}>
          <i className={`fa fa-search ${s.searchIcon}`}></i>
          <input
            onChange={handleChange}
            value={searchInput}
            className={s.search}
            type="text"
            placeholder="Peak Name or Range"
          />
          <i
            onClick={clearSearch}
            className={`fa fa-times-circle-o ${s.closeIcon}`}
          ></i>
        </div>
        <input className={s.searchBtn} type="submit" value="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
