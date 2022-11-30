import React from "react";
import s from "./TripReport.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import { formatDate } from "../../utilities/formatDate";

const TripReport = ({ report }) => {
  return (
    <div className={s.reportContainer}>
      <div className={s.reportHeader}>
        <div className={s.headerData}>
          Username: {capitalizeFirstLetters(report.userName)}
        </div>
        <div className={s.headerData}>Peak: {report.peakName}</div>
        <div className={s.headerData}>
          Route: {capitalizeFirstLetters(report.routeName)}
        </div>
        <div className={s.headerData}>
          Climbed: {formatDate(report.dateClimbed)}
        </div>
      </div>
      <div className={s.reportBody}>
        <div className={s.imgContainer}>
          <img src={report.photos[0].imageUrl} alt="" />
        </div>
        <div className={s.text}>
          <h4 className={s.title}>
            {capitalizeFirstLetters(report.title.toLowerCase())}
          </h4>
          <p>{report.details}</p>
          <p>Posted: {formatDate(report.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default TripReport;
