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
  const [file, setFile] = useState("");
  //   const [images, setImages] = useState([]);

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
    const file = e.target.files[0];
    setFile(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      return;
    }
    console.log("file to send", file);
    const result = authService.addPeakPhoto(file, title);
    console.log("res", result);
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
