import { Container, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import { FaCartPlus } from "react-icons/fa6";
import { useState } from "react";
import RateEntry from "./Reviews/RateEntry";
import ReviewsDisplay from "./Reviews/ReviewsDisplay";

type Product = {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
};

type ProductDetailProps = {
  products: Product[];
};

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail({ products }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? "", 10);
  const product = products.find((p) => p.id === productId);

  const navigate = useNavigate();

  if (!product) {
    return <div>Product not found</div>;
  }

  const renderRatingWidgets = () => {
    return [1, 2, 3, 4, 5].map((i) => (
      <Ratings.Widget
        key={i}
        widgetDimension="35px"
        svgIconViewBox="0 0 24 24"
        svgIconPath={iconPath}
        widgetHoverColor="#4D7381"
        widgetRatedColors="#4D7381"
        widgetSpacings="3px"
      />
    ));
  };

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const productImage = `/src/ClientSide/Store/productImages/Thumbnail${id}.jpg`;

  function changeRating(rate: any) {
    console.log(rate);
    handleShow();
  }

  return (
    <Container>
      <Button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
        Back to Products
      </Button>
      <div className="productDetailCard twoColumnDisplay">
        <div className="columnItem">
          <img
            src={productImage}
            className="productDetailImage"
            alt={product.name}
          />
        </div>
        <div className="productDetailInfo columnItem">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <Ratings rating={4} changeRating={changeRating}>
            {renderRatingWidgets()}
          </Ratings>
          <p className="price">
            {product.price.toLocaleString("es-CR", {
              style: "currency",
              currency: "CRC",
            })}
          </p>
          <a href="#" className="btn btn-primary">
            <FaCartPlus /> Add to Cart
          </a>
        </div>
      </div>
      <RateEntry
        show={showModal}
        handleClose={handleClose}
        productRated={product}
      />
      <div>
        <ReviewsDisplay />
      </div>
    </Container>
  );
}

export default ProductDetail;
export type { Product };
