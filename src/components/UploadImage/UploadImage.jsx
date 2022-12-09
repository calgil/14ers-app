import React, { useState } from "react";
import s from "./UploadImage.module.css";

import { postPhoto, getPhotoUrl, deletePhoto } from "../../services";

const UploadImage = ({ loggedIn, updateImage, error }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const deleteFromS3 = async () => {
    const response = await deletePhoto(image);
    if (response.status === 200) {
      setImage("");
      setImageUrl("");
      setProgress(0);
    }
  };

  const uploadPhoto = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const response = await postPhoto(file, function (progressEvent) {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      setProgress(progress);
    });
    if (response.status !== 200) {
      return console.log("Something went wrong.", response.status);
    }
    const res = await getPhotoUrl(response.data.imageName);
    setImageUrl(res);
    setImage(response.data.imageName);
    updateImage(response.data.imageName);
    setLoading(false);
  };

  return (
    <div className={s.uploadContainer}>
      {loading && (
        <div className={s.progress}>
          <div
            className={s.progressBar}
            role="progressbar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
      {imageUrl ? (
        <div className={s.imgPreview}>
          <div className={s.imageContainer}>
            <button className={s.deleteBtn} onClick={deleteFromS3}>
              <span>Remove</span>
              <i className="fa fa-trash"></i>
            </button>
            <img src={imageUrl} alt="preview" />
          </div>
        </div>
      ) : (
        <label
          className={error ? `${s.fileUpload} ${s.error}` : `${s.fileUpload}`}
        >
          <i className="fa fa-upload"></i>
          <br />
          {loggedIn ? (
            <span>Click or drag image to this area to upload</span>
          ) : (
            <span>Login to add photos</span>
          )}
          {error && <span className={s.errorMsg}>Photo required</span>}
          <input
            type="file"
            name="photo"
            onChange={uploadPhoto}
            accept="image/*"
            required
            disabled={!loggedIn}
          />
        </label>
      )}
    </div>
  );
};

export default UploadImage;
