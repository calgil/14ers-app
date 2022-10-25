import React, { useEffect, useState } from "react";
import s from "./RouteTable.module.css";
import class1 from "../../../assets/PeakDetails/class1.png";
import class2 from "../../../assets/PeakDetails/class2.png";
import class2Plus from "../../../assets/PeakDetails/class2Plus.png";
import class3 from "../../../assets/PeakDetails/class3.png";
import class4 from "../../../assets/PeakDetails/class4.png";
import class5 from "../../../assets/PeakDetails/class5.png";
import { capitalizeFirstLetters } from "../../../utilities/capitalizeFirstLetters";

const RouteTable = ({ peakRoutes }) => {
  const [routes, setRoutes] = useState(peakRoutes);

  useEffect(() => {
    console.log("use effect");
    setRoutes(peakRoutes);
  }, [peakRoutes]);

  const addDifficultyIcon = (str) => {
    switch (str) {
      case "class 1":
        return class1;
      case "class 2":
        return class2;
      case "class 2+":
        return class2Plus;
      case "class 3":
        return class3;
      case "class 4":
        return class4;
      case "class 5":
        return class5;
      default:
        return str;
    }
  };
  return (
    <div className={s.routeTable}>
      <div className={`${s.routeHeader} ${s.route}`}>
        <div className={s.routeName}>Name</div>
        <div className={s.routeStat}>Mileage</div>
        <div className={s.routeStat}>Gain</div>
        <div className={s.routeStat}>Difficulty</div>
      </div>
      {routes.length &&
        routes.map((route) => (
          <div key={route._id} className={s.route}>
            <div className={s.routeName}>
              {capitalizeFirstLetters(route.name)}
            </div>
            <div className={s.routeStat}>{route.mileage} miles</div>
            <div className={s.routeStat}>{route.gain}'</div>
            <div className={s.routeStat}>
              <div className={s.routeDifficultyContainer}>
                <img
                  src={addDifficultyIcon(route.difficulty)}
                  alt="difficulty"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RouteTable;
