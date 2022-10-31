import React, { useState } from "react";
import s from "./Filter.module.css";

const Filter = ({ filter }) => {
  const [name, setName] = useState("");
  const filterByName = (e) => {
    const searchName = e.target.value.toLowerCase().split(" ").join("-");
    setName(searchName);
  };
  const searchByName = (e) => {
    e.preventDefault();
    if (!name.length) {
      filter();
      return;
    }
    filter(`slug=${name}`);
  };
  return (
    <div className={s.filterContainer}>
      <div className={s.filter}>
        <h5 className={s.filterHeader}>Elevation</h5>
        <div className={s.filterRow}>
          <i className="fa fa-caret-up"></i>
          <span onClick={() => filter("sort=-elevation")}>Tallest First</span>
        </div>
        <div className={s.filterRow}>
          <i className="fa fa-caret-down"></i>
          <span onClick={() => filter("sort=elevation")}>Shortest First</span>
        </div>
      </div>
      <div className={s.filter}>
        <h5 className={s.filterHeader}>Name</h5>
        <div className={s.filterRow}>
          <form onSubmit={searchByName}>
            <i className="fa-magnifying-glass"></i>
            <input
              onChange={filterByName}
              className={s.search}
              type="text"
              placeholder="Peak Name"
            />
            <input type="submit" value="Search" />
          </form>
        </div>
      </div>
      <div className={s.filter}>
        <h5 className={s.filterHeader}>Range</h5>
        <div className={s.rangeContainer}>
          <div className={s.filterRow}>
            <span onClick={() => filter("range=Elk")}>Elk</span>
          </div>
          <div className={s.filterRow}>
            <span onClick={() => filter("range=Front")}>Front</span>
          </div>
          <div className={s.filterRow}>
            <span onClick={() => filter("range=Sangre de Cristo")}>
              Sangre de Christo
            </span>
          </div>
          <div className={s.filterRow}>
            <span onClick={() => filter("range=Sawatch")}>Sawatch</span>
          </div>
          <div className={s.filterRow}>
            <span onClick={() => filter("range=San Juan")}>San Juan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
