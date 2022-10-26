import React from "react";
import s from "./FourteenersApp.module.css";
import Navbar from "../Navbar/Navbar";
import PeakContainer from "../PeakContainer/PeakContainer";

const FourteenersApp = () => {
  return (
    <div className={s.app}>
      {/* <Navbar /> */}
      <PeakContainer />
    </div>
  );
};

export default FourteenersApp;
