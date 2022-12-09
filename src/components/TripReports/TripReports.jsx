import React, { useEffect, useState } from "react";
import s from "./TripReports.module.css";
import { getTripReports } from "../../services";
import TripReport from "../TripReport/TripReport";
import TripReportUpload from "../TripReportUpload/TripReportUpload";
import PeakSelector from "../PeakSelector/PeakSelector";

const TripReports = () => {
  const [selectedPeak, setSelectedPeak] = useState({});

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getTripReports()
      .then(setReports)
      .catch((err) => console.error(err));
  }, []);

  const openModal = () => {
    setShowUploadModal(true);
  };

  const closeModal = () => {
    setShowUploadModal(!showUploadModal);
  };

  const updatePeak = (peak) => {
    if (!peak) {
      return;
    }
    console.log("update", peak);
    setSelectedPeak(peak);
  };

  return (
    <div className={s.tripReports}>
      <button onClick={openModal} className={s.addReportBtn}>
        Add new report
      </button>
      {showUploadModal && (
        <TripReportUpload peak={selectedPeak} close={closeModal}>
          <PeakSelector updatePeak={updatePeak} />
        </TripReportUpload>
      )}
      {!!reports.length && (
        <div className={s.reportTable}>
          {reports.map((report) => (
            <TripReport key={report._id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripReports;
