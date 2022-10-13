import React, { useEffect, useState } from "react";
import s from "./PeakEdit.module.css";
import {
    useParams,
} from "react-router-dom";
import { getPeakById } from "../../services";

const PeakEdit = () => {
    const [peak, setPeak] = useState();
    let { id } = useParams();

    useEffect(() => {

    }, [id]);


    return (
        <div className={s.editBody}>
            Peak Edit
        </div>
    );
};

export default PeakEdit;