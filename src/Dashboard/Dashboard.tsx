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
import MedicalFileDetails from "./MedicalFiles/MedicalFileDetails";
import MedicalFileAppointmentEdit from "./MedicalFiles/MedicalFileAppointmentEdit";
import MedicalFileAppointmentAdd from "./MedicalFiles/MedicalFileAppointmentAdd";
import AccessDenied from "./AccessDenied";
import StoreClinicOptions from "./StoreClinicOptions";
import { guestRedirection, handleExpiration } from "../Commons/AuthCommons";
import Products from "./Products/Products";
import ProductEdit from "./Products/ProductEdit";
import ProductAdd from "./Products/ProductAdd";
import ProductStock from "./Products/ProductStock";
import ProductStockEdit from "./Products/ProductStockEdit";
import Log from "./Management/Log";

const setBackgroundWhite = () => {
  var html = document.getElementsByTagName("html");
  var body = document.getElementsByTagName("body");
  html[0].style.backgroundColor = "white";
  body[0].style.backgroundColor = "white";
};

function Dashboard() {
  // Change html, body property
  setBackgroundWhite();
  guestRedirection();
  handleExpiration();

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<StoreClinicOptions />} />
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
        <Route path="/management" element={<Management />} />
        <Route path="/management/log" element={<Log />} />
        <Route path="/medicalfiles" element={<MedicalFiles />} />
        <Route path="/medicalfiles/info" element={<MedicalFileInfo />} />
        <Route
          path="/medicalfiles/info/details"
          element={<MedicalFileDetails />}
        />
        <Route
          path="/medicalfiles/info/details/edit"
          element={<MedicalFileAppointmentEdit />}
        />
        <Route
          path="/medicalfiles/info/details/add"
          element={<MedicalFileAppointmentAdd />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
        <Route path="/products/stock/:id" element={<ProductStock />} />
        <Route path="/products/stock/:id/edit" element={<ProductStockEdit />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/accessdenied" element={<AccessDenied />} />
        <Route path="/storeclinic" element={<StoreClinicOptions />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
