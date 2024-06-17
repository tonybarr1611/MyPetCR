import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { EyeFill, EyeSlashFill, PersonLock } from "react-bootstrap-icons";
import "./UserLogin.css";

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  userType?: number;
}

async function sendLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const url = "http://localhost:8080/api/v1/user/verify";
  const body = JSON.stringify({ LoginID: email, Password: password });
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("loginTime", new Date().getTime().toString());
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("client", JSON.stringify(data.client));
      return { success: true, message: data.message, userType: data.userType };
    } else {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

const UserLogin: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("userType");
    localStorage.removeItem("client");
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!credentials.email || !credentials.password) {
      toast.error("All fields are required", {
        autoClose: 1500,
        theme: "colored",
      });
    } else if (!emailRegex.test(credentials.email)) {
      toast.error("Please enter a valid email", {
        autoClose: 1500,
        theme: "colored",
      });
    } else if (credentials.password.length < 5) {
      toast.error("Please enter a valid password", {
        autoClose: 1500,
        theme: "colored",
      });
    } else {
      const result = await sendLogin(credentials.email, credentials.password);
      if (result.success) {
        toast.success(result.message, {
          autoClose: 1500,
          theme: "colored",
        });
        if (result.userType === 2) {
          navigate("/dashboard");
        } else if (result.userType === 1) {
          navigate("/clientside");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(result.message, {
          autoClose: 1500,
          theme: "colored",
        });
      }
    }
  };

  const handleGuest = () => {
    localStorage.setItem("token", "guest");
    localStorage.setItem("loginTime", new Date().getTime().toString());
    localStorage.setItem("userType", "4");
    localStorage.setItem("client", JSON.stringify({}));
    navigate("/clientside");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer position="top-center" />
      <Card style={{ width: "24rem", backgroundColor: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <PersonLock
              size={40}
              className="mb-3"
              style={{ color: "#1A485B" }}
            />
            <h1 className="h4">Sign In</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              Sign In
            </Button>
            <Row>
              <Col className="text-end">
                <span
                  style={{
                    color: "#4D7381",
                    cursor: "pointer",
                  }}
                  onClick={handleGuest}
                >
                  Continue as Guest
                </span>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserLogin;
