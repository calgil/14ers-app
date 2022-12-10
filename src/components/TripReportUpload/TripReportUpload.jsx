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

const TripReportUpload = ({ children, peak, close }) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const [tripReportData, setTripReportData] = useState(INIT_REPORT);
  const [imageName, setImageName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({ _id: "", name: "" });

  const [showInputError, setShowInputError] = useState(false);
  const [inputError, setInputError] = useState({});
  const [photoError, setPhotoError] = useState(true);

  const [success, setSuccess] = useState(INIT_SUCCESS);
  const [failure, setFailure] = useState(INIT_FAILURE);

  const updateImage = (imgName) => {
    if (!imgName.length) {
      setPhotoError(true);
    }
    setImageName(imgName);
    setPhotoError(false);
  };

  const changeRoute = ({ target: { value } }) => {
    if (!value.length) {
      return;
    }
    const route = peak.routes.find((route) => route._id === value);
    console.log("route!", route);
    if (!route) {
      return;
    }
    setSelectedRoute(route);
  };

  const handleChange = ({ target: { name, value } }) => {
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
    if (photoError) {
      return;
    }
    const report = await postTripReport(data);
    if (!report) {
      return setFailure((prevState) => ({ ...prevState, show: true }));
    }
    setSuccess((prevState) => ({ ...prevState, show: true }));
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
      peakId: peak.id || peak._id,
      routeId: selectedRoute._id,
      routeName: selectedRoute.name,
      userId: authService.id,
      userName: authService.name,
      peakName: peak.name,
      dateClimbed: tripReportData.dateClimbed ?? "",
      createdAt: Date.now(),
      title: tripReportData.title,
      details: tripReportData.details ?? "",
      rating: tripReportData.rating ?? 0,
      photos: [{ url: imageName ?? "" }],
    };

    const isError = checkErrorBeforeSave(tripReport);
    if (isError || photoError) {
      console.log("error no send", tripReport);
      return setShowInputError(true);
    }
    console.log("sending!!");
    saveTripReport(tripReport);
  };

  return (
    <Modal close={close} modalName={"Trip Report"}>
      <div className={s.form}>
        <div className={s.column}>
          <UploadImage
            loggedIn={authService.isLoggedIn}
            updateImage={updateImage}
            showError={showInputError}
            error={photoError}
          />
        </div>
        <div className={s.column}>
          {children}
          <label className={s.routeLabel}> Select a Route</label>
          {inputError.routeName && (
            <div className={s.errorMsg}>Route is required</div>
          )}
          <select
            className={
              inputError.routeName ? `${s.input} ${s.error}` : `${s.input}`
            }
            name="route"
            autoFocus
            onChange={changeRoute}
            required
          >
            {peak.routes ? (
              <option value="">Please Choose a route</option>
            ) : (
              <option value="">Please Choose Peak</option>
            )}

            {peak.routes
              ? peak.routes.map((route) => (
                  <option key={route._id} value={route._id}>
                    {capitalizeFirstLetters(route.name)}
                  </option>
                ))
              : ""}
            {/* <option value="other">
              Other (please don't click me) future feature
            </option> */}
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
      <div className={success.show ? `${s.success} ${s.show}` : `${s.success}`}>
        {success.message}
      </div>
      <div className={failure.show ? `${s.failure} ${s.show}` : `${s.failure}`}>
        {failure.message}
      </div>
    </Modal>
  );
};

export default TripReportUpload;
