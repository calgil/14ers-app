import React, { useEffect, useState, useContext } from "react";
import s from "./PeakDetails.module.css";
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import { UserContext } from "../../App";
import { convertToSentence } from "../../utilites/convertToSentence";

const PeakDetails = () => {
    const { peakService } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [peakData, setPeakData] = useState();
    let peakId = useParams();


    useEffect(() => {
        setLoading(true);
        const { id } = peakId;
        const peak = peakService.getPeakById(id);
        if (!peak) {
            setLoading(false);
            setError(true);
        }
        if (peak) {
            console.log('peak', peak);
            setPeakData(peak);
            setLoading(false);
        }
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
                    <div className={s.info}>
                        <div 
                            className={s.statsContainer}
                        >
                            <div className={s.stat}>
                                <span>Elevation</span>
                                <span>{peakData.elevation}</span>
                            </div>
                            <div className={s.stat}>
                                <span>Rank</span>
                                <span>{peakData.rank} of 57</span>
                            </div>
                            <div className={s.stat}>
                                <span>Range</span>
                                <span>{peakData.range}</span>
                            </div>
                        </div>                       
                    </div>
                    <div 
                        className={s.routesContainer}
                    >
                        {
                            peakData.routes.length > 0 &&
                            peakData.routes.map((route) => (
                                <div key={route._id} className={s.route}>
                                    <p>{convertToSentence(route.name)}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default PeakDetails;