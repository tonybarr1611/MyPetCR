import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdVaccines } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const AddMedicalFileAppointment = () => {
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    productId: '',
    productName: '',
    description: '',
    quantity: 1,
  });

  const [products, setProducts] = useState<{ id: number; name: string; description: string; }[]>([]);
  const [showProductTable, setShowProductTable] = useState(false);

  useEffect(() => {
    // Fetch products data from backend
    setProducts([
      { id: 1001, name: 'Rabies Vaccine', description: 'Vaccine for rabies prevention' },
      { id: 1002, name: 'Feline Vaccine', description: 'Vaccine for feline diseases' },
      // Add more products as needed
    ]);
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (!detail.productName || !detail.description || !detail.quantity) {
        toast.error("All fields are required", { autoClose: 1500, theme: 'colored' });
      } else {
        // Backend request logic to add the detail using detail data
        toast.success("Detail added successfully", { autoClose: 1500, theme: 'colored' });
        navigate('/dashboard/medicalfiles/medicalfileinfo/medicalfiledetails');
      }
    } catch (error) {
      toast.error("An error occurred while adding the detail", { autoClose: 1500, theme: 'colored' });
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/medicalfiles/medicalfileinfo/medicalfiledetails');
  };

  const toggleProductTable = () => {
    setShowProductTable(!showProductTable);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <ToastContainer position="top-center" />
      <Card style={{ width: '24rem', background: "#C9E5F0" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <MdVaccines size={40} className="mb-3" style={{ color: 'var(--darkblue)' }} />
            <h1 className="h4">Add Invoice Detail</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="productName"
                  value={detail.productName}
                  onChange={handleChange}
                />
                <Button variant="info" onClick={toggleProductTable} className="ml-2" style={{ width: '70%' }}>
                  {showProductTable ? 'Hide Products' : 'Show Products'}
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={detail.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mb-3">
                Add Detail
              </Button>
              <Button variant="secondary" type="button" className="mb-3" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {showProductTable && (
        <div style={{ marginLeft: '20px' }}>
          <div className="scrollableDiv datatable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} onClick={() => setDetail({ ...detail, productId: product.id.toString(), productName: product.name, description: product.description })}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
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

export default AddMedicalFileAppointment;
