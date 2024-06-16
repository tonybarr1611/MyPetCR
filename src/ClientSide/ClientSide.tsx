import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Homepage from "./Store/Homepage";
import ProductDetail from "./Store/Products/ProductDetail";

const setBackgroundWhite = () => {
  var html = document.getElementsByTagName("html");
  var body = document.getElementsByTagName("body");
  html[0].style.backgroundColor = "white";
  body[0].style.backgroundColor = "white";
};

function ClientSide() {
  setBackgroundWhite();

  const products = [
    {
      id: 1,
      name: "Dog food",
      type: "food",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. ",
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
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/management" element={<Management />} /> */}
      </Routes>
    </div>
  );
}

export default ClientSide;
