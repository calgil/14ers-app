import React, { useEffect, useState } from "react";
import s from "./TripReports.module.css";
import { getTripReports } from "../../services";
import TripReport from "../TripReport/TripReport";
import TripReportUpload from "../TripReportUpload/TripReportUpload";
import Modal from "../Modal/Modal";

const TripReports = () => {
  const [reports, setReports] = useState([]);
  const [showTripReportModal, setShowTripReportModal] = useState(false);

  useEffect(() => {
    getTripReports()
      .then(setReports)
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    setShowTripReportModal(true);
    console.log("click", showTripReportModal);
  };

  const handleNameChange = ({ target: { value } }) => {
    console.log("new name", value);
  };

  return (
    <div className={s.tripReports}>
      <button onClick={handleClick} className={s.addReportBtn}>
        Add new report
      </button>
      {/* <Modal
      close={close}
      modalName={"Trip Report"}
      success={success}
      failure={failure}
    ></Modal> */}
      {showTripReportModal && (
        <Modal
          modalName={"Peak Name"}
          close={() => setShowTripReportModal(!false)}
          success={{ show: false, successMessage: "Success" }}
          failure={{ show: false, failureMessage: "Failure" }}
        >
          <input
            type="text"
            placeholder="enter peak name"
            onChange={handleNameChange}
          />
        </Modal>
        // <TripReportUpload
        //   // peak={peak}
        //   close={() => setShowTripReportModal(!showTripReportModal)}
        // />
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
