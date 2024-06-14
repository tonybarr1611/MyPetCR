import { SetStateAction, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { PlusLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  const [clients, setClients] = useState([
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
    { id: 1, name: 'Tony', phonenumber: 'Buddy' },
  ]);

  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.error('Search field is required', {
        autoClose: 1500,
        theme: 'colored',
      });
    }
  };

  const handleAddclient = () => {
    navigate('registerclient');
  };

  const handleEditclient = (id: number) => {
    navigate('editclient');
  };

  return (
    <div>
    <Container fluid>
      <ToastContainer />
      <Row className="mt-3">
        <Col md={12}>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  name="search"
                  onChange={handleSearchChange}
                />
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="button" className='me-2' onClick={handleAddclient}>
                  <PlusLg />
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="contain-table">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th colSpan={2} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.phonenumber}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <Button variant="primary" size="sm" className=" mr-2" style= {{ width: '25%'}} onClick={() => handleEditclient(client.id)}>
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Clients;
