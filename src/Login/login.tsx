import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'  
import { Eye, EyeSlash, PersonLock } from 'react-bootstrap-icons';


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
  
    const handleOnChange = (e : any) => {
      setCredentials({...credentials, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async (e : any) => {
        e.preventDefault();
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
          if (!credentials.email && !credentials.password) {
            toast.error("All fields are required", { autoClose: 500, theme: 'colored' });
          } else if (!emailRegex.test(credentials.email)) {
            toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' });
          } else if (credentials.password.length < 5) {
            toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' });
          }
        } catch (error : any) {
            error.response.data.error.length === 1 ?
            toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
            : toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }
      };
    
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Card style={{ width: '24rem' }}>
            <Card.Body>
              <div className="text-center mb-4">
                <PersonLock size={40} className="mb-3" style={{ color: '#0d6efd' }} />
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
                    required
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
                      required
                    />
                    <Button variant="outline-secondary" onClick={handleClickShowPassword}>
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </div>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
    
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Sign In
                </Button>
    
                <Row>
                  <Col className="text-end">
                    {/*<Link to="/register" className="text-decoration-none">
                      Don't have an account? <span style={{ color: '#0d6efd' }}>Sign Up</span>
                    </Link>*/}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      );
    };
    
    export default Login;