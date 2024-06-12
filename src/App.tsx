
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Login from './Login/login';




function App() {


  return (
    
    <Router>
    <Routes>
      <Route path="/" element={< Login />} />
      {/*<Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />
      <Route path="/" element={< />} />*/}
    </Routes>
  </Router>
);
    
  
}

export default App
