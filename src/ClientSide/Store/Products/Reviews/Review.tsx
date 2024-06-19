import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import Ratings from "react-ratings-declarative";

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

type ReviewProps = {
  id: number;
  user: string;
  rate: number;
  reviewDesc: string;
};

function Review({ user, rate, reviewDesc }: ReviewProps) {
  const renderRatingWidgets = (rate: number) => {
    return [1, 2, 3, 4, 5]
      .map((i) => (
        <Ratings.Widget
          key={i}
          widgetDimension="20px"
          svgIconViewBox="0 0 24 24"
          svgIconPath={iconPath}
          widgetRatedColors="#4D7381"
          widgetEmptyColors="#e3e3e3"
          widgetSpacings="2px"
        />
      ))
      .map((widget, index) =>
        index < rate
          ? React.cloneElement(widget, { widgetRatedColors: "#4D7381" })
          : widget
      );
  };

  return (
    <div className="card mt-2" style={{ border: "none" }}>
      <div className="card-body">
        <h5 className="card-title">
          <FaCircleUser className="mr-2" /> {user}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <Ratings className="mt-3" rating={rate} widgetRatedColors="#4D7381">
            {renderRatingWidgets(rate)}
          </Ratings>
        </h6>
        <p className="card-text">{reviewDesc}</p>
      </div>
    </div>
  );
}

export default Review;
export type { ReviewProps };
