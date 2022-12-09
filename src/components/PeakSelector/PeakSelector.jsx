import React, { useState, useEffect } from "react";
import s from "./PeakSelector.module.css";
import { getAllPeaks } from "../../services";
import Peaks from "../Peaks/Peaks";

const PeakSelector = ({ updatePeak }) => {
  const [selectedPeak, setSelectedPeak] = useState({});
  const [peakData, setPeakData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const resetData = (data) => {
    setFilteredData(data);
  };

  const fetchPeakData = () => {
    getAllPeaks()
      .then(setPeakData)
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchPeakData();
  }, []);

  useEffect(() => {
    resetData(peakData);
  }, [peakData]);

  const findMatches = (input) => {
    const matches = filteredData.filter((peak) =>
      peak.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(matches);
    if (matches.length < 15) {
      setShowDropdown(true);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setName(value);
    findMatches(value);
  };

  const getPeakData = (id) => {
    const peak = peakData.find((peak) => peak.id === id);
    if (!peak) {
      return;
    }
    return peak;
  };

  const handleClick = (id, name) => {
    setName(name);
    setShowDropdown(false);
    updatePeak(getPeakData(id));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className={s.peakSelector}>
      <div>
        <label> Select a peak</label>{" "}
        <button className={s.dropdownBtn} onClick={toggleDropdown}>
          {showDropdown ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )}
        </button>
        <div>
          <input
            className={s.inputBase}
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className={showDropdown ? `${s.dropdown} ${s.show}` : `${s.dropdown}`}
      >
        {filteredData.length &&
          filteredData.map((peak) => (
            <div
              className={s.peakName}
              key={peak.id}
              onClick={() => handleClick(peak.id, peak.name)}
            >
              {peak.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PeakSelector;
