import { Container, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import {
  getProductByID,
  getAverageRatingByID,
  addCartEntry,
} from "../../Functions";
import { useState, useEffect } from "react";
import Ratings from "react-ratings-declarative";
import RateEntry from "./Reviews/RateEntry";
import ReviewsDisplay from "./Reviews/ReviewsDisplay";
import { ToastContainer, toast } from "react-toastify";

type ProductProp = {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
};

type ProductDetailProps = {
  products: ProductProp[];
};

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail({ products }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProp | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0.0); // [1, 2, 3, 4, 5
  const navigate = useNavigate();

  useEffect(() => {
    // TODO fetch ratings
    async function fetchProduct() {
      if (id) {
        const product = await getProductByID(id);
        setProduct(product);
      }
    }
    async function fetchRatings() {
      if (id) {
        const ratingAvg = await getAverageRatingByID(id);
        setRating(ratingAvg);
      }
    }
    fetchProduct();
    fetchRatings();
  }, [id]);

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

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const productImage = `/src/ClientSide/Store/productImages/Thumbnail${id}.jpg`;

  function changeRating(rate: any) {
    console.log(rate);
    handleShow();
  }

  const handleAddCart = () => {
    try {
      addCartEntry(id, 1);
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Product wasn't added to cart");
    }
  };

  return (
    <Container>
      <ToastContainer />
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
          <Ratings rating={rating} changeRating={changeRating}>
            {renderRatingWidgets()}
          </Ratings>
          <p className="price">
            {(product.price || 0).toLocaleString("es-CR", {
              style: "currency",
              currency: "CRC",
            })}
          </p>
          <a className="btn btn-primary" onClick={handleAddCart}>
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
        <ReviewsDisplay id={parseInt(id || "0")} />
      </div>
    </Container>
  );
}

export default ProductDetail;
export type { ProductProp, ProductDetailProps };
