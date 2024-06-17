import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ManagementData from "./ManagementData";
import { guestRedirection } from "../../Commons/AuthCommons";

const Management = () => {
  guestRedirection();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user");
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        throw new Error("Response data is not an array");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Error fetching users", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredUsers = users.filter((user) =>
      user.LoginID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleUpgrade = async (id) => {
    try {
      const userToUpdate = users.find((user) => user.IDUser === id);
      if (!userToUpdate) {
        throw new Error(`User with ID ${id} not found`);
      }

      let newIDUserType;
      // Example logic: Increment IDUserType
      if (userToUpdate.IDUserType === 1) {
        newIDUserType = 2; // Upgrade from level 1 to level 2
      } else if (userToUpdate.IDUserType === 2) {
        newIDUserType = 3; // Upgrade from level 2 to level 3
      } else {
        newIDUserType = userToUpdate.IDUserType; // Handle other cases gracefully
      }

      const response = await axios.put(`http://localhost:8080/api/v1/user/${id}`, {
        IDUserType: newIDUserType,
      });
      
      if (response.status === 200) {
        fetchUsers(); // Refresh users list after upgrade
        toast.success("User level upgraded successfully", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error upgrading user level:", error);
      toast.error("Error upgrading user level", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  const handleDowngrade = async (id) => {
    try {
      const userToUpdate = users.find((user) => user.IDUser === id);
      if (!userToUpdate) {
        throw new Error(`User with ID ${id} not found`);
      }

      let newIDUserType;
      // Example logic: Decrement IDUserType
      if (userToUpdate.IDUserType === 3) {
        newIDUserType = 2; // Downgrade from level 3 to level 2
      } else if (userToUpdate.IDUserType === 2) {
        newIDUserType = 1; // Downgrade from level 2 to level 1
      } else {
        newIDUserType = userToUpdate.IDUserType; // Handle other cases gracefully
      }

      const response = await axios.put(`http://localhost:8080/api/v1/user/${id}`, {
        IDUserType: newIDUserType,
      });
      
      if (response.status === 200) {
        fetchUsers(); // Refresh users list after downgrade
        toast.success("User level downgraded successfully", {
          autoClose: 1500,
          theme: "colored",
        });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error downgrading user level:", error);
      toast.error("Error downgrading user level", {
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
                    value={searchTerm}
                  />
                </Col>
                <Col>
                  <Button type="submit">Search</Button>
                </Col>
              </Row>
            </Form>
            <div className="contain-table">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Login ID</th>
                    <th>User Type</th>
                    <th colSpan={2} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <ManagementData
                        key={user.IDUser}
                        id={user.IDUser}
                        user={user.LoginID}
                        role={user.UserTypeName} // Assuming UserTypeName is the role
                        handleUpgrade={() => handleUpgrade(user.IDUser)}
                        handleDowngrade={() => handleDowngrade(user.IDUser)}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Management;