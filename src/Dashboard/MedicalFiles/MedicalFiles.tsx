import { SetStateAction, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { PlusLg } from "react-bootstrap-icons";
import MedicalFilesData from "./MedicalFilesData";

const MedicalFiles = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const [pets, setPets] = useState([
    { id: 1, petName: "Buddy", ownerName: "Tony", breed: "Golden Retriever" },
    { id: 2, petName: "Milo", ownerName: "Sarah", breed: "Beagle" },
    { id: 3, petName: "Max", ownerName: "John", breed: "Bulldog" },
    { id: 4, petName: "Bella", ownerName: "Anna", breed: "Poodle" },
  ]);

  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.error("Search field is required", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleAddPet = () => {};

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
                  <Button
                    variant="primary"
                    type="button"
                    className="me-2"
                    onClick={handleAddPet}
                  >
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
                <tbody>{pets.map((pet) => MedicalFilesData(pet))}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MedicalFiles;
