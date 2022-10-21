import React from "react";
import s from "./InputBase.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";

const InputBase = ({ data, onChange, error, showError }) => (
  <div className={s.inputContainer}>
    {error && (
      <div className={showError ? s.error : s.hidden}>{data.errorMsg}</div>
    )}
    <input
      //   className={s.inputBase}
      className={showError ? `${s.outline} ${s.inputBase}` : s.inputBase}
      type={data.name}
      name={data.name}
      onChange={onChange}
      autoComplete={"off"}
      placeholder={capitalizeFirstLetters(data.name)}
    />
  </div>
);

export default InputBase;
