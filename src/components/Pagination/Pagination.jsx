import React from "react";
import s from "./Pagination.module.css";

const Pagination = ({ peaksPerPage, totalPeaks, paginate }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPeaks / peaksPerPage); i++) {
    pages.push(i);
  }

  return (
    <ul className={s.pagination}>
      {pages.map((number) => (
        <li
          key={number}
          className={number === pages.length ? `${s.lastPage}` : `${s.page}`}
          onClick={() => paginate(number)}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
