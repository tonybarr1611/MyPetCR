import { useState, useEffect} from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MdVaccines } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import axios from "axios";

const MedicalFileAppointmentEdit = () => {
  guestRedirection();
  handleExpiration();
  const location = useLocation(); 
  const {id, productid} = location.state;


  const [detail, setDetail] = useState<{ description: string; quantity: number }>({ description: "", quantity: 0 });
  const [product, setProduct] = useState<{ description: string; price: number }>({ description: "", price: 0 });

  useEffect (() => {
    const fetchDetail = async () => {
      try {
        console.log(id);
        console.log(productid);
        const response = await axios.get(`http://localhost:8080/api/v1/invoiceDetail/${id}`);
        setDetail({
          description: response.data[0].Description,
          quantity: response.data[0].Quantity,
        });
      } catch (error) {
        console.error("Error fetching detail:", error);
        toast.error("Failed to fetch detail", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    fetchDetail();
  }, []);

  useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/product/${productid}`);
          setProduct({
            description: response.data[0].Description,
            price: response.data[0].Price,
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Failed to fetch product", {
            autoClose: 1500,
            theme: "colored",
          });
        }
      };
      fetchProduct();
    }, []);


  const handleChange = (e: { target: { name: any; value: any } }) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (!detail.description || !detail.quantity) {
        toast.error("Please fill in all fields", {
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        try {
          const url = `http://localhost:8080/api/v1/invoiceDetail/${id}`;
          const params = {
            Description: detail.description,
            Quantity: detail.quantity,
            Price: product.price * detail.quantity,
          };
          axios.put(url, params);
        } catch (error) {
          console.error("Error updating detail:", error);
          toast.error("Failed to update detail", {
            autoClose: 2000,
            theme: "colored",
          });
        }
        toast.success("Detail updated successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        window.location.assign(`/dashboard/medicalfiles`);
      }
    } catch (error) {
      toast.error("An error occured while updating the detail", {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    window.location.assign(`/dashboard/medicalfiles`)
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
            <h1 className="h4">Edit Procedure Detail</h1>
          </div>
          <Form onSubmit={handleSubmit}>
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
                value={detail.quantity.toString()}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Update Detail
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

export default MedicalFileAppointmentEdit;

