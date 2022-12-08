import React, { useState } from "react";
import s from "./UploadImage.module.css";

import { postPhoto, getPhotoUrl, deletePhoto } from "../../services";

const UploadImage = ({ loggedIn, updateImage, error }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");

  const deleteFromS3 = async () => {
    console.log("delete image", image);
    const response = await deletePhoto(image);
    if (response.status === 200) {
      console.log("delete from s3", response);
      setImage("");
      setImageUrl("");
    }
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    console.log("upload fiel", file);

    const response = await postPhoto(file);
    console.log("post photo res", response);
    if (response.status === 200) {
      const res = await getPhotoUrl(response.data.imageName);
      setImageUrl(res);
      setImage(response.data.imageName);
      updateImage(response.data.imageName);
    }
  };

  return (
    <div className={s.uploadContainer}>
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
