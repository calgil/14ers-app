import React, { useState } from "react";
import s from "./StarRating.module.css";

const StarRating = ({ rating, setRating, showError, error }) => {
  const [hover, setHover] = useState(0);
  return (
    <div>
      {showError && error && <div className={s.errorMsg}>Rating required</div>}
      {[...Array(5)].map((star, i) => {
        i += 1;
        return (
          <button
            className={i <= (hover || rating) ? `${s.on}` : `${s.off}`}
            key={i}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className={s.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
