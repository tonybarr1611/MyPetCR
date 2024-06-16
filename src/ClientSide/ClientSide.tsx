import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Homepage from "./Store/Homepage";
import ProductDetail from "./Store/Products/ProductDetail";
import Shop from "./Store/Products/Shop";
import Cart from "./Store/Checkout/Cart";

const setBackgroundWhite = () => {
  var html = document.getElementsByTagName("html");
  var body = document.getElementsByTagName("body");
  html[0].style.backgroundColor = "white";
  body[0].style.backgroundColor = "white";
};

const products = [
  {
    id: 1,
    name: "Dog food",
    type: "Product",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies.",
    price: 6000.0,
  },
  {
    id: 2,
    name: "Cat food",
    type: "Medicine",
    description: "Delicious cat food",
    price: 6500.0,
  },
  {
    id: 3,
    name: "Dog bed",
    type: "Medicine",
    description: "Comfortable dog bed",
    price: 12000.0,
  },
  {
    id: 4,
    name: "Cat bed",
    type: "Product",
    description: "Cozy cat bed",
    price: 11000.0,
  },
  {
    id: 5,
    name: "Dog leash",
    type: "Medicine",
    description: "Strong and durable dog leash",
    price: 3000.0,
  },
  {
    id: 6,
    name: "Cat collar",
    type: "Product",
    description: "Adjustable cat collar with bell",
    price: 1500.0,
  },
  {
    id: 7,
    name: "Dog toy",
    type: "Medicine",
    description: "Chewable dog toy",
    price: 2000.0,
  },
  {
    id: 8,
    name: "Cat toy",
    type: "Medicine",
    description: "Interactive cat toy",
    price: 1800.0,
  },
  // {
  //   id: 9,
  //   name: "Bird cage",
  //   type: "furniture",
  //   description: "Spacious bird cage",
  //   price: 8000.0,
  // },
  // {
  //   id: 10,
  //   name: "Fish tank",
  //   type: "furniture",
  //   description: "Glass fish tank",
  //   price: 15000.0,
  // },
  // {
  //   id: 11,
  //   name: "Hamster wheel",
  //   type: "toy",
  //   description: "Exercise wheel for hamsters",
  //   price: 1200.0,
  // },
  // {
  //   id: 12,
  //   name: "Rabbit food",
  //   type: "food",
  //   description: "Nutritious rabbit food",
  //   price: 5000.0,
  // },
  // {
  //   id: 13,
  //   name: "Bird food",
  //   type: "food",
  //   description: "Healthy bird food",
  //   price: 4500.0,
  // },
  // {
  //   id: 14,
  //   name: "Fish food",
  //   type: "food",
  //   description: "Premium fish food",
  //   price: 4000.0,
  // },
  // {
  //   id: 15,
  //   name: "Cat scratching post",
  //   type: "furniture",
  //   description: "Sturdy cat scratching post",
  //   price: 9000.0,
  // },
  // {
  //   id: 16,
  //   name: "Dog house",
  //   type: "furniture",
  //   description: "Outdoor dog house",
  //   price: 20000.0,
  // },
  // {
  //   id: 17,
  //   name: "Bird perch",
  //   type: "accessory",
  //   description: "Comfortable bird perch",
  //   price: 2500.0,
  // },
  // {
  //   id: 18,
  //   name: "Hamster bedding",
  //   type: "accessory",
  //   description: "Soft bedding for hamsters",
  //   price: 2200.0,
  // },
  // {
  //   id: 19,
  //   name: "Dog shampoo",
  //   type: "grooming",
  //   description: "Gentle dog shampoo",
  //   price: 1000.0,
  // },
  // {
  //   id: 20,
  //   name: "Cat litter",
  //   type: "grooming",
  //   description: "Clumping cat litter",
  //   price: 3000.0,
  // },
  // {
  //   id: 21,
  //   name: "Fish tank filter",
  //   type: "accessory",
  //   description: "Efficient fish tank filter",
  //   price: 3500.0,
  // },
  // {
  //   id: 22,
  //   name: "Rabbit cage",
  //   type: "furniture",
  //   description: "Spacious rabbit cage",
  //   price: 13000.0,
  // },
  // {
  //   id: 23,
  //   name: "Dog coat",
  //   type: "clothing",
  //   description: "Warm dog coat",
  //   price: 8000.0,
  // },
  // {
  //   id: 24,
  //   name: "Cat sweater",
  //   type: "clothing",
  //   description: "Cute cat sweater",
  //   price: 5000.0,
  // },
  // {
  //   id: 25,
  //   name: "Hamster food",
  //   type: "food",
  //   description: "Healthy hamster food",
  //   price: 3500.0,
  // },
  // {
  //   id: 26,
  //   name: "Bird bath",
  //   type: "accessory",
  //   description: "Bird bath for cages",
  //   price: 2700.0,
  // },
  // {
  //   id: 27,
  //   name: "Cat tree",
  //   type: "furniture",
  //   description: "Multi-level cat tree",
  //   price: 18000.0,
  // },
  // {
  //   id: 28,
  //   name: "Dog crate",
  //   type: "furniture",
  //   description: "Foldable dog crate",
  //   price: 14000.0,
  // },
  // {
  //   id: 29,
  //   name: "Fish tank heater",
  //   type: "accessory",
  //   description: "Adjustable fish tank heater",
  //   price: 3800.0,
  // },
  // {
  //   id: 30,
  //   name: "Rabbit water bottle",
  //   type: "accessory",
  //   description: "No-drip rabbit water bottle",
  //   price: 1800.0,
  // },
];

function ClientSide() {
  setBackgroundWhite();

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/management" element={<Management />} /> */}
      </Routes>
    </div>
  );
}

export default ClientSide;

export { products };
