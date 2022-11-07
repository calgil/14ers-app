import React, { useState } from "react";
import s from "./SearchBar.module.css";

const SearchBar = ({
  searchResults,
  setSearchResults,
  resetSearch,
  setCurrentPage,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const clearSearch = () => {
    setSearchInput("");
    setError(false);
    resetSearch();
  };

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
  };

  const filterResults = (e) => {
    e.preventDefault();
    if (!searchInput.length) {
      return clearSearch();
    }
    const result = searchResults.filter(
      (peak) =>
        peak.name.toLowerCase().includes(searchInput) ||
        peak.range.toLowerCase().includes(searchInput)
    );
    if (!result.length) {
      setError(true);
      setErrorMsg(`No results matching ${searchInput}`);
      return;
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
      {error && <div className={s.error}>{errorMsg}</div>}
    </div>
  );
};

export default SearchBar;
