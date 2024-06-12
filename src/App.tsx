import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./bootstrap/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login/Login";
import Register from "./Login/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      {<Route path="/register" element={< Register />} />
      /*<Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
