import { useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { PlusCircleDotted } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';

const MedicalFileDetails = () => {
  const navigate = useNavigate();
  const { idParam } = useParams();

  const [status, setStatus] = useState('Completed');

  const appointmentData = {
    id: 101,
    status: 'Pending',
    petName: 'Buddy',
    owner: 'Tony',
    dateTime: '2023-06-01 10:00 AM',
    invoiceId: 5001,
  };

  const invoiceDetails = [
    { id: 1, product: 1001, description: 'Rabies Vaccine', quantity: 1, price: 50.00 },
    { id: 2, product: 1002, description: 'Heartworm Prevention', quantity: 3, price: 30.00 },
  ];

  const handleEditInvoiceDetail = (detailId: number) => {
    navigate(`medicalfileappointmentedit`);
  };

  const handleAddInvoiceDetail = () => {
    navigate(`medicalfileappointmentadd`); 
  };

  const handleStatusChange = (e: { target: { value: any; }; }) => {
    const newStatus = e.target.value;
    const currentStatus = appointmentData.status.toLowerCase();

    if (currentStatus === 'completed' || newStatus.toLowerCase() === 'completed') {
      toast.error("This appointment is already completed and cannot be edited.", { autoClose: 2000, theme: 'colored' });
      return;
    }
    else if (newStatus.toLowerCase() === 'completed') {
      disableCombobox();
      setStatus(newStatus);
    } 
    else { 
      setStatus(newStatus);
    }
  };

  const disableCombobox = () => {
    const combobox = document.querySelector('select');
    combobox!.setAttribute('disabled', 'true');
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
                  {appointmentData.status === 'Completed' || appointmentData.status === 'completed'? (
                    appointmentData.status
                  ) : (
                    <Form.Control as="select" value={status} onChange={handleStatusChange}>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
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

          <h3>Invoice Details</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Invoice Detail</th>
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  <td>{detail.product}</td>
                  <td>{detail.description}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.price.toFixed(2)}</td>
                  <td className="text-center">
                    {/* Edit button should be disabled if the appointment status is Completed */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditInvoiceDetail(detail.id)}
                      disabled={status === 'Completed'}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-center mt-3">
            <Button variant="success" onClick={handleAddInvoiceDetail}>
              <PlusCircleDotted size={24} className="mb-1 mr-1" /> Add Invoice Detail
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default MedicalFileDetails;
