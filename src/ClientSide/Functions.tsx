import axios from "axios";
import { backendURL } from "../main";
import logger from "../logs";

// Get ClientID from localStorage
function getClientID() {
  const client = JSON.parse(localStorage.getItem("client") || "{}");
  return client.IDClient;
}

function getUserID() {
  const client = JSON.parse(localStorage.getItem("client") || "{}");
  return client.IDUser;
}

async function getProducts() {
  const response = await axios.get(`${backendURL}product`);
  return response.data.map(
    (product: {
      IDProduct: any;
      ProductName: any;
      IDProductType: any;
      ProductTypeName: any;
      URL: any;
      Description: any;
      Price: any;
      Stock: any;
    }) => ({
      id: product.IDProduct,
      name: product.ProductName,
      url: product.URL,
      typeID: product.IDProductType,
      type: product.ProductTypeName,
      description: product.Description,
      price: product.Price,
      stock: product.Stock,
    })
  );
}

// Function that retrieves the data from the backend at "/product"
// and returns the data as an array of objects with the required format
async function getProductsClient() {
  const response = await getProducts();
  // Assuming response.data is an array of products
  return response.filter(
    (product: { typeID: any }) => (
      console.log(product.typeID), parseInt(product.typeID) !== 3
    )
  );
}

// Function that retrieves the data from the backend at "/product/:id"
// and returns the data as an object with the required format
async function getProductByID(id: any) {
  const response = await axios.get(`${backendURL}product/${id}`);
  const product = response.data;
  logger.info(`A product has been viewed by the user: ID: ${product[0].IDProduct} - ${product[0].ProductName}`);
  return {
    id: product[0].IDProduct,
    name: product[0].ProductName,
    type: product[0].ProductTypeName,
    url: product[0].URL,
    description: product[0].Description,
    price: product[0].Price,
  };
}

// Function that retrieves the data from the backend at "/review/:id"
// and returns the data as an array of objects with the required format
async function getReviewsByID(id: any) {
  const response = await axios.get(`${backendURL}review/${id}`);
  return response.data.map(
    (review: {
      IDReview: any;
      ClientName: any;
      Rating: any;
      ReviewDescription: any;
    }) => ({
      id: review.IDReview,
      user: review.ClientName,
      rate: review.Rating,
      reviewDesc: review.ReviewDescription,
    })
  );
}

// Function that retrieves the data from the backend at "/review/average/:id"
// and returns the data as an object with the required format
async function getAverageRatingByID(id: any) {
  const response = await axios.get(`${backendURL}review/average/${id}`);
  return response.data[0].Average;
}

// Function that adds a product to the cart
async function addCartEntry(productID: any, quantity: any) {
  const clientID = getClientID();
  logger.info(`The user has added ${quantity} (Product ID: ${productID}) to the product cart.`)
  const currentCart = await axios.get(
    `${backendURL}cart/${clientID}/${productID}`
  );

  if (currentCart.data.length === 0) {
    await axios.post(`${backendURL}cart`, {
      IDClient: clientID,
      IDProduct: productID,
      Quantity: 1,
    });
  } else {
    const newQuantity = currentCart.data[0].Quantity + quantity;
    console.log("New Quantity: ", newQuantity);
    if (newQuantity > 0)
      await axios.put(`${backendURL}cart/${clientID}/${productID}`, {
        Quantity: currentCart.data[0].Quantity + quantity,
      });
    else await axios.delete(`${backendURL}cart/${clientID}/${productID}`);
  }
}

// Function that retrieves the data from the backend at "/cart/:idClient"
// and returns the data as an array of objects with the required format
async function getCartEntries() {
  const clientID = getClientID();
  const response = await axios.get(`${backendURL}cart/${clientID}`);
  logger.info(`The user has entered the shopping cart`)
  return response.data.map(
    (entry: {
      IDProduct: any;
      ProductType: any;
      URL: any;
      ProductName: any;
      ProductDescription: any;
      ProductPrice: any;
      CartQuantity: any;
    }) => ({
      id: entry.IDProduct,
      type: entry.ProductType,
      url: entry.URL,
      name: entry.ProductName,
      description: entry.ProductDescription,
      price: entry.ProductPrice,
      quantity: entry.CartQuantity,
    })
  );
}

// Clear cart by client ID
async function clearCart() {
  await axios.delete(`${backendURL}cart/${getClientID()}`);
}

// Get client and user data from the backend
async function getProfileData() {
  const client = JSON.parse(localStorage.getItem("client") || "{}");
  const clientDB = await axios.get(`${backendURL}client/${client.IDClient}`);
  return {
    name: client.Name,
    email: client.LoginID,
    phone: clientDB.data[0].PhoneNumber,
  };
}

// Check stock of products in cart
async function checkStock() {
  console.log("Checking stock...");
  const clientID = getClientID();
  const response = await axios.get(`${backendURL}cart/stock/${clientID}`);
  console.log("Stock response: ");
  // console.log(response);
  // console.log(response.status);
  // The response (response.data[0].BoolValue) is either "True" or "False" but in string format, parse it to boolean
  return response.data[0].BoolValue === "True";
}

// Create invoice from cart
async function createInvoice(shipping: boolean) {
  const clientID = getClientID();
  const paymentID = "1";
  const response = await axios.post(`${backendURL}invoiceByCart`, {
    IDClient: clientID,
    IDPayment: paymentID,
    Shipping: shipping ? "True" : "False",
  });
  logger.info(`The user has made a purchase`)
}

async function getClientAddresses() {
  const clientID = getClientID();
  const response = await axios.get(`${backendURL}address/${clientID}`);
  return response.data.map(
    (address: {
      IDAddress: any;
      Province: any;
      City: any;
      District: any;
      ZIPCode: any;
      Description: any;
    }) => ({
      id: address.IDAddress,
      province: address.Province,
      city: address.City,
      district: address.District,
      zipCode: address.ZIPCode,
      description: address.Description,
    })
  );
}

// login guest
async function loginGuest() {
  const response = await axios.get(`${backendURL}clientMock`);
  console.log(response.data);
  return response.data;
}

// get client invoices
async function getClientInvoices() {
  const clientID = getClientID();
  const response = await axios.get(`${backendURL}invoice/client/${clientID}`);
  // Map the data
  return response.data.map(
    (invoice: {
      IDInvoice: any;
      InvoiceDateTime: any;
      TotalPrice: any;
      StatusName: any;
    }) => ({
      id: invoice.IDInvoice,
      date: new Date(invoice.InvoiceDateTime).toLocaleString(),
      total: invoice.TotalPrice,
      status: invoice.StatusName,
    })
  );
}

// Create review
async function createReview(productID: any, rating: any, review: any) {
  const clientID = getClientID();
  await axios.post(`${backendURL}review`, {
    IDProduct: productID,
    IDClient: clientID,
    Description: review,
    Rating: rating,
    DateTime: new Date().toISOString(),
  });
}

export { getProducts, getProductsClient, getProductByID };
export { getReviewsByID, getAverageRatingByID };
export { addCartEntry, getCartEntries, clearCart };
export { getProfileData };
export { checkStock, createInvoice };
export { getClientAddresses };
export { loginGuest };
export { getClientInvoices };
export { createReview };
export { getClientID };
export { getUserID }