import { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Pets.css";

const ClientPets = () => {
  const navigate = useNavigate();

  const [pets, setPets] = useState([
    {
      id: 1,
      petType: "Dog",
      breed: "Golden Retriever",
      owner: "Tony",
      petName: "Buddy",
      birthdate: "2020-01-01",
      weight: "30kg",
      notes: "Healthy and active",
      disengaged: false,
      idClient: 1001,
    },
    {
      id: 2,
      petType: "Cat",
      breed: "Siamese",
      owner: "Tony",
      petName: "Whiskers",
      birthdate: "2019-05-15",
      weight: "5kg",
      notes: "Shy but friendly",
      disengaged: false,
      idClient: 1001,
    },
  ]);

  const loggedInUser = "Tony";
  const mockupClientId = 9999;

  const userPets = pets.filter((pet) => pet.owner === loggedInUser);

  const handleAddPet = () => {
    navigate("addpet");
  };

  const handleDisengagePet = (id: number) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === id
          ? { ...pet, disengaged: true, idClient: mockupClientId }
          : pet
      )
    );
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <h2>My Pets</h2>
          <Table striped bordered hover responsive className="mb-3">
            <thead>
              <tr>
                <th>ID Pet</th>
                <th>Pet Type</th>
                <th>Breed</th>
                <th>Pet Name</th>
                <th>Birthdate</th>
                <th>Weight</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPets.map((pet) => (
                <tr key={pet.id} className={pet.disengaged ? "whitened" : ""}>
                  <td>{pet.id}</td>
                  <td>{pet.petType}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.petName}</td>
                  <td>{pet.birthdate}</td>
                  <td>{pet.weight}</td>
                  <td>{pet.notes}</td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDisengagePet(pet.id)}
                        disabled={pet.disengaged}
                      >
                        {pet.disengaged ? "Disengaged" : "Disengage"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center mt-3">
            <Button variant="success" onClick={handleAddPet}>
              Add New Pet
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientPets;
