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

const INIT_ERROR = {
  photo: false,
  route: false,
  title: false,
  date: false,
  details: false,
  rating: false,
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
    name: "date",
    errorMsg: "Please enter a date",
  },
  {
    key: 3,
    type: "text",
    name: "details",
    errorMsg: "Please enter details",
  },
];

const INIT_REPORT = { title: "", date: "", details: "" };

const TripReportUpload = ({ peak, close }) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const [tripReportData, setTripReportData] = useState(INIT_REPORT);
  const [imageName, setImageName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({ _id: "", name: "" });

  const [showInputError, setShowInputError] = useState(false);
  const [inputError, setInputError] = useState(INIT_ERROR);

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

  const checkErrorBeforeSave = () => {
    let isError = false;
    Object.keys(tripReportData).forEach((key) => {
      if (key === "photos" && !tripReportData[key][0].url) {
        setInputError({ ...inputError, photos: true });
        isError = true;
      }
      if (!tripReportData[key] || tripReportData[key].length === 0) {
        setInputError({ ...inputError, [`${key}`]: true });
        isError = true;
      }
    });
    // Object.keys(data).forEach((key) => {
    //   if (key === "photos" && !data[key][0].url) {
    //     console.log("check photo");
    //     // return (errorObj = { ...errorObj, [key]: "Required" });
    //     setInputError({ ...inputError, [key]: "Required" });
    //     return console.log("in photo", inputError);
    //   }
    //   if (!data[key] || data[key].length === 0) {
    //     console.log("empty val", key);
    //     setInputError({ ...inputError, [key]: "Required" });
    //     // errorObj = { ...errorObj, [key]: "Required" };
    //     isError = true;
    //   }
    // });
    // setInputError({ ...errorObj });
    console.log("ahhhhhh!!!", inputError);
    return isError;
  };

  const handleBlur = () => {
    // check error
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
    console.log("respon", report);
    console.log("respond", report.success);
    console.log("success", success);
  };

  const createTripReport = (event) => {
    event.preventDefault();
    if (!authService.isLoggedIn) {
      return navigate("/login");
    }
    if (!selectedRoute) {
      console.log("bad route");
      setInputError({ ...inputError, route: true });
    }

    const tripReport = {
      peakId: peak._id,
      routeId: selectedRoute._id,
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

    const isError = checkErrorBeforeSave(tripReport);
    if (isError) {
      setShowInputError(true);
      return console.log("there is an error! Check values", inputError);
    }
    // saveTripReport(tripReport);
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
          />
        </div>
        <div className={s.column}>
          <h5>14er: {peak.name}</h5>
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
          {inputData.map((data) => (
            <InputBase
              key={data.key}
              data={data}
              onChange={handleChange}
              error={!inputError[data.name]}
              showError={showInputError}
              // onBlur={checkErrorBeforeSave}
            />
          ))}
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
