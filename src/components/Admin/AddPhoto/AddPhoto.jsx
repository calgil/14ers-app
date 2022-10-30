import React, { useContext, useState } from "react";
import s from "./AddPhoto.module.css";
// import { getUploadUrl } from "../../../services";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../App";
// import S3FileUpload from 'react-s3';
// import S3 from 'react-aws-s3';
// window.Buffer = window.Buffer || require("buffer").Buffer;

const AddPhoto = () => {
  const { authService } = useContext(UserContext);

  const [title, setTitle] = useState();
  const [image, setImage] = useState("");

  const { id } = useParams();

  // const { REACT_APP_ACCESS_KEY_ID, REACT_APP_SECRET_ACCESS_KEY } = process.env;

  // const config = {
  //     bucketName: 'fourteeners',
  //     dirName: '/uploads',
  //     region: 'us-west-2',
  //     accessKeyId: REACT_APP_ACCESS_KEY_ID,
  //     secretAccessKey: REACT_APP_SECRET_ACCESS_KEY,
  //     s3Url: 'https://fourteeners.s3-us-west-2.amazonaws.com',
  // };

  // const ReactS3Client = new S3(config);

  const fileSelected = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!image || !title) {
      return;
    }
    // console.log("iamge", image);
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("title", title);
    // console.log("file to send", formData.getAll("image"));

    authService.addPeakPhoto(image, title);
    // .then((res) => console.log(res))
    // .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={submit}>
      <input onChange={fileSelected} type="file" accept="image/*" />
      <input onChange={(e) => setTitle(e.target.value)} type="text" />
      <input type="submit" value="Add Photo" />
    </form>
  );
};

export default AddPhoto;
