import React from "react";
import s from "./Peak.module.css";
import { useNavigate } from "react-router-dom";

const Peak = ({ peak }) => {
  const navigate = useNavigate();

  const peakPhoto = `${process.env.REACT_APP_BASE_URL_LOCAL}/${peak.photos[0].url}`;
  // const peakPhoto = `${process.env.REACT_APP_BASE_URL_PROD}/${peak.photos[0].url}`;

  const openDetails = () => {
    navigate(`/peaks/${peak.id}`);
  };

  return (
    <div className={s.peak} onClick={openDetails}>
      <div className={s.imgContainer}>
        <img crossOrigin="anonymous" src={peakPhoto} alt="peak" />
      </div>
      <h2 className={s.name}>{peak.name}</h2>
      <p className={s.elevation}>Elevation: {peak.elevation}'</p>
    </div>
  );
};

export default Peak;
