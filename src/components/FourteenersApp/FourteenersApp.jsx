import React from "react";
import s from "./FourteenersApp.module.css";
import Navbar from "../Navbar/Navbar";
import { 
    Outlet,
 } from "react-router-dom";

const FourteenersApp = () => {

    return (
        <div className={s.app}>
            <Navbar 
            />
            <Outlet />
        </div>
    );
};

export default FourteenersApp;