import axios from "axios";
import { useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  ToastContainer,
} from "react-bootstrap";
import { SiDatadog } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logger from "../../log";

function ProductStockEdit() {
  const location = useLocation();
  const { productID, storeID, stock, hasStock } = location.state;
  const [stockState, setStockState] = useState(stock === 0 ? 1 : stock);

  const navigate = useNavigate();

  console.log(productID, storeID, stock, hasStock);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      var newStock = parseInt(
        (document.getElementById("stock") as HTMLInputElement).value
      );
      if (isNaN(newStock)) {
        toast.error("Stock must be a number", {
          autoClose: 1500,
          theme: "colored",
        });
        return;
      }
      if (newStock < 0) {
        toast.error("Stock must be a positive number", {
          autoClose: 1500,
          theme: "colored",
        });
        return;
      }
      if (hasStock) {
        await axios.put(
          `http://localhost:8080/api/v1/inventory/${productID}/${storeID}`,
          {
            Quantity: newStock,
          }
        );
      } else {
        await axios.post(`http://localhost:8080/api/v1/inventory`, {
          IDProduct: productID,
          IDStore: storeID,
          Quantity: newStock,
        });
      }
      logger.update(`Stock of product ID: ${productID} in store ${storeID} has been updated to ${newStock} units`); 
      toast.success("Stock updated successfully", {
        autoClose: 1500,
        theme: "colored",
      });
      navigate(-1);
    } catch (error) {
      console.error("Error parsing stock:", error);
      toast.error("Failed to parse stock", {
        autoClose: 1500,
        theme: "colored",
      });
      return;
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer position="top-center" />
      <Card style={{ width: "36rem", background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <SiDatadog
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1>Product Stock Edit</h1>
          </div>
          <Row>
            <Col>
              <p>Product ID: {productID}</p>
            </Col>
            <Col>
              <p>Store ID: {storeID}</p>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="stockForm">
              <Form.Label>
                <strong>Stock</strong>
              </Form.Label>
              <Form.Control
                type="number"
                name="stock"
                id="stock"
                value={stockState}
                onChange={(e) => setStockState(parseInt(e.target.value))}
                min="0"
              />
            </Form.Group>
            <div
              className="d-flex text-center"
              style={{ justifyContent: "center" }}
            >
              <button type="submit" className="btn btn-primary">
                Update Stock
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductStockEdit;
