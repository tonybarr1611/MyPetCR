import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./bootstrap/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "./Login/UserLogin";
import Dashboard from "./Dashboard/Dashboard";
import ClientSide from "./ClientSide/ClientSide";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/clientside/*" element={<ClientSide />} />
      </Routes>
    </Router>
  );
}

export default App;
