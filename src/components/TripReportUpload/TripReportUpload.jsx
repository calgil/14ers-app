import React, { useState, useContext } from "react";
import s from "./TripReportUpload.module.css";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import StarRating from "../StarRating/StarRating";
import Modal from "../Modal/Modal";
import UploadImage from "../UploadImage/UploadImage";
import InputBase from "../InputBase/InputBase";
import { UserContext } from "../../App";
import { postTripReport } from "../../services";

const INIT_SUCCESS = {
  show: false,
  message: "Report posted!",
};
const INIT_FAILURE = {
  show: false,
  message: "Something went wrong",
};

const inputData = [
  {
    key: 1,
    type: "text",
    name: "title",
    errorMsg: "Please enter a title",
  },
  {
    key: 2,
    type: "date",
    name: "dateClimbed",
    errorMsg: "Please enter a date",
  },
  {
    key: 3,
    type: "text",
    name: "details",
    errorMsg: "Please enter details",
  },
];

const INIT_REPORT = { title: "", dateClimbed: "", details: "" };

const TripReportUpload = ({ peak, close }) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const [tripReportData, setTripReportData] = useState(INIT_REPORT);
  const [imageName, setImageName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({ _id: "", name: "" });

  const [showInputError, setShowInputError] = useState(false);
  const [inputError, setInputError] = useState({});
  const [photoError, setPhotoError] = useState(false);

  const [success, setSuccess] = useState(INIT_SUCCESS);
  const [failure, setFailure] = useState(INIT_FAILURE);

  const findRoute = (id) => {
    const route = peak.routes.filter((route) => route._id === id);
    if (!route) {
      return;
    }
    setSelectedRoute(route[0]);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "route") {
      return findRoute(value);
    }
    setTripReportData({ ...tripReportData, [name]: value });
  };

  const setRating = (value) => {
    setTripReportData({ ...tripReportData, rating: value });
  };

  const checkPhoto = () => {
    if (!imageName.length) {
      return setPhotoError(true);
    }
    setPhotoError(false);
  };

  const updateError = (key, value) => {
    setInputError((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const checkErrorBeforeSave = (data) => {
    let isError = false;
    Object.keys(data).forEach((key) => {
      if (!data[key] || data[key].length === 0) {
        updateError(key, true);
        isError = true;
      }
      if (data[key]) {
        updateError(key, false);
      }
    });
    return isError;
  };

  const closeModal = () => {
    setTimeout(() => {
      close();
    }, 2000);
  };

  const saveTripReport = async (data) => {
    const report = await postTripReport(data);
    if (!report) {
      return setFailure({ ...failure, show: true });
    }
    setSuccess({ ...success, show: true });
    closeModal();
  };

  const createTripReport = (event) => {
    event.preventDefault();
    if (!authService.isLoggedIn) {
      return navigate("/login");
    }
    if (!selectedRoute) {
      return updateError("route", true);
    }
    checkPhoto();

    const tripReport = {
      peakId: peak._id,
      routeId: selectedRoute._id,
      routeName: selectedRoute.name,
      userId: authService.id,
      userName: authService.name,
      peakName: peak.name,
      dateClimbed: tripReportData.dateClimbed || "",
      createdAt: Date.now(),
      title: tripReportData.title,
      details: tripReportData.details || "",
      rating: tripReportData.rating || 0,
      photos: [{ url: imageName || "" }],
    };

    const isError = checkErrorBeforeSave(tripReport);
    if (isError) {
      return setShowInputError(true);
    }
    saveTripReport(tripReport);
  };

  return (
    <Modal
      close={close}
      modalName={"Trip Report"}
      success={success}
      failure={failure}
    >
      <div className={s.form}>
        <div className={s.column}>
          <UploadImage
            loggedIn={authService.isLoggedIn}
            setImageName={setImageName}
            error={photoError}
          />
        </div>
        <div className={s.column}>
          <h5>14er: {peak.name}</h5>
          <label> Select a Route:</label>
          {inputError.routeName && (
            <div className={s.errorMsg}>Route is required</div>
          )}
          <select
            className={
              inputError.routeName ? `${s.input} ${s.error}` : `${s.input}`
            }
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
          {inputData.map((data) => (
            <InputBase
              key={data.key}
              data={data}
              onChange={handleChange}
              error={inputError[data.name]}
              showError={showInputError}
            />
          ))}
          <label>Rating:</label>
          <StarRating
            rating={tripReportData.rating || 0}
            setRating={setRating}
            showError={showInputError}
            error={inputError["rating"] || false}
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
