import React, { useState } from "react";
import { Star } from "./Star";

export default function RatingStar({ rating, setRating }) {
  // console.log("setRating:", rating);
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
}
