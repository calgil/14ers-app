import React, { useEffect, useState } from "react";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
import Peaks from "../Peaks/Peaks";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import ResultInfo from "../ResultInfo/ResultInfo";
// import Filter from "../Filter/Filter";

const PeakContainer = () => {
  const [peaks, setPeaks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
    console.log("peaks", peaks);
  }, []);

  // useEffect(() => {
  //   setSearchResults(peaks);
  // }, [peaks]);

  const resetSearch = () => {
    setSearchResults(peaks);
  };

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const indexOfLastPeak = currentPage * peaksPerPage;
  // const indexOfFirstPeak = indexOfLastPeak - peaksPerPage;
  // const currentPeaks = searchResults.slice(indexOfFirstPeak, indexOfLastPeak);
  return (
    <>
      <img
        src="https://fourteener-photos.s3.us-west-2.amazonaws.com/peaks/images/1075445f9841a3db08da942b67d2d9fc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZHU7DCBQZTFWE2O2%2F20221123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221123T185511Z&X-Amz-Expires=3600&X-Amz-Signature=9002b9140ed40eac6d19c6e0dc659c0466a626f5b747750724ef290c639a59bd&X-Amz-SignedHeaders=host&x-id=GetObject"
        alt="test"
      />
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
        <SearchBar
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          resetSearch={resetSearch}
          setCurrentPage={setCurrentPage}
        />
        {/* <div className={s.searchResults}>
          Showing {indexOfFirstPeak + 1} - {searchResults.length} of{" "}
          {searchResults.length}
        </div> */}
        {/* <ResultInfo
          startIndex={indexOfFirstPeak}
          endIndex={indexOfLastPeak}
          total={searchResults.length}
        /> */}
        {/* <div className={s.resultInfo}>
          <span>
            {`Showing ${indexOfFirstPeak + 1} - ${indexOfLastPeak + 1} of ${
              searchResults.length
            }`}
          </span>
        </div> */}
        {error ? (
          <ErrorPage />
        ) : (
          // <Peaks loading={loading} peaks={currentPeaks} />
          <Peaks loading={loading} peaks={peaks} />
        )}
        {/* <Pagination
          peaksPerPage={peaksPerPage}
          totalPeaks={searchResults.length}
          paginate={paginate}
        /> */}
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
