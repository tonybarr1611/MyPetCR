import {
  Container,
  Button,
  Card,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { products } from "../../ClientSide";
import { CartProduct } from "./Cart";
import { FaCreditCard } from "react-icons/fa";
import CartData from "./CartData";
import "../Store.css";
import {
  checkStock,
  clearCart,
  createInvoice,
  getCartEntries,
  getClientAddresses,
} from "../../Functions";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface FormState {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  transactionNumber: string;
  transferNumber: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Address {
  id: number;
  province: string;
  city: string;
  district: string;
  zipCode: string;
  description: string;
}

function Checkout() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [shipping, setShipping] = useState(false);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    transactionNumber: "",
    transferNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      const cart = await getCartEntries();
      setCart(cart);
    }
    async function fetchAddresses() {
      const addresses = await getClientAddresses();
      setSavedAddresses(addresses);
    }
    fetchCart();
    fetchAddresses();
  }, []);

  const toggleCartVisibility = () => {
    setShowCart(!showCart);
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let errors: FormErrors = {};

    if (!form.fullName) errors.fullName = "Full Name is required";
    if (!form.address) errors.address = "Address is required";
    if (!form.city) errors.city = "City is required";
    if (!form.country) errors.country = "Country is required";
    if (!form.postalCode) errors.postalCode = "Postal Code is required";

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(form.cardNumber))
        errors.cardNumber = "Card Number must be 16 digits";
      if (!/^\d{2}\/\d{2,4}$/.test(form.expirationDate)) {
        errors.expirationDate =
          "Expiration Date must be in MM/YY or MM/YYYY format";
      } else {
        const [month, year] = form.expirationDate.split("/");
        const currentYear = new Date().getFullYear() % 100;
        const expYear = parseInt(year, 10);
        if (
          expYear < currentYear ||
          (expYear === currentYear &&
            parseInt(month, 10) < new Date().getMonth() + 1)
        ) {
          errors.expirationDate = "Expiration Date must be in the future";
        }
      }
      if (!/^\d{3}$/.test(form.cvv)) errors.cvv = "CVV must be 3 digits";
    }

    if (paymentMethod === "sinpe" && !form.transactionNumber)
      errors.transactionNumber = "Transaction Number is required";
    if (paymentMethod === "transfer" && !form.transferNumber)
      errors.transferNumber = "Transfer Number is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      const stockCheck = await checkStock();
      if (stockCheck) {
        await createInvoice(shipping);
        clearCart();
        toast.success("Purchase successful");
        window.location.assign("/clientside");
        setSubmitted(true);
      } else {
        toast.error("Not enough stock to complete purchase");
        setSubmitted(false);
      }
    } else {
      setSubmitted(false);
    }
  };

  const shippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setShipping(true);
    } else {
      setShipping(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container>
        <h1 style={{ paddingTop: "2%" }}>Checkout</h1>
        <h3>Your cart is empty</h3>
        <Button onClick={() => window.location.assign("/clientside")}>
          Back to store
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <ToastContainer />
      <h1 style={{ paddingTop: "2%" }}>Checkout</h1>
      <Button onClick={toggleCartVisibility} className="mb-3">
        {showCart ? "Hide Cart" : "Show Cart"}
      </Button>
      {showCart && (
        <>
          {cart.length === 0 ? (
            <h3>Your cart is empty</h3>
          ) : (
            cart.map((product) => (
              <CartData key={product.id} product={product} modifiable={false} />
            ))
          )}
        </>
      )}
      <Row>
        <Col>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Billing and shipping Information</Card.Title>
              <Form>
                <Form.Group controlId="formFullName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCity" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCountry" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    isInvalid={!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPostalCode" className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your postal code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    isInvalid={!!errors.postalCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postalCode}
                  </Form.Control.Feedback>
                  <Form.Group
                    controlId="formShippingBool"
                    className="mt-3 mb-3"
                  >
                    <Form.Label> Do you want shipping? </Form.Label>
                    <Form.Check
                      className="ml-4"
                      type="checkbox"
                      id="shippingBool"
                      label="Yes"
                      name="shippingBool"
                      value="true"
                      defaultChecked={false}
                      onChange={shippingChange}
                    />
                  </Form.Group>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Payment Information</Card.Title>
              <Card.Text>
                Your total is {"   "}
                <strong style={{ fontSize: "120%" }}>
                  {(
                    cart.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0
                    ) + (shipping ? 3000 : 0)
                  ).toLocaleString("es-CR", {
                    style: "currency",
                    currency: "CRC",
                  })}
                </strong>
              </Card.Text>
              <Form>
                <Form.Group controlId="formPaymentMethod" className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <div>
                    <Row>
                      <Col>
                        <Form.Check
                          inline
                          type="radio"
                          label="Card"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={handlePaymentMethodChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          inline
                          type="radio"
                          label="SINPE"
                          name="paymentMethod"
                          value="sinpe"
                          checked={paymentMethod === "sinpe"}
                          onChange={handlePaymentMethodChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          inline
                          type="radio"
                          label="Transfer"
                          name="paymentMethod"
                          value="transfer"
                          checked={paymentMethod === "transfer"}
                          onChange={handlePaymentMethodChange}
                        />
                      </Col>
                    </Row>
                  </div>
                </Form.Group>

                {paymentMethod === "card" && (
                  <>
                    <Form.Group controlId="formCardNumber" className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your card number"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        isInvalid={!!errors.cardNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formExpirationDate" className="mb-3">
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your card expiration date"
                        name="expirationDate"
                        value={form.expirationDate}
                        onChange={handleChange}
                        isInvalid={!!errors.expirationDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.expirationDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCVV" className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your CVV"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        isInvalid={!!errors.cvv}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cvv}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                {paymentMethod === "sinpe" && (
                  <Form.Group
                    controlId="formTransactionNumber"
                    className="mb-3"
                  >
                    <Form.Label>Transaction Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your transaction number"
                      name="transactionNumber"
                      value={form.transactionNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.transactionNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.transactionNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {paymentMethod === "transfer" && (
                  <Form.Group controlId="formTransferNumber" className="mb-3">
                    <Form.Label>Transfer Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your transfer number"
                      name="transferNumber"
                      value={form.transferNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.transferNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.transferNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Form>
              <br />
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="centerBtn">
        <Button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
          className="mt-3"
        >
          <FaCreditCard /> {"   "}
          Confirm purchase
        </Button>
      </div>

      {submitted && (
        <Alert variant="success" className="centerBtn">
          Form submitted successfully!
          {/* TODO handle payment submit */}
        </Alert>
      )}
    </Container>
  );
}

export default Checkout;
