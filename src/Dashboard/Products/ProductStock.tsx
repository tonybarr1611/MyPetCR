import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Inventory {
  storeID: number;
  location: string;
  stock: number;
  hasStock: boolean;
}

function ProductStock() {
  const { id } = useParams();
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInventory() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/inventory/${id}`
      );
      const formattedInventory = response.data.map(
        (item: {
          IDStore: any;
          Location: any;
          Quantity: any;
          HasInventory: any;
        }) => ({
          storeID: item.IDStore,
          location: item.Location,
          stock: item.Quantity,
          hasStock: item.HasInventory === "true",
        })
      );
      console.log(formattedInventory);
      setInventory(formattedInventory);
    }
    fetchInventory();
  }, []);

  const handleConfirm = (e: any) => {
    e.preventDefault();
    navigate("/dashboard/products");
  };

  return (
    <Container className="mt-4">
      <h2>Product Stock</h2>
      <p>Here you can manage the stock of the product.</p>
      <p>Product ID: {id}</p>
      <Table striped bordered hover responsive>
        <thead>
          <th>Store ID</th>
          <th>Location</th>
          <th>Stock</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.storeID}>
              <td>{item.storeID}</td>
              <td>{item.location}</td>
              <td>{item.stock}</td>
              <td>
                <Link
                  to={`edit`}
                  state={{
                    productID: id,
                    storeID: item.storeID,
                    stock: item.stock,
                    hasStock: item.hasStock,
                  }}
                >
                  <Button variant="primary" className="ml-2">
                    <FaPencil />
                    Stock
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </div>
    </Container>
  );
}

export default ProductStock;
