import { SetStateAction, useEffect, useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import MedicalFilesData from "./MedicalFilesData";
import axios from "axios";

interface Pet {
  id: number;
  petName: string;
  ownerName: string;
  breed: string;
}

const MedicalFiles = () => {
  guestRedirection();
  handleExpiration();
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/pet");
        const newList = response.data.map((obj: any) => ({
          id: obj.IDPet,
          petName: obj.PetName,
          ownerName: obj.UserName,
          breed: obj.BreedName,
        }));
        // Delete pet with id 1
        newList.splice(0, 1);
        setPets(newList);
      } catch (error) {
        console.error("Error fetching pets:", error);
        toast.error("Failed to fetch pets", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchPets();
  }, []);

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
                  {pets
                    .filter(
                      (pet: Pet) =>
                        pet.petName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        pet.ownerName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        pet.breed
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((pet) => MedicalFilesData(pet))}
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
