import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Log() {
  const navigate = useNavigate();
  const location = useLocation();
  const { IDUser } = location.state as { IDUser: string };
  const [logs, setLogs] = useState<
    {
      IDLog: string;
      IDUser: string;
      Description: string;
      LogTypeName: string;
      DateTime: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/log/user/${IDUser}`
        );
        const logsList = response.data.map((obj: any) => ({
          IDLog: obj.IDLog,
          IDUser: obj.IDUser,
          Description: obj.Description,
          LogTypeName: obj.LogTypeName,
          DateTime: new Date(obj.DateTime).toLocaleString(),
        }));
        setLogs(logsList);
      } catch (error) {
        console.error("Error fetching logs:", error);
        toast.error("Failed to fetch logs", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };
    fetchLogs();
  }, [IDUser]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Container fluid>
        <Row className="mt-3">
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Log Type</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.IDLog}>
                    <td>{log.IDLog}</td>
                    <td>{log.DateTime}</td>
                    <td>{log.Description}</td>
                    <td>{log.LogTypeName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div className="center-text">
          <Button variant="primary" onClick={handleBack}>
            Go back
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Log;
