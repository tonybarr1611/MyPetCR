import { SetStateAction, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import { ToastContainer, toast } from "react-toastify";
import { PlusLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ClientsData from "./ClientsData";
import axios from "axios";
import logger from "../../log";

const Clients = () => {
  guestRedirection();
  handleExpiration();
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/client");
        const newList = response.data.map((obj: any) => ({
          id: obj.IDClient,
          name: obj.Name,
          phonenumber: obj.PhoneNumber,
        }));
        setClients(newList);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to fetch clients", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchClients();
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

  const handleAddClient = () => {
    logger.request(`The user has requested to add a client`);
    navigate("registerclient");
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
                  <Button
                    variant="primary"
                    type="button"
                    className="me-2"
                    onClick={handleAddClient}
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
                    <th>Client ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th colSpan={2} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length > 0 &&
                    clients
                      .filter(
                        (client: any) =>
                          !client.name.toLowerCase().includes("mockuser") &&
                          (searchTerm === "" ||
                            client.name.toLowerCase().includes(searchTerm) ||
                            String(client.id)
                              .toLowerCase()
                              .includes(searchTerm))
                      )
                      .map((client: any) => (
                        <ClientsData key={client.id} {...client} />
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
