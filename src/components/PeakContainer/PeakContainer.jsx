import React, { useEffect, useState } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
// import Filter from "../Filter/Filter";

const PeakContainer = () => {
  const [peaks, setPeaks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

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
        {loading && <div>Loading...</div>}
        {error && <ErrorPage />}
        {/* Make peaks component pass in the results you want displayed map that and create peaks */}
        {searchResults.length
          ? !!searchResults.length &&
            searchResults.map((peak) => <Peak key={peak.id} peak={peak} />)
          : !!peaks.length &&
            peaks.map((peak) => <Peak key={peak.id} peak={peak} />)}
      </div>
    </>
  );
};

export default PeakContainer;
