import React from "react";
import s from "./StatsContainer.module.css";
import elevation from "../../../assets/PeakDetails/elevation.svg";
import rank from "../../../assets/PeakDetails/rank.svg";
import range from "../../../assets/PeakDetails/range.svg";

const StatsContainer = ({ peak }) => {
  return (
    <div className={s.statsContainer}>
      <div className={s.stat}>
        <div className={s.iconContainer}>
          <img src={elevation} alt="elevation" />
        </div>
        <span>Elevation: {peak.elevation} ft</span>
      </div>
      <div className={s.stat}>
        <div className={s.iconContainer}>
          <img src={rank} alt="rank" />
        </div>
        <span>Rank: {peak.rank} of 57</span>
      </div>
      <div className={s.stat}>
        <div className={s.iconContainer}>
          <img src={range} alt="range" />
        </div>
        <span>Range: {peak.range}</span>
      </div>
    </div>
  );
};

export default StatsContainer;
