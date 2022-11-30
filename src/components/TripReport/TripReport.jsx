import React from "react";
import s from "./TripReport.module.css";

const TripReport = ({ report }) => {
  return (
    <div className={s.reportContainer}>
      <div className={s.reportHeader}>
        <div className={s.headerData}>{report.userName}</div>
        <div className={s.headerData}>{report.peakName}</div>
        <div className={s.headerData}>{report.routeName}</div>
        <div className={s.headerData}>{report.dateClimbed}</div>
      </div>
      <div className={s.reportBody}>
        <div className={s.imgContainer}>
          <img src={report.photos[0].imageUrl} alt="" />
        </div>
        <div className={s.text}>
          <h4>{report.title}</h4>
          <p>{report.details}</p>
          <p>{report.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default TripReport;
