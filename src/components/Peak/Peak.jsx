import React from "react";
import s from "./Peak.module.css";
import { useNavigate } from "react-router-dom";

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
              src={`http://localhost:5001/api/v1/${photo.url}`}
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
      <p className={s.elevation}>Elevation: {peak.elevation}'</p>
    </div>
  );
};

export default Peak;
