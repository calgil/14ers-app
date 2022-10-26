import React, { useEffect, useState } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
import Navbar from "../Navbar/Navbar";

const PeakContainer = () => {
  const [peaks, setPeaks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [isShown, setIsShown] = useState(false);

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

  // const filterAscending = () => {
  //     console.log('filter tallest first');
  // }

  // const filterDescending = () => {
  //     console.log('filter smallest first');
  // }

  return (
    <>
      {/* <Navbar /> */}
      {/* <div 
            className={s.filterController}
            onMouseEnter={() => setIsShown(true)}
            // onMouseLeave={() => setIsShown(false)}
            >
            <h5>Filter</h5>
            {isShown &&
                        <div
                            className={s.filter}
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                        >
                            <div className={s.filterRow}>
                                <i className="fa fa-caret-up"></i> 
                                <span onClick={filterAscending}>
                                    Sort Ascending
                                </span>
                            </div>
                            <div className={s.filterRow}>
                                <i className="fa fa-caret-down"></i> 
                                <span onClick={filterDescending}>
                                    Sort Descending
                                </span>
                            </div>
                        </div>
                    }
        </div> */}
      <div
        className={s.peakContainer}
        // onClick={() => setIsShown(false)}
      >
        {loading && <div>Loading...</div>}
        {error && <ErrorPage />}

        {!!peaks.length &&
          !loading &&
          !error &&
          peaks.map((peak) => <Peak key={peak.id} peak={peak} />)}
      </div>
    </>
  );
};

export default PeakContainer;
