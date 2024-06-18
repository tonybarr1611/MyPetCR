import { SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { SiDatadog } from "react-icons/si";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";

const RegisterAppointment: React.FC = () => {
  guestRedirection();
  handleExpiration();
  const [clientName, setClientName] = useState<string>("");
  const navigate = useNavigate();

  const handleOnChange = (e: { target: { value: SetStateAction<string> } }) => {
    setClientName(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!clientName) {
      toast.error("Client name is required", {
        autoClose: 1500,
        theme: "colored",
      });
    } else {
      navigate("registerappointmentdetails", { state: { clientName } });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/appointments");
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
            <SiDatadog
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1 className="h4">Enter Client Name</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formClientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                value={clientName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Link to={"registerappointmentdetails"}  state={clientName}>
                <Button variant="primary" type="submit" className="mb-3">
                  Next
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  className="mb-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterAppointment;
