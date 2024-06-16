import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import AccessDenied_SignIn from "./Pet Management/AccessDenied_SignIn";
import ClientOptions from "./Pet Management/ClientOptions";
import ClientPets from "./Pet Management/ClientPets/ClientPets";
import ClientAppointments from "./Pet Management/ClientAppointments/ClientAppointments";
import RegisterPet from "./Pet Management/ClientPets/RegisterPet";
import RequestAppointment from "./Pet Management/ClientAppointments/RequestAppointment";
import Profile from "./Profile";

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
        <Route path="/accessdeniedsignin" element={<AccessDenied_SignIn />} />
        <Route path="/management" element={<ClientOptions />} />
        <Route path="/management/pets" element={<ClientPets />} />
        <Route path="/management/appointments" element={<ClientAppointments />} />
        <Route path="/management/pets/addpet" element={<RegisterPet />} />
        <Route path="/management/appointments/requestappointment" element={<RequestAppointment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default ClientSide;
