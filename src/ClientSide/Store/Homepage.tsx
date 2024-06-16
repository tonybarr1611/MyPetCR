import { Container } from "react-bootstrap";
import Product from "./Products/Product";
import Banner from "./Banner";
import { products } from "../ClientSide";

function Homepage() {
  return (
    <div>
      <Container className="mt-4">
        <Banner />
        <br />
        <h2 style={{ color: "#4D7381" }}>Recommended products</h2>
        <div className="productContainers">
          {products.map((product) => (
            <div className="col-md-2 col-sm-6 col-12">
              <Product
                id={product.id}
                name={product.name}
                type={product.type}
                description={product.description}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Homepage;
