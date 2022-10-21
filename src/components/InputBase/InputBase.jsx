import React from "react";
import s from "./InputBase.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";

const InputBase = ({ data, onChange, error, showError }) => (
  <div className={s.inputContainer}>
    {!error && showError && data.name === "password" && (
      <div className={s.passwordRules}>
        Minimum eight characters, at least one upper case English letter, one
        lower case English letter, one number and one special character
      </div>
    )}
    {!error && (
      <div className={showError ? s.error : s.hidden}>{data.errorMsg}</div>
    )}
    <input
      className={
        showError && !error ? `${s.outline} ${s.inputBase}` : s.inputBase
      }
      type={data.name}
      name={data.name}
      onChange={onChange}
      autoComplete={"off"}
      placeholder={capitalizeFirstLetters(data.name)}
    />
  </div>
);

export default InputBase;
