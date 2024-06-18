import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import { guestRedirection, handleExpiration } from "../../Commons/AuthCommons";
import axios from "axios";

const MedicalFileDetails = () => {
  guestRedirection();
  handleExpiration();
  const location = useLocation();
  const id = location.state;
  
  const statusOptions = [
    { value: "1", label: "Pending" },
    { value: "2", label: "Confirmed" },
    { value: "3", label: "Cancelled" },
    { value: "4", label: "Completed" }
  ];

  const formatDate = (date: string | any[]) => {  
    return `${date.slice(0, 10)} ${date.slice(11, 16)}`;
  }

  const [appointmentData, setAppointmentData] = useState({
    id: "",
    status: "",
    petName: "",
    owner: "",
    dateTime: "",
    invoiceId: ""
  });
  const [status, setStatus] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState<{ id: string; product: string; description: string; quantity: number; price: number ; productID: string }[]>([]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/appointment/${id}`);
        setAppointmentData({
          id: response.data[0].IDAppointment,
          status: response.data[0].StatusName,
          petName: response.data[0].PetName,
          owner: response.data[0].ClientName,
          dateTime: formatDate(response.data[0].DateTime),
          invoiceId: response.data[0].IDInvoice
        });
        setStatus(response.data[0].IDStatus.toString()); 
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        toast.error("Failed to fetch appointment data", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    fetchAppointmentData();
  }, [id]);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/invoiceDetail/appointment/${id}`);
        const invoicesdetaillist = response.data.map((obj : any) => ({
          id: obj.IDInvoiceDetail,
          product: obj.Name,
          description: obj.Description,
          quantity: obj.Quantity,
          price: obj.Price,
          productID: obj.IDProduct
        }));
        setInvoiceDetails(invoicesdetaillist);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
        toast.error("Failed to fetch invoice details", {
          autoClose: 1500,
          theme: "colored",
        });
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const handleStatusChange = async (event: { target: { value: any; }; }) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      const url = `http://localhost:8080/api/v1/appointment/${id}`;
      const params = { IDStatus: newStatus };
      axios.put(url, params);
      toast.success("Appointment status updated successfully", {
        autoClose: 1500,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", {
        autoClose: 1500,
        theme: "colored",
      });
    }

    if (newStatus === "4") { // "Completed"
      disableCombobox();
    }
  };

  const disableCombobox = () => {
    const combobox = document.querySelector("select");
    if (combobox) {
      combobox.setAttribute("disabled", "true");
    }
  };

  const calculateTotal = () => {
    const total = invoiceDetails.reduce((total, item) => total + item.price, 0);
    return total.toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
    });
  };

  const registerPayment = async () => {
    setStatus("4"); // "Completed"
    disableCombobox();
    toast.success("Payment registered successfully");

    try {
      const url = `http://localhost:8080/api/v1/appointment/${id}`;
      const params = { IDStatus: "4" };
      axios.put(url, params);
    } catch (error) {
      console.error("Error registering payment:", error);
      toast.error("Failed to register payment", {
        autoClose: 1500,
        theme: "colored",
      });
    }
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={12}>
          <h2>Medical File Details</h2>
          <Table striped bordered hover responsive className="mb-3">
            <tbody>
              <tr>
                <td>ID Appointment</td>
                <td>{appointmentData.id}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  {status === "4" ? (
                    statusOptions.find(option => option.value === status)?.label
                  ) : (
                    <Form.Control
                      as="select"
                      value={status}
                      id="statusCombobox"
                      onChange={handleStatusChange}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </Form.Control>
                  )}
                </td>
              </tr>
              <tr>
                <td>Dog</td>
                <td>{appointmentData.petName}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{appointmentData.owner}</td>
              </tr>
              <tr>
                <td>Date/Time</td>
                <td>{appointmentData.dateTime}</td>
              </tr>
              <tr>
                <td>ID Invoice</td>
                <td>{appointmentData.invoiceId}</td>
              </tr>
            </tbody>
          </Table>

          <h3>Procedures</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Invoice Detail</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.map((invoiceDetail) => (
                <tr key={invoiceDetail.id}>
                  <td>{invoiceDetail.id}</td>
                  <td>{invoiceDetail.product}</td>
                  <td>{invoiceDetail.description}</td>
                  <td>{invoiceDetail.quantity}</td>
                  <td>{invoiceDetail.price.toFixed(2)}</td>
                  <td className="text-center">
                    <Link to={"edit"} state={{ id: invoiceDetail.id, productid: invoiceDetail.productID }}>
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={status === "4"}
                      >
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-center mt-3">
            <Link to="add" state={{id: appointmentData.invoiceId}}>
              <Button
                variant="success"
                disabled={status === "4"}>
                <PlusCircleDotted size={24} className="mb-1 mr-1" /> Add Procedure
              </Button>
            </Link>
          </div>
          <div className="mt-5 text-center">
            <h4>Total Invoice Amount: {calculateTotal()}</h4>
            <Button 
              variant="primary" 
              onClick={registerPayment} 
              disabled={status === "4"}
            >
              Register Payment
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default MedicalFileDetails;
