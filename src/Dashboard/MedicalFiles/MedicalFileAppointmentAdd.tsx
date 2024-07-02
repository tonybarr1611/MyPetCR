import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { MdVaccines } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import axios from "axios";
import logger from "../../log";

const AddMedicalFileAppointment = () => {
  guestRedirection();
  handleExpiration();
  const location = useLocation();
  const { id } = location.state;

  const [detail, setDetail] = useState({
    productId: "",
    productName: "",
    description: "",
    quantity: 1,
    price: 0,
  });

  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      description: string;
      quantity: number;
      price: number;
      type: string;
    }[]
  >([]);
  const [showProductTable, setShowProductTable] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          "http://localhost:8080/api/v1/medicine"
        );
        var productsData = response.data.map((product: any) => ({
          id: product.IDProduct,
          name: product.Name,
          description: product.Description,
          quantity: product.Quantity,
          price: product.Price,
          type: product.ProductTypeName,
        }));
        productsData = productsData.filter(
          (product: any) => product.name !== "Shipping"
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (!detail.productId || !detail.description || !detail.quantity) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
        return;
      }

      const selectedProduct = products.find(
        (product) => product.id.toString() === detail.productId
      );

      if (!selectedProduct) {
        toast.error("Invalid Product ID", {
          autoClose: 1500,
          theme: "colored",
        });
        return;
      }

      const totalPrice = selectedProduct.price * detail.quantity;

      const availableInventory = await axios.get(
        `http://localhost:8080/api/v1/inventory/${detail.productId}`
      );

      const availableQuantity = availableInventory.data.reduce(
        (acc: number, inventory: any) => acc + inventory.Quantity,
        0
      );

      if (
        availableQuantity < detail.quantity &&
        !selectedProduct.type.toLocaleLowerCase().includes("service")
      ) {
        toast.error("Insufficient stock", {
          autoClose: 1500,
          theme: "colored",
        });
        return;
      }

      try {
        const url = "http://localhost:8080/api/v1/invoiceDetail";
        const params = {
          IDInvoice: id,
          IDProduct: detail.productId,
          Description: detail.description,
          Quantity: detail.quantity,
          Price: totalPrice,
        };
        await axios.post(url, params);
        logger.update(
          `Added detail to invoice ${id} with product ${detail.productId}`
        );

        const quantityParams = {
          Quantity: detail.quantity,
        };
        await axios.put(
          `http://localhost:8080/api/v1/inventory/${detail.productId}`,
          quantityParams
        );
        toast.success("Detail added successfully", {
          autoClose: 1500,
          theme: "colored",
        });
        window.location.assign(`/dashboard/medicalfiles`);
      } catch (error) {
        console.error("Error adding detail:", error);
        toast.error("Failed to add detail", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred while adding the detail", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    window.location.assign(`/dashboard/medicalfiles`);
  };

  const toggleProductTable = () => {
    setShowProductTable(!showProductTable);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer position="top-center" />
      <Card style={{ width: "24rem", background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <MdVaccines
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1 className="h4">Add Procedure Detail</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product ID</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  name="productId"
                  value={detail.productId}
                  onChange={handleChange}
                  min={1}
                />
                <Button
                  variant="info"
                  onClick={toggleProductTable}
                  className="ml-2"
                  style={{ width: "70%" }}
                >
                  {showProductTable ? "Hide Products" : "Show Products"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={detail.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Add Detail
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
      {showProductTable && (
        <div style={{ marginLeft: "20px" }}>
          <div className="scrollableDiv datatable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      setDetail({
                        ...detail,
                        productId: product.id.toString(),
                        productName: product.name,
                        description: product.description,
                        price: product.price,
                      })
                    }
                  >
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AddMedicalFileAppointment;
