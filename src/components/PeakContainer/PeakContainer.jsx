import React, { useEffect, useState } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
// import {
//     useNavigation
// } from "react-router-dom";

const PeakContainer = () => {
    const [peaks, setPeaks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        getAllPeaks()
            .then((res) => {
                setLoading(true)
                setPeaks(res)
                setLoading(false)
            })
            .catch(() => setError(true));
    }, []);


    return (
        <div className={s.peakContainer}>
            {/* gotta figure out a better way to do loading/error messages */}
            {
                !!peaks.length && peaks.map((peak) => (
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