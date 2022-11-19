import React, { useContext } from "react";
import s from "./UploadImage.module.css";
// import { UserContext } from "../../App";
// import { deletePhotoFromS3 } from "../../utilities/deletePhotoFromS3";

const UploadImage = ({ file, setFile }) => {
  // const { authService } = useContext(UserContext);
  const uploadToS3 = (e) => {
    const file = e.target.files[0];
    // next I need to upload photos in the onchange and setFile to res
    setFile(file);
    console.log("preview", file);
  };

  // it is just as important to figure out how to delete objects form s3

  const deleteFromS3 = () => {
    // use key to delete obj from s3
    // setFile("")
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
          onChange={uploadToS3}
          accept="image/*"
          required
        />
      </label>
      {file && (
        <div className={s.imgPreview}>
          <i className="fa fa-times" onClick={() => setFile("")}></i>
          <img src={file} alt="preview" />
          {/* once img is stored in s3 i can use the url to generate img
              need to make x mark to trigger delete obj in s3
               */}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
