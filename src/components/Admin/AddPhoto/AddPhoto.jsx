import React, { useContext, useState } from "react";
import s from "./AddPhoto.module.css";
// import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";

const AddPhoto = ({ peak }) => {
  const { authService } = useContext(UserContext);

  const [title, setTitle] = useState();
  const [image, setImage] = useState("");

  const fileSelected = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("peak id ", peak._id);
    console.log("peak phots ", peak.photos);
    if (!image || !title) {
      return;
    }

    try {
      const response = await authService.addPeakPhoto(image, title);
      const updatePhotos = { photos: [...peak.photos, { url: response }] };
      console.log("update", updatePhotos);
      await authService.updatePeak(peak._id, updatePhotos);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={s.formBody} onSubmit={submit}>
      <input onChange={fileSelected} type="file" accept="image/*" />
      <input onChange={(e) => setTitle(e.target.value)} type="text" />
      <input type="submit" value="Add Photo" />
    </form>
  );
};

export default AddPhoto;
