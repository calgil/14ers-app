import React from "react";
import s from "./Modal.module.css";

const Modal = ({ children, modalName, close, peak }) => {
  return (
    <div className={s.modalBg} onClick={close}>
      <div className={s.modalBody} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h3 className={s.modalName}>{modalName}</h3>
          <button className={s.closeBtn} onClick={close}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
