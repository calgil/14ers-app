import React, { useContext, useState } from "react";
import s from "./TripReport.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import { formatDate } from "../../utilities/formatDate";
import { UserContext } from "../../App";
import {
  updateTripReport,
  deletePhoto,
  deleteTripReport,
} from "../../services";

const TripReport = ({ report, getNewReports }) => {
  const { authService } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(report.title);
  const [details, setDetails] = useState(report.details);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const changeTitle = ({ target: { value } }) => {
    setTitle(value);
  };

  const changeDetails = ({ target: { value } }) => {
    setDetails(value);
  };

  const editReport = (e) => {
    e.preventDefault();
    const reportText = {
      title,
      details,
    };
    updateTripReport(report._id, reportText)
      .then(() => {
        getNewReports();
        toggleEdit();
      })
      .catch((err) => console.error(err));
  };

  const deleteReport = () => {
    deleteTripReport(report._id)
      .then(() => {
        deletePhoto(report.photos[0].url);
        getNewReports();
      })
      .catch((err) => console.error(err));
  };

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
        {editMode ? (
          <form className={s.editForm} onSubmit={editReport}>
            <div>
              <label>Title</label>
              <input
                className={s.editInput}
                placeholder={capitalizeFirstLetters(report.title)}
                onChange={changeTitle}
              />
            </div>
            <label>Details</label>
            <textarea
              className={s.editInput}
              placeholder={report.details}
              onChange={changeDetails}
            />
            <input type="submit" value="Edit Report" />
          </form>
        ) : (
          <div className={s.text}>
            <h4 className={s.title}>
              {capitalizeFirstLetters(report.title.toLowerCase())}
            </h4>
            <p>{report.details}</p>
            <p>Posted: {formatDate(report.createdAt)}</p>
          </div>
        )}
        <div className={s.btnContainer}>
          {report.userId === authService.id && (
            <button className={s.editBtn} onClick={toggleEdit}>
              <i className="fa fa-edit"></i>
            </button>
          )}
          {(report.userId === authService.id ||
            authService.role === "admin") && (
            <button
              className={`${s.editBtn} ${s.deleteBtn}`}
              onClick={deleteReport}
            >
              <i className="fa fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripReport;
