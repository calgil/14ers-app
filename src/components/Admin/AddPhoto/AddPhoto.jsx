import React, { useContext, useState } from "react";
import s from "./AddPhoto.module.css";
// import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";
import { generatePhotoUrl } from "../../../services";

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
      return;
    }

    try {
      const response = await generatePhotoUrl(image);
      const updatePhotos = { photos: [...peak.photos, { url: response }] };
      console.log("update", updatePhotos);
      await authService.updatePeak(peak._id, updatePhotos);
      toggleAddPhoto();
      console.log(response);
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
