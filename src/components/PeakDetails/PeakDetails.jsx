import React, { useEffect, useState, useContext } from "react";
import s from "./PeakDetails.module.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import ErrorPage from "../ErrorPage/ErrorPage";
import AddPhoto from "../Admin/AddPhoto/AddPhoto";
import RouteTable from "./RouteTable/RouteTable";
import StatsContainer from "./StatsContainer/StatsContainer";
import { getPeakById } from "../../services";
import { isNameInArray } from "../../utilities/isNameInArray";
import AddToClimbLog from "./AddToClimbLog/AddToClimbLog";

const PeakDetails = () => {
  const { authService } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [peak, setPeak] = useState();
  const [addPhoto, setAddPhoto] = useState(false);
  const [isClimbed, setIsClimbed] = useState(false);
  const isLoggedIn = authService.isLoggedIn;
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

  return (
    <div className={s.detailsBody}>
      {error && <ErrorPage />}
      {loading && <div>Loading...</div>}
      {peak && (
        <div className={s.peakDetails}>
          <div className={s.addBtnBar}>
            <h3 className={s.peakName}>{peak.name}</h3>
            <AddToClimbLog
              name={peak.name}
              isLoggedIn={isLoggedIn}
              isClimbed={isClimbed}
            />
          </div>
          <div className={s.mainInfo}>
            <div className={s.amazonImg}>
              <img
                crossOrigin="anonymous"
                src="http://localhost:5001/api/v1/peaks/images/e4684477f85731e583c2c4706ce0a76a"
                alt="amazon"
              />
            </div>
            <div className={s.peakPhoto}>
              <button onClick={() => setAddPhoto(true)}> Add Photo</button>
              {/* {authService.role === "admin" && (
                <button onClick={() => setAddPhoto(true)}> Add Photo</button>
              )} */}
              {addPhoto && <AddPhoto />}
              <div
                className={s.imgContainer}
                style={{ backgroundImage: `url("${peak.photos[0].url}")` }}
              ></div>
            </div>
            <StatsContainer peak={peak} />
          </div>
          {peak.routes && <RouteTable peakRoutes={peak.routes} />}
        </div>
      )}
    </div>
  );
};

export default PeakDetails;
