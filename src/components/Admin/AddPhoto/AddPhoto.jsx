import React from "react";
import s from "./AddPhoto.module.css";
// import { getUploadUrl } from "../../../services";
import {
    useParams,
} from "react-router-dom";
// import { UserContext } from "../../../App";
// import S3FileUpload from 'react-s3';
// import S3 from 'react-aws-s3';
// window.Buffer = window.Buffer || require("buffer").Buffer; 


const AddPhoto = () => {
    // const { authService } = useContext(UserContext);

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


    const uploadPhoto = (e) => {
        const file = e.target.files[0];
        console.log(id, file);
    };

    return (
                <input 
                    className={s.uploadPhoto}
                    type="file" 
                    onChange={uploadPhoto}
                />
    );
};

export default AddPhoto;