import axios from "axios";
import { backendURL } from "../main";

// Function that retrieves the data from the backend at "/product"
// and returns the data as an array of objects with the required format
async function getProductsClient() {
  const response = await axios.get(`${backendURL}product`);
  // Assuming response.data is an array of products
  return response.data
    .filter((product: { IDProductType: any }) => product.IDProductType !== 4)
    .map(
      (product: {
        IDProduct: any;
        ProductName: any;
        ProductTypeName: any;
        Description: any;
        Price: any;
      }) => ({
        id: product.IDProduct,
        name: product.ProductName,
        type: product.ProductTypeName,
        description: product.Description,
        price: product.Price,
      })
    );
}

// Function that retrieves the data from the backend at "/product/:id"
// and returns the data as an object with the required format
async function getProductByID(id: any) {
  const response = await axios.get(`${backendURL}product/${id}`);
  const product = response.data;
  return {
    id: product[0].IDProduct,
    name: product[0].ProductName,
    type: product[0].ProductTypeName,
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

export { getProductsClient, getProductByID };
export { getReviewsByID, getAverageRatingByID };