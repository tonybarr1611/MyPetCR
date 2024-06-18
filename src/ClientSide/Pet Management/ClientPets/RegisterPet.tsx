import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { getClientID } from "../../Functions";
import axios from "axios";

const petTypeMapping = {
  1: "Dog",
  2: "Cat",
  3: "Bird"
};

const RegisterPet = () => {
  const navigate = useNavigate();
  const [petDetails, setPetDetails] = useState({
    petType: "",
    breed: "",
    name: "",
    birthdate: "",
    weight: "",
    notes: "",
  });

  const [breeds, setBreeds] = useState<{ IDBreed: number; BreedName: string; }[]>([]);
  const [showBreedTable, setShowBreedTable] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/breed");
        const breeds = response.data.map((obj:any) => ({
          IDBreed: obj.IDBreed,
          BreedName: obj.Name,
        }));
        setBreeds(breeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
        toast.error("Error fetching breeds", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchBreeds();
  }, []);

  const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
    setPetDetails({ ...petDetails, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate("/clientside/management/pets");
  };

  const clientID = getClientID();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let weightRegex = /^[0-9]+$/;

    try {
      if (
        !petDetails.petType ||
        !petDetails.breed ||
        !petDetails.name ||
        !petDetails.birthdate ||
        !petDetails.weight
      ) {
        toast.error("All fields are required", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (petDetails.name.length < 1 || petDetails.name.length > 128) {
        toast.error("Please enter a valid name (1-128 characters)", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (weightRegex.test(petDetails.weight) === false) {
        toast.error("Please enter a valid weight (number)", {
          autoClose: 1500,
          theme: "colored",
        });
      } else if (petDetails.notes.length > 512) {
        toast.error("Notes should be less than 512 characters", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        try {
          const url = `http://localhost:8080/api/v1/pet`;
          const params = {
            IDBreed: petDetails.breed,
            IDClient: `${clientID}`,
            Name: petDetails.name,
            Birthdate: petDetails.birthdate,
           // IDPetType: petDetails.petType,
            Weight: petDetails.weight,
            Notes: petDetails.notes,
          };
          console.log(params);
          await axios.post(url, params);
          toast.success("Pet registered successfully!", {
            autoClose: 1500,
            theme: "colored",
          });

          navigate("/clientside/management/pets");
        } catch (error) {
          console.error("Error registering pet:", error);
          toast.error("An error occurred registering pet. Please try again.", {
            autoClose: 1500,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      console.error("Error registering pet:", error);
      toast.error("An error occurred. Please try again.", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const toggleBreedTable = () => {
    setShowBreedTable(!showBreedTable);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <ToastContainer position="top-center" />
      <Card style={{ width: "24rem", background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <MdPets size={40} className="mb-3" style={{ color: "var(--darkblue)" }} />
            <h1 className="h4">Register Pet</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPetType">
              <Form.Label>Pet Type</Form.Label>
              <Form.Control
                as="select"
                name="petType"
                value={petDetails.petType}
                onChange={handleOnChange}
              >
                <option value="">Select Pet Type</option>
                {Object.entries(petTypeMapping).map(([id, type]) => (
                  <option key={id} value={id}>{type}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBreed">
              <Form.Label>Breed ID</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  name="breed"
                  value={petDetails.breed}
                  onChange={handleOnChange}
                  placeholder="Enter breed ID"
                  min="1"
                />
                <Button
                  variant="info"
                  onClick={toggleBreedTable}
                  className="ml-2"
                  style={{ width: "70%" }}
                >
                  {showBreedTable ? "Hide Breeds" : "Show Breeds"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={petDetails.name}
                onChange={handleOnChange}
                placeholder="Enter pet name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                name="birthdate"
                value={petDetails.birthdate}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWeight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={petDetails.weight}
                onChange={handleOnChange}
                placeholder="Enter weight in kg"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={petDetails.notes}
                onChange={handleOnChange}
                placeholder="Enter any notes (optional)"
                maxLength={512}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Register Pet
              </Button>
              <Button variant="secondary" type="button" className="mb-3" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {showBreedTable && (
        <div style={{ marginLeft: "20px" }}>
          <div className="scrollableDiv datatable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Breed</th>
                </tr>
              </thead>
              <tbody>
                {breeds.map((breed, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      setPetDetails({
                        ...petDetails,
                        breed: breed.IDBreed.toString(),
                      })
                    }
                  >
                    <td>{breed.IDBreed}</td>
                    <td>{breed.BreedName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RegisterPet;
