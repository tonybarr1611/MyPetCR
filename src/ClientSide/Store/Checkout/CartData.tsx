import { Row, Col } from "react-bootstrap";
import { CartProduct } from "./Cart";
import { useState, useEffect } from "react";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import "../Store.css";

type CartDataProps = {
  product: CartProduct;
  updateQuantity?: (id: number, quantity: number) => void;
  modifiable?: boolean;
};

function CartData({
  product,
  updateQuantity,
  modifiable = true,
}: CartDataProps) {
  const productImage = `/src/ClientSide/Store/productImages/Thumbnail${product.id}.jpg`;
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const sumToQuantity = (numQuantity: number) => {
    const newQuantity = quantity + numQuantity;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (updateQuantity) {
        updateQuantity(product.id, newQuantity);
      }
    }
  };

  return (
    <div
      className="borderedContainer paddedContent"
      id={"cartItem" + product.id.toString()}
    >
      <Row>
        <Col sm="1">
          <img src={productImage} alt="..." width="75" height="75" />
        </Col>
        <Col>
          <p>
            <strong>{product.name}</strong>
          </p>
          <div
            className="setSizeDiv"
            style={{ height: "50px", marginTop: "-3%" }}
          >
            <p>{product.description}</p>
          </div>
        </Col>
        <Col>
          <p>
            Total: {"   "}
            {(product.price * quantity).toLocaleString("es-CR", {
              style: "currency",
              currency: "CRC",
            })}
          </p>
        </Col>
        {modifiable && (
          <Col>
            <div>
              <button
                className="transparentBtn"
                onClick={() => sumToQuantity(-1)}
              >
                <DashCircle size={20} />
              </button>
              {quantity}
              <button
                className="transparentBtn"
                onClick={() => sumToQuantity(1)}
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default CartData;
