import { useEffect, useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import Product from "./Product";
// import { products } from "../../ClientSide";
import { getProductsClient } from "../../Functions";
import { ProductProp } from "./ProductDetail";
import "../Store.css";

function Shop() {
  const [searchValue, setSearchValue] = useState("");
  const [isProductChecked, setIsProductChecked] = useState(true);
  const [isMedicineChecked, setIsMedicineChecked] = useState(true);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState(maxPrice);
  const [products, setProducts] = useState<ProductProp[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getProductsClient();
      const maxP = Math.max(
        ...allProducts.map((product: { price: any }) => product.price)
      );
      setProducts(allProducts);
      setMaxPrice(maxP);
      setPrice(maxP);
    }
    fetchProducts();
  }, []);

  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
  };

  const handleChange = (e: { target: { value: string } }) => {
    setPrice(parseInt(e.target.value));
  };

  return (
    <div className="paddedContent">
      <div className="productContainers">
        <div className="oneColumnSpan">
          <Container className="borderedContainer">
            <h2>Filters</h2>
            <h4 style={{ paddingLeft: "5%" }}>Category</h4>
            <Form.Check
              style={{ paddingLeft: "15%" }}
              type="checkbox"
              label="Product"
              name="category"
              id="product"
              onChange={() => setIsProductChecked(!isProductChecked)}
              defaultChecked
            />
            <Form.Check
              style={{ paddingLeft: "15%" }}
              type="checkbox"
              label="Medicine"
              name="category"
              id="accessory"
              onChange={() => setIsMedicineChecked(!isMedicineChecked)}
              defaultChecked
            />
            <h4 style={{ paddingLeft: "5%" }}>Price</h4>
            <div style={{ paddingLeft: "10%" }}>
              Showing results with prices lower than{" "}
              {price.toLocaleString("es-CR", {
                style: "currency",
                currency: "CRC",
              })}
            </div>
            <Form.Control
              type="range"
              min={0}
              max={maxPrice}
              defaultValue={maxPrice}
              step={maxPrice / 10}
              name="price"
              onChange={handleChange}
            />
          </Container>
        </div>
        <div className="twoColumnSpan">
          <h2>Products</h2>
          <Container>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                name="search"
                onChange={handleSearchChange}
              />
            </Col>
            <div className="productContainers">
              {products
                .filter(
                  (product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) &&
                    ((isProductChecked && product.type === "Product") ||
                      (isMedicineChecked && product.type === "Medicine")) &&
                    product.price <= price
                )
                .map((product) => (
                  <div>
                    <Product key={product.id} {...product} />
                  </div>
                ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Shop;
