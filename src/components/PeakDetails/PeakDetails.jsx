import React, { useEffect, useState, useContext } from "react";
import s from "./PeakDetails.module.css";
import { 
    useParams,
    useNavigate,
 } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import { getPeakById } from "../../services";
import { UserContext } from "../../App";

const PeakDetails = () => {

    const { authService } = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [peak, setPeak] = useState();
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

    const editPeak = () => {
        navigate(`/peaks/edit/${id}`);
    }


    return (
        <div className={s.detailsBody}>
            {error && <ErrorPage />}
            {loading && <div>Loading...</div>}
            {
                peak && 
                <div className={s.peakDetails}>
                    {
                        authService.role === 'admin' &&
                        <div className={s.editPeak}>
                            <button 
                                className={s.editBtn}
                                onClick={editPeak}
                            >
                                Edit Peak
                            </button>
                        </div>
                    }
                    <h3>{peak.name}</h3>
                    <div 
                        className={s.imgContainer}
                        style={{ backgroundImage: `url("${peak.photo}")`}}
                    >
                    </div>
                    <div className={s.info}>
                        <div 
                            className={s.statsContainer}
                        >
                            <div className={s.stat}>
                                <span>Elevation</span>
                                <span>{peak.elevation}</span>
                            </div>
                            <div className={s.stat}>
                                <span>Rank</span>
                                <span>{peak.rank} of 57</span>
                            </div>
                            <div className={s.stat}>
                                <span>Range</span>
                                <span>{peak.range}</span>
                            </div>
                        </div>                       
                    </div>
                    <div 
                        className={s.routesContainer}
                    >
                        {
                            peak.routes && 
                            <>
                                <h3>Routes</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Route Name</th>
                                            <th>Mileage</th>
                                            <th>Gain</th>
                                            <th>Difficulty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {peak.routes.map((route) => (
                                            <tr key={route._id}>
                                                <td>{capitalizeFirstLetters(route.name)}</td>
                                                <td>{route.mileage}</td>
                                                <td>{route.gain}'</td>
                                                <td>{route.difficulty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default PeakDetails;