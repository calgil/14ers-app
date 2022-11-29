import React, { useState, useEffect, useContext } from "react";
import s from "./TripReportUpload.module.css";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import StarRating from "../StarRating/StarRating";
import Modal from "../Modal/Modal";
import UploadImage from "../UploadImage/UploadImage";
import { UserContext } from "../../App";
import { postTripReport } from "../../services";

const TripReport = ({ peak, close }) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const [tripReportData, setTripReportData] = useState({});
  const [imageName, setImageName] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    console.log("check", name, value);
    setTripReportData({ ...tripReportData, [name]: value });
    console.log("modal", tripReportData);
  };

  const setRating = (value) => {
    setTripReportData({ ...tripReportData, rating: value });
  };

  const createTripReport = async (event) => {
    event.preventDefault();
    if (!authService.isLoggedIn) {
      return navigate("/login");
    }

    const tripReport = {
      peakId: peak._id,
      routeId: tripReportData.route,
      userId: authService.id,
      dateClimbed: tripReportData.date || "",
      details: tripReportData.details || "",
      rating: tripReportData.rating || 1,
      photos: [{ url: imageName }],
    };
    console.log("to send", tripReport);

    // check for valid fields then send post request
    const report = await postTripReport(tripReport);
    console.log("respon", report);
  };
  return (
    <Modal close={close} modalName={"Trip Report"}>
      <form className={s.form} onSubmit={createTripReport}>
        <div>
          <UploadImage setImageName={setImageName} />
        </div>
        <div>
          <h5>14er: {peak.name}</h5>
          <label> Select a Route:</label>
          <select
            className={`${s.routeSelect} ${s.input}`}
            name="route"
            onChange={handleChange}
            required
          >
            <option value="">Please Choose a route</option>
            {peak.routes.map((route) => (
              <option key={route._id} value={route._id}>
                {capitalizeFirstLetters(route.name)}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          <label>Date:</label>
          <input
            className={`${s.date} ${s.input}`}
            name="date"
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
          />
          <label className={s.tripReport}>
            Trip Report:
            <textarea
              key={5}
              className={`${s.details} ${s.input}`}
              name="details"
              onChange={handleChange}
            />
          </label>
          <label>Rating:</label>
          <StarRating
            rating={tripReportData.rating || 0}
            setRating={setRating}
          />
          <input
            className={s.submitBtn}
            type="submit"
            value={
              authService.isLoggedIn ? "post report" : "click here to login"
            }
          />
        </div>
      </form>
    </Modal>
  );
};

export default TripReport;
