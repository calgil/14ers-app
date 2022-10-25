import React, { useEffect, useState, useContext } from "react";
import s from "./PeakDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import { getPeakById } from "../../services";
import { UserContext } from "../../App";
import AddPhoto from "../Admin/AddPhoto/AddPhoto";
import elevation from "../../assets/PeakDetails/elevation.svg";
import rank from "../../assets/PeakDetails/rank.svg";
import range from "../../assets/PeakDetails/range.svg";
import addPeak from "../../assets/PeakDetails/addPeak.svg";
import { isNameInArray } from "../../utilities/isNameInArray";
import RouteTable from "./RouteTable/RouteTable";

const PeakDetails = () => {
  const { authService, updateAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [peak, setPeak] = useState();
  const [addPhoto, setAddPhoto] = useState(false);
  const [isClimbed, setIsClimbed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn);
  // const [loginMessage, setLoginMessage] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeakById(id)
      .then(setPeak)
      .then(setLoading(false))
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [id]);

  useEffect(() => {
    if (!peak) {
      return;
    }
    if (!isNameInArray(authService.peaksClimbed, peak.name)) {
      return;
    }
    setIsClimbed(true);
  }, [peak, authService.peaksClimbed]);

  const addToPeaksClimbed = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const newPeak = {
      name: peak.name,
      dateClimbed: Date.now(),
    };

    const peaksClimbed = authService.peaksClimbed;

    const found = isNameInArray(peaksClimbed, peak.name);
    if (found) {
      setIsClimbed(true);
      console.log("already climbed!!");
      return;
    }
    if (!found) {
      const updatePeaksClimbed = [...authService.peaksClimbed, newPeak];
      console.log("new arr", updatePeaksClimbed);
      authService
        .addUserClimbedPeak(updatePeaksClimbed)
        .then(() => {
          updateAuth();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={s.detailsBody}>
      {error && <ErrorPage />}
      {loading && <div>Loading...</div>}
      {peak && (
        <div className={s.peakDetails}>
          <div className={s.addBtnBar}>
            <h3 className={s.peakName}>{peak.name}</h3>
            {isClimbed ? (
              <div className={`${s.climbedStatus} ${s.climbBtn}`}>
                <span>You Climbed this Peak!</span>
              </div>
            ) : (
              <button
                className={`${s.addToClimbsBtn} ${s.climbBtn}`}
                onClick={addToPeaksClimbed}
                // disabled={!isLoggedIn}
              >
                <div className={s.iconContainer}>
                  <img src={addPeak} alt="add peak" />
                </div>
                <span>
                  {isLoggedIn ? "I Climbed this!" : "Login to Add to Climbs"}
                </span>
              </button>
            )}
          </div>
          <div className={s.mainInfo}>
            <div className={s.peakPhoto}>
              {authService.role === "admin" && (
                <button onClick={() => setAddPhoto(true)}> Add Photo</button>
              )}
              {addPhoto && <AddPhoto />}
              <div
                className={s.imgContainer}
                style={{ backgroundImage: `url("${peak.photos[0].url}")` }}
              ></div>
            </div>
            <div className={s.statsContainer}>
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
          {peak.routes && <RouteTable peakRoutes={peak.routes} />}
        </div>
      )}
    </div>
  );
};

export default PeakDetails;
