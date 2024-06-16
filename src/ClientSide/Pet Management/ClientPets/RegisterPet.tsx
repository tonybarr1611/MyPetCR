import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";

const RegisterPet = () => {
  const navigate = useNavigate()
  const [petDetails, setPetDetails] = useState({
    petType: "",
    breed: "",
    name: "",
    birthdate: "",
    weight: "",
    notes: "",
  });

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setPetDetails({ ...petDetails, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate('/clientside/management/pets');
  }
  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let weightRegex = /^[0-9]+$/;

    try {
      if (
        !petDetails.petType &&
        !petDetails.breed &&
        !petDetails.name &&
        !petDetails.birthdate &&
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
          autoClose: 500,
          theme: "colored",
        });
      } else if (
        petDetails.petType &&
        petDetails.breed &&
        petDetails.name &&
        petDetails.birthdate &&
        petDetails.weight
      ) {
        toast.success("Pet registered successfully!", {
          autoClose: 1500,
          theme: "colored",
        });
        navigate('/clientside/management/pets');
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again.", {
        autoClose: 500,
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
            <MdPets
              size={40}
              className="mb-3"
              style={{ color: "var(--darkblue)" }}
            />
            <h1 className="h4">Register Pet</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPetType">
              <Form.Label>Pet Type</Form.Label>
              <Form.Control
                type="text"
                name="petType"
                value={petDetails.petType}
                onChange={handleOnChange}
                placeholder="Enter pet type (e.g., Dog)"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                name="breed"
                value={petDetails.breed}
                onChange={handleOnChange}
                placeholder="Enter breed"
              />
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
            <Button variant="primary" type="submit" className="w-100 mb-3 mr-5">
              Register Pet
            </Button>
            <Button variant="secondary" type="button" className="w-100 mb-3" onClick={handleCancel}>
              Cancel
            </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPet;
