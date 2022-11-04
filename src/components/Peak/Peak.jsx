import React from "react";
import s from "./Peak.module.css";
import { useNavigate } from "react-router-dom";
import { formatElevation } from "../../utilities/formatElevaion";

const Peak = ({ peak }) => {
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/peaks/${peak.id}`);
  };

  return (
    <div className={s.peak} onClick={openDetails}>
      {/* <div className={s.imgContainer}> */}
      {peak.photos &&
        peak.photos.map((photo) => (
          <div key={photo._id} className={s.imgContainer}>
            <img
              crossOrigin="anonymous"
              src={`${process.env.REACT_APP_BASE_URL}/${photo.url}`}
              alt="peak"
            />
          </div>
        ))}
      {/* {peak.photo.length > 0 && (
          <img
            crossOrigin="anonymous"
            src={`http://localhost:5001/api/v1/${peak.photo[0].url}`}
            alt="peak"
          />
        )} */}
      {/* </div> */}
      <h2 className={s.name}>{peak.name}</h2>
      <p className={s.elevation}>
        Elevation: {formatElevation(peak.elevation)}'
      </p>
    </div>
  );
};

export default Peak;
