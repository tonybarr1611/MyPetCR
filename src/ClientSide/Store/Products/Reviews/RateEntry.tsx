import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Product } from "../ProductDetail";

interface RateEntryProps {
  show: boolean;
  handleClose: () => void;
  productRated: Product; // Replace 'any' with the appropriate type
}

function RateEntry({ show, handleClose, productRated }: RateEntryProps) {
  const [textInput, setTextInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log(textInput);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Review product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formText">
            <Form.Control
              as="textarea"
              rows={5}
              value={textInput}
              onChange={handleChange}
              placeholder="Enter text here"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          style={{ backgroundColor: "#F0E3DA", color: "black", border: "none" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RateEntry;
