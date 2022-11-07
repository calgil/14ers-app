import React, { useEffect, useState } from "react";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
import Peaks from "../Peaks/Peaks";
import Pagination from "../Pagination/Pagination";
// import Filter from "../Filter/Filter";

const PeakContainer = () => {
  const [peaks, setPeaks] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [showFilter, setShowFilter] = useState(false);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPeak = currentPage * peaksPerPage;
  const indexOfFirstPeak = indexOfLastPeak - peaksPerPage;
  const currentPeaks = peaks.slice(indexOfFirstPeak, indexOfLastPeak);

  return (
    <>
      {/* <button
        className={s.filterToggleBtn}
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>
      {showFilter && (
        <Filter peaks={peaks} setSearchResults={setSearchResults} />
      )} */}
      <div className={s.peakContainer}>
        {error ? (
          <ErrorPage />
        ) : (
          <Peaks loading={loading} peaks={currentPeaks} />
        )}
        <Pagination
          peaksPerPage={peaksPerPage}
          totalPeaks={peaks.length}
          paginate={paginate}
        />

        {/* Make peaks component pass in the results you want displayed map that and create peaks */}
        {/* {searchResults.length
          ? !!searchResults.length &&
            searchResults.map((peak) => <Peak key={peak.id} peak={peak} />)
          : !!peaks.length &&
            peaks.map((peak) => <Peak key={peak.id} peak={peak} />)} */}
      </div>
    </>
  );
};

export default PeakContainer;
