import React, { useState } from "react";
import s from "./SearchBar.module.css";

const SearchBar = ({ searchResults, setSearchResults, resetSearch, type }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const clearSearch = () => {
    setError(false);
    setSearchInput("");
    resetSearch();
  };

  const filterResults = (input) => {
    if (!input.length) {
      return clearSearch();
    }
    const result = searchResults.filter((item) =>
      item[type].toLowerCase().includes(input)
    );
    if (!result.length) {
      setError(true);
      setErrorMsg(`No results matching ${input}`);
      return;
    }
    setSearchResults(result);
  };

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);
    filterResults(input);
  };

  return (
    <div className={s.searchContainer}>
      <div className={s.searchBar}>
        <i className={`fa fa-search ${s.searchIcon}`}></i>
        <input
          onChange={handleChange}
          className={s.search}
          value={searchInput}
          type="text"
          placeholder="Peak Name"
        />
        <i
          onClick={clearSearch}
          className={`fa fa-times-circle-o ${s.closeIcon}`}
        ></i>
      </div>
      <input className={s.searchBtn} type="submit" value="Search" />
      {error && <div className={s.error}>{errorMsg}</div>}
    </div>
  );
};

export default SearchBar;
