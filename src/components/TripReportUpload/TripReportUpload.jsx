import React, { useState, useContext } from "react";
import s from "./TripReportUpload.module.css";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import StarRating from "../StarRating/StarRating";
import Modal from "../Modal/Modal";
import UploadImage from "../UploadImage/UploadImage";
import { UserContext } from "../../App";
import { postTripReport } from "../../services";

const TripReportUpload = ({ peak, close }) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const [tripReportData, setTripReportData] = useState({});
  const [imageName, setImageName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  const findRoute = (id) => {
    const route = peak.routes.filter((route) => route._id === id);
    if (!route) {
      return;
    }
    setSelectedRoute(route[0]);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "route") {
      findRoute(value);
    }
    setTripReportData({ ...tripReportData, [name]: value });
  };

  const setRating = (value) => {
    setTripReportData({ ...tripReportData, rating: value });
  };

  const createTripReport = async (event) => {
    event.preventDefault();
    if (!authService.isLoggedIn) {
      return navigate("/login");
    }
    console.log("pre send", tripReportData);
    const tripReport = {
      peakId: peak._id,
      routeId: tripReportData.route,
      routeName: selectedRoute.name,
      userId: authService.id,
      userName: authService.name,
      peakName: peak.name,
      dateClimbed: tripReportData.date || "",
      createdAt: Date.now(),
      title: tripReportData.title,
      details: tripReportData.details || "",
      rating: tripReportData.rating || 0,
      photos: [{ url: imageName }],
    };
    console.log("to send", tripReport);

    // check for valid fields then send post request
    const report = await postTripReport(tripReport);
    if (!report) {
      console.log("error!!");
    }
    console.log("respon", report);
    console.log("respond", report.success);
  };
  return (
    <Modal close={close} modalName={"Trip Report"}>
      <div className={s.form}>
        <div className={s.column}>
          <UploadImage
            loggedIn={authService.isLoggedIn}
            setImageName={setImageName}
          />
        </div>
        <div className={s.column}>
          <h5>14er: {peak.name}</h5>
          <label>
            {" "}
            Title:
            <input
              className={s.input}
              name="title"
              type="text"
              onChange={handleChange}
              required
            />
          </label>
          <label> Select a Route:</label>
          <select
            className={`${s.routeSelect} ${s.input}`}
            name="route"
            autoFocus
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
            required
          />
          <label className={s.tripReport}>
            Trip Report:
            <textarea
              key={5}
              className={`${s.details} ${s.input}`}
              name="details"
              onChange={handleChange}
              required
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
            onClick={createTripReport}
            value={
              authService.isLoggedIn ? "post report" : "click here to login"
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default TripReportUpload;
