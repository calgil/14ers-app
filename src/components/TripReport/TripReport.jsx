import React, { useState } from "react";
import s from "./TripReport.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import StarRating from "../StarRating/StarRating";

const TripReport = ({ peak }) => {
  const [tripReportData, setTripReportData] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    console.log("check", name, value);
    setTripReportData({ ...tripReportData, [name]: value });
    console.log("modal", tripReportData);
  };

  const setRating = (value) => {
    setTripReportData({ ...tripReportData, rating: value });
  };

  const postTripReport = (e) => {
    console.log("send", tripReportData);
    e.preventDefault();
  };
  return (
    <form className={s.form} onSubmit={postTripReport}>
      <h5>14er: {peak.name}</h5>
      <label> Select a Route:</label>
      <select
        className={`${s.routeSelect} ${s.input}`}
        name="route"
        onChange={handleChange}
      >
        <option value="">Please Choose a route</option>
        {peak.routes.map((route) => (
          <option key={route._id} value={route.name}>
            {capitalizeFirstLetters(route.name)}
          </option>
        ))}
        <option value="other">Other</option>
      </select>
      <label>Date:</label>
      <input
        className={`${s.date} ${s.input}`}
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={handleChange}
      />
      <label>Trip Report:</label>
      <textarea
        key={5}
        className={`${s.details} ${s.input}`}
        name="details"
        onChange={handleChange}
      />
      <label>Rating:</label>
      <StarRating rating={tripReportData.rating || 0} setRating={setRating} />
      <input className={s.submitBtn} type="submit" value="Add Trip Report" />
    </form>
  );
};

export default TripReport;
