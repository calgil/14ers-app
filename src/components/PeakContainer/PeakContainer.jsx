import React, { useEffect, useState } from "react";
import Peak from "../Peak/Peak";
import s from "./PeakContainer.module.css";
import { getAllPeaks } from "../../services";
import {
} from "react-router-dom";

const PeakContainer = () => {

    const [peaks, setPeaks] = useState([]);

    useEffect(() => {
        getAllPeaks()
            .then((res) => setPeaks(res))
    }, []);


    return (
        <div className={s.peakContainer}>
            {
                peaks.length ? peaks.map((peak) => (
                    <Peak
                        key={peak.id}
                        peak={peak}
                    />
                ))
                : <div>Something went wrong. No peaks.</div>
            }
        </div>
    );
};

export default PeakContainer;