import React, { useEffect, useState } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";

const PeakContainer = () => {
    const [peaks, setPeaks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
        <div className={s.peakContainer}>
            {loading && <div>Loading...</div>}
            {error && <ErrorPage />}
            {
                (!!peaks.length && (!loading && !error))
                    && peaks.map((peak) => (
                        <Peak
                            key={peak.id}
                            peak={peak}
                        />
                ))
            }
        </div>
    );
};

export default PeakContainer;