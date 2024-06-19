import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import { ToastContainer, toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import logger from "../../log";

const EditClient = () => {
  guestRedirection();
  handleExpiration();
  const [client, setClient] = useState({ name: "", phoneNumber: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/client/${id}`
        );
        setClient({
          name: response.data[0].Name,
          phoneNumber: response.data[0].PhoneNumber,
        });
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to fetch clients", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    fetchClient();
  }, []);

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const makeLog = () => {
    logger.update(`The user has edited the client ID: ${id}`)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let phoneNumberRegex = /^[0-9]{8}$/;
    try {
      if (!client.name || !client.phoneNumber) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (phoneNumberRegex.test(client.phoneNumber) === false) {
        toast.error("Please enter a valid 8-digit phone number", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        try {
          const url = `http://localhost:8080/api/v1/client/${id}`;
          const param = {
            Name: client.name,
            PhoneNumber: client.phoneNumber,
          };
          await axios.put(url, param);
        } catch (error) {
          toast.error("Failed to update client", {
            autoClose: 1500,
            theme: "colored",
          });
        }
        toast.success("Client updated successfully", {
          autoClose: 1500,
          theme: "colored",
        });
        navigate("/dashboard/clients");
      }
    } catch (error) {
      toast.error("An error occurred while updating the client", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/clients");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer />
      <Card style={{ width: "24rem", background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <FaUserEdit
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1 className="h4">Edit Client</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="clientName"
                name="name"
                value={client.name}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="clientPhoneNumber"
                name="phoneNumber"
                value={client.phoneNumber}
                onChange={handleOnChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3" onClick={makeLog}>
                Update Client
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

export default EditClient;
