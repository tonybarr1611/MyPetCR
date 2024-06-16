import { Container } from "react-bootstrap";
import Product from "./Products/Product";
import Banner from "./Banner";

function Homepage() {
  const products = [
    {
      id: 1,
      name: "Dog food",
      type: "food",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. ",
      price: 6000.0,
    },
    {
      id: 2,
      name: "Cat food",
      type: "food",
      description: "Delicious cat food",
      price: 6500.0,
    },
    {
      id: 3,
      name: "Dog bed",
      type: "furniture",
      description: "Comfortable dog bed",
      price: 12000.0,
    },
  ];

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
