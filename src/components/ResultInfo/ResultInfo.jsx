import React, { useState, useEffect } from "react";
import s from "./ResultInfo.module.css";

const ResultInfo = ({ startIndex, endIndex, total }) => {
  const [resultMsg, setResultMsg] = useState("");

  useEffect(() => {
    if (endIndex >= total) {
      return setResultMsg(`Showing ${startIndex + 1} - ${total} of ${total}`);
    }
    setResultMsg(`Showing ${startIndex + 1} - ${endIndex + 1} of ${total}`);
    // if (endIndex <= total) {
    //   return setResultMsg(
    //     `Showing ${startIndex + 1} - ${endIndex + 1} of ${total}`
    //   );
    // }
  }, [startIndex, endIndex, total]);
  return (
    <div className={s.resultInfo}>
      <span>{resultMsg}</span>
    </div>
  );
};

export default ResultInfo;
