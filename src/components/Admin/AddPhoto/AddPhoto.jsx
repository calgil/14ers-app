import React from "react";
import s from "./AddPhoto.module.css";

const AddPhoto = ({ toggleAddPhoto }) => {

    return (
        <div 
            className={s.addPhotoBg}
            onClick={toggleAddPhoto}
        >
            <div
                className={s.addPhotoBody}
            >
                <input type="file" />
            </div>
        </div>
    );
};

export default AddPhoto;