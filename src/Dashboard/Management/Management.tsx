import { SetStateAction, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ManagementData from "./ManagementData";
import { guestRedirection } from "../../Commons/AuthCommons";

const Management = () => {
  guestRedirection();
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([
    { id: 1, user: "example@gmail.com", role: "Veterinarian" },
    { id: 2, user: "example@gmail.com", role: "Veterinarian" },
    { id: 3, user: "example@gmail.com", role: "Admin" },
    { id: 4, user: "example@gmail.com", role: "Admin" },
    { id: 5, user: "example@gmail.com", role: "Manager" },
    { id: 6, user: "example@gmail.com", role: "Manager" },
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
                    <th>User ID</th>
                    <th>E-mail</th>
                    <th>Current role</th>
                    <th colSpan={2} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{users.map((client) => ManagementData(client))}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Management;
