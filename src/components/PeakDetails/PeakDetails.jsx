import React, { useEffect, useState } from "react";
import s from "./PeakDetails.module.css";
import { useParams } from "react-router-dom";
import { getPeakData } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";

const PeakDetails = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [peakData, setPeakData] = useState();
    let peakId = useParams();


    useEffect(() => {
        setLoading(true);
        const { id } = peakId;
        getPeakData(id)
            .then((res) => {
                setPeakData(res);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, []);

    return (
        <div className={s.detailsBody}>
            {error && <ErrorPage />}
            {loading && <div>Loading...</div>}
            {
                peakData && 
                <div 
                    className={s.peakDetails}

                >
                    <h3>{peakData.name}</h3>
                    <div 
                        className={s.imgContainer}
                        style={{ backgroundImage: `url("${peakData.photo}")`}}
                    >
                    </div>
                    <div
                        className={s.info}
                    >
                        <div 
                            className={s.statsContainer}
                        >
                            <div 
                                className={s.stat}
                            >
                                <span>Elevation</span>
                                <span>{peakData.elevation}</span>
                            </div>
                            <div 
                                className={s.stat}
                            >
                                <span>Rank</span>
                                <span>{peakData.rank} of 57</span>
                            </div>
                            <div 
                                className={s.stat}
                            >
                                <span>Range</span>
                                <span>{peakData.range}</span>
                            </div>
                        </div>                       
                    </div>
                </div>
            }
        </div>
    )
}

export default PeakDetails;