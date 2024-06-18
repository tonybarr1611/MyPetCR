import React, { useState, useEffect } from "react";
import { getReviewsByID } from "../../../Functions";
import { ReviewProps } from "./Review";
import Review from "./Review";

function ReviewsDisplay({ id }: { id: number }) {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getReviewsByID(id);
      setReviews(reviews);
    }
    fetchReviews();
  }, [id]);

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
        {reviews.map((review) => (
          <Review
            key={`review-${review.id}`}
            id={review.id}
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
