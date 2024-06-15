import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { FaDog } from "react-icons/fa6";

const RegisterUser = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      if (!credentials.email && !credentials.password) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (emailRegex.test(credentials.email) === false) {
        toast.error("Please enter a valid email", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (credentials.password.length < 5) {
        toast.error("Please enter a password with more than 5 characters", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (credentials.email && credentials.password) {
        // Authentication logic (e.g., sending data to backend)
      }
    } catch (error: any) {
      toast.error(error.response.data.error[0].msg, {
        autoClose: 1500,
        theme: "colored",
      });
    }
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
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
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
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterUser;

/*import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { EyeFill, EyeSlashFill, PlusCircleDotted     } from "react-bootstrap-icons";
import "./Login.css"

const Register = () => {
  const [credentials, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      if (!credentials.email && !credentials.firstName && !credentials.password && !credentials.phoneNumber && !credentials.lastName) {
        toast.error("All fields are required", { autoClose: 1500, theme: 'colored' })
      } else if (credentials.firstName.length < 1 || credentials.lastName.length < 1) {
        toast.error("Please enter a valid name", { autoClose: 1500, theme: 'colored' })
      } else if (emailRegex.test(credentials.email) === false) {
        toast.error("Please enter a valid email", { autoClose: 1500, theme: 'colored' })
      } else if (phoneRegex.test(credentials.phoneNumber) === false) {
        toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
        console.log(1);
      } else if (credentials.password.length < 5) {
        toast.error("Please enter a password with more than 5 characters", { autoClose: 500, theme: 'colored' })
      } else if (credentials.email && credentials.firstName && credentials.lastName && credentials.phoneNumber && credentials.password) {
        // Authentication logic (e.g., sending data to backend) goes here.
      }
    } catch (error : any) {
      toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer position="top-center" />
      <Card style={{ width: '24rem' , background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <PlusCircleDotted size={40} className="mb-3" style={{ color: 'var(--darkblue)' }} />
            <h1 className="h4">Sign Up</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={credentials.firstName}
                    onChange={handleOnChange}
                    
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={credentials.lastName}
                    onChange={handleOnChange}
                    
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={credentials.phoneNumber}
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
                <Button variant="primary" onClick={handleClickShowPassword} className="ml-1">
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>
            <Row>
              <Col className="text-end">
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
*/
