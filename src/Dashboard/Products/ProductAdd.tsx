import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { SiDatadog } from "react-icons/si";
import { backendURL } from "../../main";

interface Product {
  name: string;
  description: string;
  price: number;
  typeID: number;
}

const ProductAdd: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    typeID: 1, // You might want to set this dynamically
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formProductName = document.getElementById(
        "productName"
      ) as HTMLInputElement;
      const formProductDescription = document.getElementById(
        "productDescription"
      ) as HTMLInputElement;
      const formProductPrice = document.getElementById(
        "productPrice"
      ) as HTMLInputElement;
      if (
        !formProductName.value ||
        !formProductDescription.value ||
        parseInt(formProductPrice.value) <= 0
      ) {
        toast.error("All fields are required and price must be positive", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        // Add new product
        await axios.post(`${backendURL}product`, {
          Name: formProductName.value,
          Description: formProductDescription.value,
          Price: parseInt(formProductPrice.value),
          IDProductType: product.typeID,
        });
        toast.success("Product added successfully", {
          autoClose: 1500,
          theme: "colored",
        });
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/products");
  };

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
            <h1 className="h4">Add Product</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="productName"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                id="productDescription"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                id="productPrice"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: +e.target.value })
                }
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductType">
              <Form.Label>Type ID</Form.Label>
              <Form.Control
                type="number"
                name="typeID"
                value={product.typeID}
                onChange={(e) =>
                  setProduct({ ...product, typeID: +e.target.value })
                }
                min="1"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Add Product
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="mb-3"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductAdd;
