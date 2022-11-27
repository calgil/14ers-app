import React from "react";
import s from "./UploadImage.module.css";

const UploadImage = ({ file, setFile }) => {
  const deleteFromS3 = () => {
    // use key to delete obj from s3
    setFile("");
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
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          required
        />
      </label>
      {file && (
        <div className={s.imgPreview}>
          <i className="fa fa-times" onClick={deleteFromS3}></i>
          {/* <img
            crossOrigin="anonymous"
            src={`${process.env.REACT_APP_BASE_URL_LOCAL}/${file}`}
            // src={`${process.env.REACT_APP_BASE_URL_PROD}/${file}`}
            alt="preview"
          /> */}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
