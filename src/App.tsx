import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./bootstrap/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
