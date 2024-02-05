import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ reviews }) => {

    console.log("This is rating section ",reviews.rating)
  const options = {
    value: reviews.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{reviews.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{reviews.comment}</span>
    </div>
  );
};

export default ReviewCard;