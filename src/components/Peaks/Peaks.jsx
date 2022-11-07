import React from "react";
import Peak from "../Peak/Peak";
import s from "./Peaks.module.css";

const Peaks = ({ peaks, loading }) => {
  return (
    <div className={s.peaksContainer}>
      {loading ? (
        <div>Loading</div>
      ) : (
        peaks.map((peak) => <Peak key={peak.id} peak={peak} />)
      )}
    </div>
  );
};

export default Peaks;
