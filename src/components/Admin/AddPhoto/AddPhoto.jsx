import React from "react";
import s from "./AddPhoto.module.css";
import { configBucket } from "../../../config/configS3";

const AddPhoto = ({ toggleAddPhoto }) => {

    const addPhoto = () => {
        console.log(configBucket);
    }

    return (
        <div 
            className={s.addPhotoBg}
            onClick={toggleAddPhoto}
        >
            <div
                className={s.addPhotoBody}
            >
                {/* <input type="file" /> */}
                <button
                    onClick={addPhoto}
                >
                    Do something
                </button>
            </div>
        </div>
    );
};

export default AddPhoto;