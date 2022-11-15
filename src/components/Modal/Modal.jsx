import React from "react";
import s from "./Modal.module.css";

const Modal = ({ modalName, close }) => {
  return (
    <div className={s.modalBg}>
      <div className={s.modalBody}>
        <div className={s.modalHeader}>
          <h3 className={s.modalName}>{modalName}</h3>
          <button onClick={close}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
