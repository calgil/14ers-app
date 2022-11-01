import React, { useState } from "react";
import s from "./Filter.module.css";

const Filter = ({ peaks, setSearchResults }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [resultsMsg, setResultsMsg] = useState("");
  // future results info

  const resetSearch = () => {
    setError(false);
    setErrorMsg("");
    setName("");
    setSearchResults([]);
    console.log("reset");
  };

  const filterElevation = (str) => {
    setError(false);
    if (str === "ascending") {
      const sortedPeaks = [...peaks].sort((a, b) => a.elevation - b.elevation);
      setSearchResults(sortedPeaks);
    }
    if (str === "descending") {
      const sortedPeaks = [...peaks].sort((a, b) => b.elevation - a.elevation);
      setSearchResults(sortedPeaks);
    }
  };

  const handleChange = (e) => {
    const searchName = e.target.value.toLowerCase();
    setName(searchName);
  };

  const searchByName = (e) => {
    e.preventDefault();
    if (!name.length) {
      setError(false);
      return setSearchResults([]);
    }
    const result = peaks.filter((peak) =>
      peak.name.toLowerCase().includes(name)
    );
    if (!result.length) {
      setError(true);
      return setErrorMsg(`No peaks have a name of ${name}`);
    }
    setError(false);
    setSearchResults(result);
  };

  const filterRange = (str) => {
    const filteredResults = [...peaks].filter((peak) =>
      peak.range.toLowerCase().includes(str.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className={s.filterContainer}>
        <button onClick={resetSearch}>Reset Search</button>
        <div className={s.filter}>
          <h5 className={s.filterHeader}>Elevation</h5>
          <div className={s.filterRow}>
            <i className="fa fa-caret-up"></i>
            <span onClick={() => filterElevation("descending")}>
              Tallest First
            </span>
          </div>
          <div className={s.filterRow}>
            <i className="fa fa-caret-down"></i>
            <span onClick={() => filterElevation("ascending")}>
              Shortest First
            </span>
          </div>
        </div>
        <div className={s.filter}>
          <h5 className={s.filterHeader}>Name</h5>
          <div className={s.filterRow}>
            <form onSubmit={searchByName}>
              <i className="fa-magnifying-glass"></i>
              <input
                onChange={handleChange}
                value={name}
                className={s.search}
                type="text"
                placeholder="Peak Name"
              />
              <input type="submit" value="Search" />
            </form>
          </div>
        </div>
        <div className={s.filter}>
          <h5 className={s.filterHeader}>Range</h5>
          <div className={s.rangeContainer}>
            <div className={s.filterRow}>
              <span onClick={() => filterRange("elk")}>Elk</span>
            </div>
            <div className={s.filterRow}>
              <span onClick={() => filterRange("front")}>Front</span>
            </div>
            <div className={s.filterRow}>
              <span onClick={() => filterRange("sangre de cristo")}>
                Sangre de Christo
              </span>
            </div>
            <div className={s.filterRow}>
              <span onClick={() => filterRange("sawatch")}>Sawatch</span>
            </div>
            <div className={s.filterRow}>
              <span onClick={() => filterRange("san juan")}>San Juan</span>
            </div>
          </div>
        </div>
      </div>
      {error && <div className={s.error}>{errorMsg}</div>}
    </>
  );
};

export default Filter;
