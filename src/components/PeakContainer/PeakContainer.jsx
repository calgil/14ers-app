import React, { useEffect, useState, useContext } from "react";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
import Peaks from "../Peaks/Peaks";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import ResultInfo from "../ResultInfo/ResultInfo";
import { UserContext } from "../../App";
import Filter from "../Filter/Filter";

const PeakContainer = () => {
  const { authService } = useContext(UserContext);

  const [peaks, setPeaks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [peaksPerPage, setPeaksPerPage] = useState(15);

  useEffect(() => {
    setLoading(true);
    getAllPeaks()
      .then(setPeaks)
      .then(setLoading(false))
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    setSearchResults(peaks);
  }, [peaks]);

  const resetSearch = () => {
    setSearchResults(peaks);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPeak = currentPage * peaksPerPage;
  const indexOfFirstPeak = indexOfLastPeak - peaksPerPage;
  const currentPeaks = searchResults.slice(indexOfFirstPeak, indexOfLastPeak);
  return (
    <>
      {/* <button
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
      </button> */}
      <Filter
        peaks={peaks}
        setSearchResults={setSearchResults}
        reset={resetSearch}
      />
      <div className={s.peakContainer}>
        <SearchBar
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          resetSearch={resetSearch}
          setCurrentPage={setCurrentPage}
        />
        <ResultInfo
          startIndex={indexOfFirstPeak}
          endIndex={indexOfLastPeak}
          total={searchResults.length}
        />
        {error ? (
          <ErrorPage />
        ) : (
          <Peaks loading={loading} peaks={currentPeaks} />
        )}
        <Pagination
          peaksPerPage={peaksPerPage}
          totalPeaks={searchResults.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default PeakContainer;
