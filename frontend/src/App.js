import './App.css';
import React, { useEffect, useState } from 'react';
import { socket } from './socket';
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import ChangePassword from './Components/User/ChangePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Verification from './Components/User/Verification';
import Block from './Components/Layout/Loaders/Block';
import Toast from './Components/Layout/Toast';
import SideNav from './Components/Layout/SideNav';
import Home from './Components/Home';
import Chat from './Components/Chat/Chat';

function App() {

  // const [count, setCount] = useState(0);

  // socket.on('connect', () => {
  //   console.log('Connected to server');
  // });


  // useEffect(() => {
  //   socket.on('server', (data) => {
  //     setCount((prev) => {
  //       return prev + 1
  //     })
  //   })
  // }, [socket])

  // const handleClick = () => {
  //   socket.emit('message', 'Hello')
  // }
  return (
    <div className="App">
      {/* <button onClick={handleClick}>Send</button>
      <span>{count}</span> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/verification' element={<Verification />} />

          <Route path='/tupt-chat' element={<Chat />} />
        </Routes>
        <Toast />
      </Router>
    </div>
  );
}

export default App;
