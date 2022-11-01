import React, { useEffect, useState } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
import Filter from "../Filter/Filter";

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
      <button
        className={s.filterToggle}
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? <span>Hide Filter</span> : <span>Show Filter</span>}
      </button>
      {showFilter && (
        <Filter peaks={peaks} setSearchResults={setSearchResults} />
      )}
      <div className={s.peakContainer}>
        {loading && <div>Loading...</div>}
        {error && <ErrorPage />}

        {searchResults.length
          ? !!searchResults.length &&
            searchResults.map((peak) => <Peak key={peak.id} peak={peak} />)
          : !!peaks.length &&
            peaks.map((peak) => <Peak key={peak.id} peak={peak} />)}
      </div>
      <button>Next Page</button>
    </>
  );
};

export default PeakContainer;
