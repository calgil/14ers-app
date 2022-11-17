import React, { useState } from "react";
import InputBase from "../InputBase/InputBase";
import s from "./Modal.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";

const Modal = ({ modalName, close, peak }) => {
  const [tripReport, setTripReport] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setTripReport({ ...tripReport, [name]: value });
    console.log("modal", tripReport);
  };

  const postTripReport = (e) => {
    e.preventDefault();
  };

  return (
    <div className={s.modalBg}>
      <div className={s.modalBody}>
        <div className={s.modalHeader}>
          <h3 className={s.modalName}>{modalName}</h3>
          <button onClick={close}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <form className={s.form} onSubmit={postTripReport}>
          <h5>{peak.name}</h5>
          <label htmlFor="route-select"> Select a Route</label>
          <select
            className={`${s.routeSelect} ${s.input}`}
            required
            name="route"
            onChange={handleChange}
          >
            <option value="null">Please Choose a route</option>
            {peak.routes.map((route) => (
              <option key={route._id} value={route.name}>
                {capitalizeFirstLetters(route.name)}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          <input
            className={`${s.date} ${s.input}`}
            type="date"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
          />
          <textarea
            key={5}
            className={`${s.details} ${s.input}`}
            required
            name="details"
            placeholder="Details"
            onChange={handleChange}
          />
          <input
            className={s.submitBtn}
            type="submit"
            value="Add Trip Report"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
