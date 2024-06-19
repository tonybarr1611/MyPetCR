import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import { ToastContainer, toast } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { FaDog } from "react-icons/fa6";
import axios from "axios";
import logger from "../../log";

const RegisterClient = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  guestRedirection();
  handleExpiration();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const makeLog = () => {
    logger.update(`The user has created a client`);
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let phoneNumberRegex = /^[0-9]{8}$/;
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      if (
        !credentials.name ||
        !credentials.phoneNumber ||
        !credentials.email ||
        !credentials.password
      ) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (!credentials.name) {
        toast.error("Please enter your name", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (phoneNumberRegex.test(credentials.phoneNumber) === false) {
        toast.error("Please enter a valid 8-digit phone number", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (!emailRegex.test(credentials.email)) {
        toast.error("Please enter a valid email address", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (credentials.password.length < 6) {
        toast.error("Password must be at least 6 characters long", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        try {
          const url = `http://localhost:8080/api/v1/clientAndUser/`;
          const param = {
            Name: credentials.name,
            PhoneNumber: credentials.phoneNumber,
            Password: credentials.password,
            LoginID: credentials.email,
            IDUserType: 4,
          };
          await axios.post(url, param);
        } catch (error) {
          toast.error(`Failed to add client: ${error}`, {
            autoClose: 1500,
            theme: "colored",
          });
        }
        navigate("/dashboard/clients");
      }
    } catch (error) {
      toast.error("An error occurred during registration", {
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
      <ToastContainer position="top-center" />
      <Card style={{ width: "24rem", background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <FaDog
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1 className="h4">Sign Up</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={"text"}
                  name="phoneNumber"
                  value={credentials.phoneNumber}
                  onChange={handleOnChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleOnChange}
                />
                <Button
                  variant="primary"
                  onClick={handleClickShowPassword}
                  className="ml-1"
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Create Client
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

export default RegisterClient;
