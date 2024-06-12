import Login from './Login/login';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



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
