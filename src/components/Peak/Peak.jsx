import React from "react";
import s from "./Peak.module.css";


const Peak = ({ peak }) => {
    const peakImg = {
        backgroundImage: `url("${peak.photo}")`,
    }

    return (
        <div className={s.peak}>
            <div 
                className={s.imgContainer} 
                style={peakImg}
            >
            </div>
            <h2 className={s.name}>{peak.name}</h2>
            <p className={s.elevation}>Elevation: {peak.elevation}'</p>
        </div>
    );
};

export default Peak;