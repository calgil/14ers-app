import React, { useEffect, useState } from "react";
import s from "./RouteTable.module.css";
import { addDifficultyIcon } from "../../../utilities/addDifficultyIcon";
import { capitalizeFirstLetters } from "../../../utilities/capitalizeFirstLetters";

const RouteTable = ({ peakRoutes }) => {
  const [routes, setRoutes] = useState(peakRoutes);

  useEffect(() => {
    console.log("use effect");
    setRoutes(peakRoutes);
  }, [peakRoutes]);

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
