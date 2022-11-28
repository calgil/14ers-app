import React, { useContext, useState } from "react";
import s from "./AddPhoto.module.css";
// import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";
import { postPhoto } from "../../../services";

const AddPhoto = ({ peak, toggleAddPhoto }) => {
  const { authService } = useContext(UserContext);

  const [image, setImage] = useState("");

  const fileSelected = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const uploadPhoto = async (e) => {
    console.log("upload");
    e.preventDefault();
    if (!image) {
      console.log("no image");
      return;
    }

    try {
      const response = await postPhoto(image);
      if (response.data.success) {
        const imageName = response.data.imageName;
        console.log("post response", response);
        const updatePhotos = {
          photos: [...peak.photos, { url: imageName }],
        };
        const res = await authService.updatePeak(peak._id, updatePhotos);
        console.log("update", res);
        if (res.success) {
          console.log("update", res);
          toggleAddPhoto();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s.formBody} onSubmit={uploadPhoto}>
      <input onChange={fileSelected} type="file" accept="image/*" />
      <input type="submit" value="Add Photo" />
    </form>
  );
};

export default AddPhoto;
