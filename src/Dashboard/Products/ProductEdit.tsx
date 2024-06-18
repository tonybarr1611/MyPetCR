import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { SiDatadog } from "react-icons/si";
import { getProductsClient } from "../../ClientSide/Functions";
import { backendURL } from "../../main";

interface Product {
  id: number; // non editable
  name: string;
  description: string;
  price: number;
  typeID: number; // non editable
  type: string; // non editable
  stock: number; // non editable
}

const ProductEdit: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>() || 0;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductsClient();
        const product = response.find(
          (product: Product) => product.id === +(id || 0)
        );
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product", {
          autoClose: 1500,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
        // Update product details
        await axios.put(`${backendURL}product/${id}`, {
          IDProduct: product?.id,
          IDProductType: product?.typeID,
          Name: formProductName.value,
          Description: formProductDescription.value,
          Price: parseInt(formProductPrice.value),
        });
        toast.success("Product updated successfully", {
          autoClose: 1500,
          theme: "colored",
        });
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/products");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
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
            <h1 className="h4">Edit Product</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductId">
              <Form.Label>Product ID</Form.Label>
              <Form.Control type="text" name="id" value={product.id} readOnly />
            </Form.Group>
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
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={product.type}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={product.stock}
                readOnly
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Update Product
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

export default ProductEdit;
