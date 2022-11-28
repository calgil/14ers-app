import React, { useState } from "react";
import s from "./UploadImage.module.css";
import { postPhoto, getPhotoUrl, deletePhoto } from "../../services";

const UploadImage = ({ setImageName }) => {
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

    const response = await postPhoto(file);
    if (response.data.success) {
      const res = await getPhotoUrl(response.data.imageName);
      if (res.data.success) {
        setImageUrl(res);
      }
      setImage(response.data.imageName);
      setImageName(response.data.imageName);
    }
    console.log("upload res", response);
  };

  return (
    <div className={s.uploadContainer}>
      <label className={s.fileUpload}>
        <i className="fa fa-upload"></i>
        <br />
        Click or drag image to this area to upload
        <input
          type="file"
          name="photo"
          onChange={uploadPhoto}
          accept="image/*"
          required
        />
      </label>
      {imageUrl && (
        <div className={s.imgPreview}>
          <i className="fa fa-times" onClick={deleteFromS3}></i>
          <img
            // crossOrigin="anonymous"
            src={imageUrl}
            // src={`${process.env.REACT_APP_BASE_URL_LOCAL}/${file}`}
            // src={`${process.env.REACT_APP_BASE_URL_PROD}/${file}`}
            alt="preview"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
