import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import "../Store.css";
import { addCartEntry } from "../../Functions";
import { ToastContainer, toast } from "react-toastify";

type ProductProps = {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
};

function Product({ id, name, type, description, price }: ProductProps) {
  const productUrl = `/clientside/product/${id}`;
  const productImage = `/src/ClientSide/Store/productImages/Thumbnail${id}.jpg`;

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
    <div className="productCard">
      <ToastContainer />
      <Container>
        <div className="card borderless" style={{ width: "20rem" }}>
          <Link to={productUrl}>
            <img src={productImage} className="card-img-top" alt="..." />
          </Link>
          <div className="card-body">
            <div>
              <Link to={productUrl}>
                <h5 className="card-title">{name}</h5>
                <div className="setSizeDiv">
                  <p>
                    <small>{description}</small>
                  </p>
                </div>
                <p style={{ marginTop: "10px" }}>
                  {price.toLocaleString("es-CR", {
                    style: "currency",
                    currency: "CRC",
                  })}
                </p>
              </Link>
            </div>
            <a className="btn btn-primary cartBtn" onClick={handleAddCart}>
              <FaCartPlus /> Add to cart
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Product;
