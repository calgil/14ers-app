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
import range from "../../assets/PeakDetails/range.svg";
import addPeak from "../../assets/PeakDetails/addPeak.svg";
import class1 from "../../assets/PeakDetails/class1.png";
import class2 from "../../assets/PeakDetails/class2.png";
import class2Plus from "../../assets/PeakDetails/class2Plus.png";
import class3 from "../../assets/PeakDetails/class3.png";
import class4 from "../../assets/PeakDetails/class4.png";
import class5 from "../../assets/PeakDetails/class5.png";

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

    const addDifficultyIcon = (str) => {
        switch (str) {
            case 'class 1':
                return class1;
            case 'class 2':
                return class2;
            case 'class 2+':
                return class2Plus;
            case 'class 3':
                return class3;
            case 'class 4':
                return class4;
            case 'class 5':
                return class5;
            default:
                break;
        }
        return str;
    }

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
                        <div className={s.addToClimbsBtn}>
                            <div className={s.iconContainer}>
                                <img src={addPeak} alt="add peak" />
                            </div>
                            <span>Add to My Climbs</span>
                        </div>
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
                                <div className={s.iconContainer}>
                                    <img src={elevation} alt="elevation" />
                                </div>
                                <span>Elevation: {peak.elevation} ft</span>
                            </div>
                            <div className={s.stat}>
                                <div className={s.iconContainer}>
                                    <img src={rank} alt="rank" />
                                </div>
                                <span>Rank: {peak.rank} of 57</span>
                            </div>
                            <div className={s.stat}>
                                <div className={s.iconContainer}>
                                    <img src={range} alt="range" />
                                </div>
                                <span>Range: {peak.range}</span>
                            </div>
                        </div>  
                    </div>
                    <div className={s.routesContainer}>
                        {
                        peak.routes && 
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
                                    <div 
                                        key={route._id}
                                        className={s.route}
                                    >
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
                                            <div className={s.routeDifficultyContainer}>
                                                <img src={addDifficultyIcon(route.difficulty)} alt="difficulty" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default PeakDetails;