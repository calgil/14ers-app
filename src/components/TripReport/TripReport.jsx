import React, { useState, useEffect } from "react";
import s from "./TripReport.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";
import StarRating from "../StarRating/StarRating";
import Modal from "../Modal/Modal";
import UploadImage from "../UploadImage/UploadImage";

const TripReport = ({ peak, close }) => {
  const [tripReportData, setTripReportData] = useState({});
  const [imageName, setImageName] = useState("");

  // const uploadPhoto = async () => {
  //   if (!file) {
  //     console.log("no file", file);
  //     return;
  //   }
  //   if (typeof file !== "object") {
  //     console.log("string", file);
  //     return;
  //   }

  //   try {
  //     console.log("upload new photo", file);
  //     const response = await uploadPhoto(file);
  //     // setFile(response);
  //     console.log("after upload", response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   uploadPhoto();
  //   console.log("file change", file);
  // }, [file]);

  const handleChange = ({ target: { name, value } }) => {
    console.log("check", name, value);
    setTripReportData({ ...tripReportData, [name]: value });
    console.log("modal", tripReportData);
  };

  // const imagePreview = (e) => {
  //   const file = e.target.files[0];
  //   setFile(file);
  //   console.log("preview", file);
  // };

  const setRating = (value) => {
    setTripReportData({ ...tripReportData, rating: value });
  };

  const postTripReport = (e) => {
    console.log("send", tripReportData, imageName);
    e.preventDefault();
  };
  return (
    <Modal close={close} modalName={"Trip Report"}>
      <form className={s.form} onSubmit={postTripReport}>
        <div>
          {/* <label className={s.fileUpload}>
            <i className="fa fa-upload"></i>
            <br />
            Click or drag image to this area to upload
            <input
              type="file"
              name="photo"
              onChange={imagePreview}
              accept="image/*"
              required
            />
          </label> */}
          <UploadImage setImageName={setImageName} />
          {/* {file && (
            <div className={s.imgPreview}>
              <i className="fa fa-times" onClick={() => setFile("")}></i>
              <img src={file} alt="preview" />
              {/* once img is stored in s3 i can use the url to generate img
              need to make x mark to trigger delete obj in s3
               */}
          {/* </div>
          )} */}
        </div>
        <div className={s.leftCol}>
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
            value="Add Trip Report"
          />
        </div>
      </form>
    </Modal>
  );
};

export default TripReport;
