import React, { useEffect, useState, useContext } from "react";
import s from "./PeakDetails.module.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import ErrorPage from "../ErrorPage/ErrorPage";
import AddPhoto from "../Admin/AddPhoto/AddPhoto";
import RouteTable from "../RouteTable/RouteTable";
import StatsContainer from "../StatsContainer/StatsContainer";
import AddToClimbLog from "../AddToClimbLog/AddToClimbLog";
import Modal from "../Modal/Modal";
import { getPeakById } from "../../services";
import { isNameInArray } from "../../utilities/isNameInArray";
import addPeak from "../../assets/PeakDetails/addPeak.svg";
import TripReport from "../TripReport/TripReport";
import { getPhotoUrl } from "../../services";

const PeakDetails = () => {
  const { authService } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [peak, setPeak] = useState();
  const [addPhoto, setAddPhoto] = useState(false);
  const [isClimbed, setIsClimbed] = useState(false);

  const [showTripReportModal, setShowTripReportModal] = useState(false);

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

  // const tripReportInputs = [
  //   { key: 1, type: "text", name: "title", errorMsg: "Please enter a title" },
  //   { key: 2, type: "text", name: "rating", errorMsg: "Please enter a rating" },
  //   {
  //     key: 3,
  //     type: "text",
  //     name: "description",
  //     errorMsg: "Please enter a description",
  //   },
  // ];

  return (
    <div className={s.detailsBody}>
      {error && <ErrorPage />}
      {loading && <div>Loading...</div>}
      {authService.role === "admin" && (
        <button onClick={() => setAddPhoto(!addPhoto)}>Add Photo</button>
      )}
      {addPhoto && (
        <AddPhoto peak={peak} toggleAddPhoto={() => setAddPhoto(!addPhoto)} />
      )}
      {peak && (
        <div className={s.peakDetails}>
          <div className={s.addBtnBar}>
            <h3 className={s.peakName}>{peak.name}</h3>
            <AddToClimbLog
              peak={peak}
              isLoggedIn={isLoggedIn}
              isClimbed={isClimbed}
            />
          </div>
          <div className={s.mainInfo}>
            <div className={s.peakPhoto}>
              <img src={peak.photos[0].imageUrl} alt="peak" />
            </div>
            <StatsContainer peak={peak} />
          </div>
          {peak.routes && <RouteTable peakRoutes={peak.routes} />}
        </div>
      )}
      <div className={s.reportsHeader}>
        <div>Trip Reports</div>
        <button
          className={s.addReportBtn}
          onClick={() => setShowTripReportModal(true)}
        >
          <div className={s.iconContainer}>
            <img src={addPeak} alt="add" />
          </div>
          Add Trip Report
        </button>
      </div>

      {showTripReportModal && (
        <TripReport
          peak={peak}
          close={() => setShowTripReportModal(!showTripReportModal)}
        />
      )}
    </div>
  );
};

export default PeakDetails;
