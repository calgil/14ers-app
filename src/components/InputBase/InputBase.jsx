import React from "react";
import s from "./InputBase.module.css";
import { capitalizeFirstLetters } from "../../utilities/capitalizeFirstLetters";

const InputBase = ({ data, onChange, onBlur, error, showError }) => (
  <div className={s.inputContainer}>
    {error && showError && data.name === "password" && (
      <div className={s.passwordRules}>
        Minimum eight characters, at least one upper case letter, one lower case
        letter, one number and one special character
      </div>
    )}
    <label className={s.label}>
      <div className={s.labelText}>{capitalizeFirstLetters(data.name)}</div>
      {error && (
        <div className={showError ? s.error : s.hidden}>{data.errorMsg}</div>
      )}
      <input
        className={
          showError && error ? `${s.outline} ${s.inputBase}` : s.inputBase
        }
        type={data.type}
        name={data.name}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={"off"}
      />
    </label>
  </div>
);

export default InputBase;
