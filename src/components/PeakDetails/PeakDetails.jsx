import React, { useEffect, useState, useContext } from "react";
import s from "./PeakDetails.module.css";
import { 
    useParams,
    // useNavigate,
 } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import { getPeakById } from "../../services";
import { UserContext } from "../../App";
import AddPhoto from "../Admin/AddPhoto/AddPhoto";
import elevation from "../../assets/PeakDetails/elevation.svg";
import rank from "../../assets/PeakDetails/rank.svg";
import range from "../../assets/PeakDetails/range.svg"

const PeakDetails = () => {

    const { authService } = useContext(UserContext);
    // const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [peak, setPeak] = useState();
    const [addPhoto, setAddPhoto] = useState(false);
    let { id } = useParams();


    useEffect(() => {
        setLoading(true);
        getPeakById(id)
            .then(setPeak)
            .then(setLoading(false))
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, [id]);

    // const editPeak = () => {
    //     // navigate(`/peaks/edit/${id}`);
    //     setAddPhoto(true)
    // }


    return (
        <div className={s.detailsBody}>
            {error && <ErrorPage />}
            {loading && <div>Loading...</div>}
            {
                peak && 
                <div className={s.peakDetails}>
                    <div className={s.addBtnBar}>
                        <h3 className={s.peakName}>{peak.name}</h3>
                        <button
                            className={s.addToClimbsBtn}
                        >
                            Add to My Climbs
                        </button>
                    </div>
                    <div 
                        className={s.mainInfo}
                    >
                        <div className={s.peakPhoto}>
                            {
                                authService.role === 'admin' &&
                                <button
                                    onClick={() => setAddPhoto(true)}
                                > Add Photo
                                </button>
                            } 
                            { addPhoto &&
                            <AddPhoto 
                            />
                            }
                            <div 
                                className={s.imgContainer}
                                style={{ backgroundImage: `url("${peak.photos[0].url}")`}}
                            >
                            </div>
                        </div>
                        <div 
                            className={s.statsContainer}
                        >
                            <div className={s.stat}>
                                <div className={s.statIconContainer}>
                                    <img src={elevation} alt="elevation" />
                                </div>
                                <span>Elevation: {peak.elevation} ft</span>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statIconContainer}>
                                    <img src={rank} alt="rank" />
                                </div>
                                <span>Rank: {peak.rank}</span>
                            </div>
                            <div className={s.stat}>
                                <div className={s.statIconContainer}>
                                    <img src={range} alt="range" />
                                </div>
                                <span>Range: {peak.range}</span>
                            </div>
                        </div>  
                    </div>
                    <div className={s.routesContainer}>
                        {
                            peak.routes && 
                            <>
                                <h3>Routes</h3>
                                <div className={s.routeTable}>
                                    <div className={`${s.routeHeader} ${s.route}`}>
                                        <div className={s.routeName}>
                                            Name
                                        </div>
                                        <div className={s.routeStat}>
                                            Mileage
                                        </div>
                                        <div className={s.routeStat}>
                                            Gain
                                        </div>
                                        <div className={s.routeStat}>
                                            Difficulty
                                        </div>
                                    </div>
                                    {peak.routes.map((route) => (
                                        <div className={s.route}>
                                            <div className={s.routeName}>
                                                {capitalizeFirstLetters(route.name)}
                                            </div>
                                            <div className={s.routeStat}>
                                                {route.mileage} miles
                                            </div>
                                            <div className={s.routeStat}>
                                                {route.gain}'
                                            </div>
                                            <div className={s.routeStat}>
                                                {route.difficulty}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default PeakDetails;