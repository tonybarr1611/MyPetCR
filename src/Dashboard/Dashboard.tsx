import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import "./Dashboard.css";

const setBackgroundWhite = () => {
  var html = document.getElementsByTagName("html");
  var body = document.getElementsByTagName("body");
  html[0].style.backgroundColor = "white";
  body[0].style.backgroundColor = "white";
};

function Dashboard() {
  // Change html, body property
  setBackgroundWhite();
  return (
    <div>
      <NavBar />
      <Routes>
        {/* Routes shall be included relative to the last route, at this point every route has already considered localhost:5173/dashboard */}
        <Route path="/" />
        <Route path="/clients" />
        <Route path="/appointments" />
      </Routes>
    </div>
  );
}

export default Dashboard;
