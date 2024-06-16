import { Col, Container, Row } from "react-bootstrap";
import { products } from "../../ClientSide";
import CartData from "./CartData";
import { useState } from "react";

type CartProduct = {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

type Cart = {
  products: CartProduct[];
};

function Cart() {
  // Initialize the cart with products
  const initialCart: CartProduct[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    type: product.type,
    description: product.description,
    price: product.price,
    quantity: product.id, // This can be set to 1 or any default value
  }));

  const [cartProducts, setCartProducts] = useState<CartProduct[]>(initialCart);

  const updateQuantity = (id: number, quantity: number) => {
    setCartProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.id === id ? { ...product, quantity } : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  return (
    <Container>
      <h1 style={{ paddingTop: "2%", paddingBottom: "1%" }}>Cart</h1>
      {cartProducts.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        cartProducts.map((product) => (
          <CartData
            key={product.id}
            product={product}
            updateQuantity={updateQuantity}
          />
        ))
      )}
      <Row>
        <Col xs={6}>
          <h3 style={{ paddingTop: "3%", paddingBottom: "5%" }}>
            Total:{" "}
            {cartProducts
              .reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )
              .toLocaleString("es-CR", {
                style: "currency",
                currency: "CRC",
              })}
          </h3>
        </Col>
        <Col xs={6}>
          <button
            className="btn btn-primary"
            style={{ marginBottom: "5%", float: "right" }}
            onClick={() => alert("Checkout")}
          >
            Checkout
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
export type { CartProduct, Cart };
