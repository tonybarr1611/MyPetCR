import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

const setBackgroundWhite = () => {
  var html = document.getElementsByTagName("html");
  var body = document.getElementsByTagName("body");
  html[0].style.backgroundColor = "white";
  body[0].style.backgroundColor = "white";
};

function ClientSide() {
  setBackgroundWhite();

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" />
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/management" element={<Management />} /> */}
      </Routes>
    </div>
  );
}

export default ClientSide;
