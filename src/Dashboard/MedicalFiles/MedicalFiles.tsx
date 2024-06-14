import { SetStateAction, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { PlusLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const MedicalFiles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const [pets, setPets] = useState([
    { id: 1, petName: 'Buddy', ownerName: 'Tony', breed: 'Golden Retriever' },
    { id: 2, petName: 'Milo', ownerName: 'Sarah', breed: 'Beagle' },
    { id: 3, petName: 'Max', ownerName: 'John', breed: 'Bulldog' },
    { id: 4, petName: 'Bella', ownerName: 'Anna', breed: 'Poodle' },
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

  const handleAddPet = () => {
    
  };

  const handleViewPetDetails = (id: number) => {
    navigate(`MedicalFileInfo`);
    //navigate(`petdetails/${id}`);
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
                  <Button variant="primary" type="button" className='me-2' onClick={handleAddPet}>
                    <PlusLg />
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="contain-table">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Pet ID</th>
                    <th>Pet Name</th>
                    <th>Owner Name</th>
                    <th>Breed</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet, index) => (
                    <tr key={index}>
                      <td>{pet.id}</td>
                      <td>{pet.petName}</td>
                      <td>{pet.ownerName}</td>
                      <td>{pet.breed}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Button variant="primary" size="sm" className="mr-2" style={{ width: '50%' }} onClick={() => handleViewPetDetails(pet.id)}>
                            View Details
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

export default MedicalFiles;
