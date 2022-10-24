import React from "react";
import s from "./BackBtn.module.css";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button className={s.backBtn} onClick={() => navigate(-1)}>
      <i className="fa fa-chevron-left"></i>
      Go Back
    </button>
  );
};

export default BackBtn;
