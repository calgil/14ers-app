import React, { useEffect, useState } from "react";
import s from "./TripReports.module.css";
import { getTripReports } from "../../services";
import TripReport from "../TripReport/TripReport";

const TripReports = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getTripReports()
      .then(setReports)
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={s.tripReports}>
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
