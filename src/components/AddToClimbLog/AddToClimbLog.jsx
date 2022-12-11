import React, { useContext } from "react";
import s from "./AddToClimbLog.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import addPeak from "../../assets/PeakDetails/addPeak.svg";

const AddToClimbLog = ({ peak, isClimbed }) => {
  const { authService, updateAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const peaksClimbed = authService.peaksClimbed;
  const isLoggedIn = authService.isLoggedIn;

  const addToPeaksClimbed = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const newPeak = {
      id: peak._id,
      name: peak.name,
      dateClimbed: Date.now(),
    };

    const updatePeaksClimbed = [...peaksClimbed, newPeak];
    const update = { peaksClimbed: updatePeaksClimbed };
    authService
      .editUser(update)
      .then(() => updateAuth())
      .catch((err) => console.error(err));
  };

  return (
    <>
      {isClimbed ? (
        <div className={s.climbBtn}>
          <span onClick={() => console.log("go to climb log")}>
            You Climbed this Peak!
          </span>
        </div>
      ) : (
        <button
          className={`${s.addToClimbsBtn} ${s.climbBtn}`}
          onClick={addToPeaksClimbed}
        >
          <div className={s.iconContainer}>
            <img src={addPeak} alt="add peak" />
          </div>
          <span>
            {isLoggedIn ? "Add to Climb Log!" : "Login to Add to Climb Log"}
          </span>
        </button>
      )}
    </>
  );
};

export default AddToClimbLog;
