import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getProductsClient } from "../Functions";
import { ProductProp, ProductDetailProps } from "./Products/ProductDetail";
import Product from "./Products/Product";
import Banner from "./Banner";

function Homepage() {
  const [products, setProducts] = useState<ProductProp[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductProp[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getProductsClient();
      setProducts(allProducts);
      const shuffledProducts = allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomProducts(shuffledProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Container className="mt-4">
        <Banner />
        <br />
        <h2 style={{ color: "#4D7381" }}>Recommended products</h2>
        <div className="productContainers">
          {randomProducts.map((product) => (
            <div key={product.id} className="col-md-2 col-sm-6 col-12">
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
