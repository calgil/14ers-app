import React, { useState } from "react";
import s from "./Filter.module.css";

const Filter = ({ peaks, setSearchResults, reset }) => {
  const [showFilter, setShowFilter] = useState(true);
  const [filterBy, setFilterBy] = useState([]);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const filterElevation = (str) => {
    setError(false);
    if (str === "ascending") {
      const sortedPeaks = [...peaks].sort(
        (a, b) => +a.elevation - +b.elevation
      );
      setSearchResults(sortedPeaks);
    }
    if (str === "descending") {
      const sortedPeaks = [...peaks].sort(
        (a, b) => +b.elevation - +a.elevation
      );
      setSearchResults(sortedPeaks);
    }
  };

  const addFilter = (str) => {
    filterBy.includes(str)
      ? console.log("already here")
      : setFilterBy([...filterBy, str]);
    console.log("filter by ", filterBy);
  };

  const filterRange = (str) => {
    addFilter(str);
    const filteredResults = [...peaks].filter((peak) => {
      peak.range.toLowerCase().includes(str.toLowerCase());
    });
    setSearchResults(filteredResults);
  };

  return (
    <>
      <button
        className={s.filterToggleBtn}
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? (
          <div>
            <i className="fa fa-chevron-left"></i> <span>Hide Filter</span>
          </div>
        ) : (
          <div>
            <i className="fa fa-chevron-right"></i>
            <span>Show Filter</span>
          </div>
        )}
      </button>
      {showFilter && (
        <div className={s.filterContainer}>
          <button className={s.resetBtn} onClick={reset}>
            Reset Search
          </button>
          <div className={s.filter}>
            <h5 className={s.filterHeader}>Elevation</h5>
            <div
              onClick={() => filterElevation("descending")}
              className={s.filterRow}
            >
              <i className="fa fa-caret-up"></i>
              <span>Tallest First</span>
            </div>
            <div
              className={s.filterRow}
              onClick={() => filterElevation("ascending")}
            >
              <i className="fa fa-caret-down"></i>
              <span>Shortest First</span>
            </div>
          </div>
          <div className={s.filter}>
            <h5 className={s.filterHeader}>Range</h5>
            <div className={s.rangeContainer}>
              <span className={s.filterRow} onClick={() => filterRange("elk")}>
                Elk
              </span>
              <span
                className={s.filterRow}
                onClick={() => filterRange("front")}
              >
                Front
              </span>
              <span
                className={s.filterRow}
                onClick={() => filterRange("sangre de cristo")}
              >
                Sangre de Cristo
              </span>
              <span
                className={s.filterRow}
                onClick={() => filterRange("sawatch")}
              >
                Sawatch
              </span>
              <span
                className={s.filterRow}
                onClick={() => filterRange("san juan")}
              >
                San Juan
              </span>
            </div>
          </div>
          <div className={s.searchBar}></div>
        </div>
      )}

      {error && <div className={s.error}>{errorMsg}</div>}
    </>
  );
};

export default Filter;
