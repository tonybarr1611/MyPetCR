import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getClientID } from "../../Functions";
import "../Pets.css";

interface Pet {
  IDPet: number;
  IDPetType: string;
  BreedName: string;
  PetName: string;
  Birthdate: string; // Assuming Birthdate is a string, adjust if it's a Date object
  Weight: number;
  Notes: string;
  disengaged?: boolean;
}

const ClientPets: React.FC = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const loggedInUser = "Tony"; // Placeholder; replace with actual logic

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const clientId = getClientID();
        console.log("Client ID: ", clientId);
        const response = await axios.get<Pet[]>(`http://localhost:8080/api/v1/petByClient/${clientId}`);
        console.log("Fetched pets: ", response.data); // Log fetched data
        setPets(response.data); // Update pets state with fetched data
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handleAddPet = () => {
    navigate('addpet');
  };

  const handleDisengagePet = async (id: number) => {
    try {
      const updatedPets = pets.map((pet) =>
        pet.IDPet === id ? { ...pet, disengaged: true, idClient: getClientID() } : pet
      );
      console.log("ID: ", id);
      await axios.put(`http://localhost:8080/api/v1/pet/${id}`, {
        IDClient: 1
      });
      setPets(updatedPets); // Update pets state after successful disengagement
    } catch (error) {
      console.error('Error disengaging pet:', error);
    }
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
              {pets.map((pet) => (
                <tr key={pet.IDPet} className={pet.disengaged ? "whitened" : ""}>
                  <td>{pet.IDPet}</td>
                  <td>{pet.IDPetType}</td>
                  <td>{pet.BreedName}</td>
                  <td>{pet.PetName}</td>
                  <td>{pet.Birthdate}</td>
                  <td>{pet.Weight}</td>
                  <td>{pet.Notes}</td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDisengagePet(pet.IDPet)}
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
