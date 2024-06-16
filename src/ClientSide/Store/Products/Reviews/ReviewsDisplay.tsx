import React from "react";
import Review from "./Review";

function ReviewsDisplay() {
  const reviewsMockData = [
    {
      user: "User1",
      rate: 5,
      reviewDesc: "Great product!",
    },
    {
      user: "User2",
      rate: 4,
      reviewDesc: "Good product, fast delivery.",
    },
    {
      user: "User3",
      rate: 3,
      reviewDesc: "Average product, could be better.",
    },
    {
      user: "User4",
      rate: 2,
      reviewDesc: "Not satisfied with the product.",
    },
  ];

  return (
    <div className="mt-4">
      <h2>Reviews</h2>
      <div className="ml-3 mr-3">
        {reviewsMockData.map((review, index) => (
          <Review
            key={index}
            user={review.user}
            rate={review.rate}
            reviewDesc={review.reviewDesc}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewsDisplay;
