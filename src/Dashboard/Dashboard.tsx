import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import "./Dashboard.css";
import Appointments from "../Login/Appointments";
import RegisterAppointment from "../Registration/RegisterAppointment";
import EditAppointment from "../Edit/EditAppointment";
import Clients from "../Clients/Clients";
import RegisterClient from "../Registration/RegisterClient";
import EditClient from "../Edit/EditClient";

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
        <Route path="/appointments" element={< Appointments />} />
        <Route path="/appointments/registerappointment" element={< RegisterAppointment />}/>
        <Route path="/appointments/editappointment" element={< EditAppointment />} />
        <Route path="/clients" element={< Clients />} />
        <Route path="/clients/registerclient" element={< RegisterClient />} />
        <Route path="/clients/editclient" element={< EditClient />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
