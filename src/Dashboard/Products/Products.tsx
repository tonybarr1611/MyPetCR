import { Button, Container, Table } from "react-bootstrap";
import { getProducts, getProductsClient } from "../../ClientSide/Functions";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  typeID: number;
  type: string;
  stock: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      console.log(products);
      setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <Container>
      <h2>Products</h2>
      <p>Here you can manage the products of the store.</p>
      <Table striped bordered hover responsive>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Type</th>
          <th>Stock</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.type}</td>
              <td>{product.stock}</td>
              <td>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link to={`edit/${product.id}`}>
                    <Button variant="primary" className="ml-2">
                      <FaPencil />
                      Product
                    </Button>
                  </Link>
                  <Button variant="primary" className="ml-2">
                    <FaPencil />
                    Stock
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ textAlign: "center" }}>
        <Link to={`add`}>
          <Button>Add Product</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Products;
