import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaUserEdit } from "react-icons/fa";

const EditClient = () => {
  const [client, setClient] = useState({ name: "", phoneNumber: ""});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the client details by ID from the backend 
    const fetchClient = async () => {
      try {
        const response = { id, name: "John Doe", phoneNumber: "12345678"};
        setClient(response);
      } catch (error) {
        toast.error("Failed to fetch client details", { autoClose: 1500, theme: 'colored' });
      }
    };

    fetchClient();
  }, [id]);

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let phoneNumberRegex = /^[0-9]{8}$/;
    try {
      if (!client.name || !client.phoneNumber ) {
        toast.error("All fields are required", { autoClose: 1500, theme: 'colored' });
        }
        else if (phoneNumberRegex.test(client.phoneNumber) === false) {
            toast.error("Please enter a valid 8-digit phone number", { autoClose: 1500, theme: 'colored' });
        }
        else {
        toast.success("Client updated successfully", { autoClose: 1500, theme: 'colored' });
        navigate('/dashboard/clients'); 
      }
    } catch (error) {
      toast.error("An error occurred while updating the client", { autoClose: 1500, theme: 'colored' });
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/clients'); 
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer/>
      <Card style={{ width: '24rem', background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <FaUserEdit size={40} className="mb-3" style={{ color: 'var(--darkblue)' }} />
            <h1 className="h4">Edit Client</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={client.name}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={client.phoneNumber}
                onChange={handleOnChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Update Client
              </Button>
              <Button variant="secondary" type="button" className="mb-3" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditClient;
