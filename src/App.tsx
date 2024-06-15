import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./bootstrap/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "./Login/UserLogin";
import Register from "./Registration/RegisterPet";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
