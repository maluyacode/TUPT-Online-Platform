import './App.css';
import ChangePassword from './Components/User/ChangePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import Login from './Components/User/Login';
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/User/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
