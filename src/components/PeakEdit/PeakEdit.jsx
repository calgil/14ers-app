import React, { useEffect, useState } from "react";
import s from "./PeakEdit.module.css";
import {
    useParams,
} from "react-router-dom";
import { getPeakById } from "../../services";
import ErrorPage from "../ErrorPage/ErrorPage";

const PeakEdit = () => {
    const [peak, setPeak] = useState();
    const [error, setError] = useState(false);
    const [newPeak, setNewPeak] = useState();
    let { id } = useParams();

    useEffect(() => {
        getPeakById(id)
            .then(setPeak)
            .catch(() => {
                setError(true);
            })
    }, [id]);

    const onChange = ({ target: { name, value }}) => {
        setNewPeak({ ...newPeak, [name]: value });
    };


    return (
        <div className={s.editBody}>
            {error && <ErrorPage />}
            <h3 className={s.pageHeader}>Edit {peak.name}</h3>
            
                {
                    peak && 
                <div className={s.editInputs}>
                    <label className={s.labelBase}>
                        Name
                        <input 
                            className={s.inputBase}
                            type="text" 
                            name='name'
                            autoComplete="off"
                            placeholder={peak.name}
                            onChange={onChange}
                        />
                    </label>
                    <label className={s.labelBase}>
                        Elevation
                        <input 
                            className={s.inputBase}
                            type="number" 
                            name='elevation'
                            placeholder={peak.elevation}
                            onChange={onChange}
                        />
                    </label>
                    <label className={s.labelBase}>
                        Range
                        <input 
                            className={s.inputBase}
                            type="text" 
                            name='range'
                            autoComplete="off"
                            placeholder={peak.range}
                            onChange={onChange}
                        />
                    </label>
                    <label className={s.labelBase}>
                        Forest
                        <input 
                            className={s.inputBase}
                            type="text" 
                            name='forest'
                            autoComplete="off"
                            placeholder={peak.forest}
                            onChange={onChange}
                        />
                    </label>
                </div>
                }
        </div>
    );
};

export default PeakEdit;