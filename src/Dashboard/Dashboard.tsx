import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import "./Dashboard.css";
import Appointments from "./Appointments/Appointments";
import RegisterAppointment from "./Appointments/RegisterAppointment";
import RegisterAppointmentDetails from "./Appointments/RegisterAppointmentDetails";
import EditAppointment from "./Appointments/EditAppointment";
import Clients from "./Clients/Clients";
import RegisterClient from "./Clients/RegisterClient";
import EditClient from "./Clients/EditClient";
import Management from "./Management/Management";
import MedicalFiles from "./MedicalFiles/MedicalFiles";
import MedicalFileInfo from "./MedicalFiles/MedicalFileInfo";
//import MedicalFileDetails from "./MedicalFiles/MedicalFileDetails";


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
        <Route path="/appointments" element={<Appointments />} />
        <Route
          path="/appointments/registerappointment"
          element={<RegisterAppointment />}
        />
        <Route
          path="/appointments/registerappointment/registerappointmentdetails"
          element={<RegisterAppointmentDetails />}
        />
        <Route
          path="/appointments/editappointment"
          element={<EditAppointment />}
        />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/registerclient" element={<RegisterClient />} />
        <Route path="/clients/editclient" element={<EditClient />} />
        <Route path="management" element={<Management />} />
        <Route path="/medicalfiles" element={< MedicalFiles />} />
        <Route path="/medicalfiles/medicalfileInfo" element={< MedicalFileInfo />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
