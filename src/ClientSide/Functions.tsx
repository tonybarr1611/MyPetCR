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

export { getProductsClient };
