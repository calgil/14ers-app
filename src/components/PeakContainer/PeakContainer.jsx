import React, { useEffect, useState, useContext } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
// import { getAllPeaks } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";
import { UserContext } from "../../App";
// import {
//     useNavigation
// } from "react-router-dom";

const PeakContainer = () => {
    const { peakService } = useContext(UserContext);
    const [peaks, setPeaks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        peakService.getAllPeaks()
            .then((res) => {
                setPeaks(res);
                setLoading(false);
            })
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
                (peaks.length > 0 && (!loading && !error))
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