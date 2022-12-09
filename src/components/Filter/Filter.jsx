import React, { useState } from "react";
import s from "./Filter.module.css";

const Filter = ({ peaks, setSearchResults, reset }) => {
  const [isDescending, setIsDescending] = useState(true);

  const filterElevation = () => {
    if (isDescending) {
      const sortedPeaks = [...peaks].sort(
        (a, b) => +b.elevation - +a.elevation
      );
      return setSearchResults(sortedPeaks);
    }
    const sortedPeaks = [...peaks].sort((a, b) => +a.elevation - +b.elevation);
    setSearchResults(sortedPeaks);
  };

  const handleSort = () => {
    setIsDescending(!isDescending);
    filterElevation();
  };

  const filterRange = ({ target: { value } }) => {
    const filteredResults = [...peaks].filter((peak) => {
      return peak.range.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className={s.filterContainer}>
        <div className={s.filter}>
          <h5 className={s.filterHeader}>Range</h5>
          <div className={s.rangeContainer}>
            <button value={"elk"} className={s.filterRow} onClick={filterRange}>
              Elk
            </button>
            <button
              value={"front"}
              className={s.filterRow}
              onClick={filterRange}
            >
              Front
            </button>
            <button
              value={"sangre de cristo"}
              className={s.filterRow}
              onClick={filterRange}
            >
              Sangre de Cristo
            </button>
            <button
              value={"sawatch"}
              className={s.filterRow}
              onClick={filterRange}
            >
              Sawatch
            </button>
            <button
              value={"san juan"}
              className={s.filterRow}
              onClick={filterRange}
            >
              San Juan
            </button>
          </div>
        </div>
        <button className={s.sortElevationBtn} onClick={handleSort}>
          <span className={s.btnText}>Elevation</span>
          {isDescending ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )}
        </button>
        <button className={s.resetBtn} onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Filter;
