import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import "./Dashboard.css";
import SearchMFile from "../Login/Appointments";

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
        <Route path="/" />
        <Route path="/clients" />
        <Route path="/appointments" element={<SearchMFile />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
