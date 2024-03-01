import './App.css';
import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css';
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
import Announcement from './Components/Announcement/Announcement';

import { getUser, isAuthenticated } from './utils/helper';
import Post from './Components/Announcement/Post';
import Emergency from './Components/Announcement/Emergency';
import CategorizeAnnouncements from './Components/Announcement/CategorizeAnnouncements';
import CreateGroup from './Components/Announcement/CreateGroup';
import EditGroup from './Components/Announcement/EditGroup';
import AnnouncementDetails from './Components/Announcement/AnnouncementDetails';
import UserProfile from './Components/User/UserProfile';
import TeachersPosts from './Components/Announcement/TeachersPosts';
import EditAnnouncement from './Components/Announcement/EditAnnouncement';


import Dashboard from './Components/Admin/Dashboard';
import AdminSideNav from './Components/Layout/Admin/AdminSideNav';
import ChatManagement from './Components/Admin/ChatManagement/ChatManagement';
import AnnouncementManagement from './Components/Admin/AnnouncementManagement/AnnouncementManagement'
import UserManagement from './Components/Admin/UserManagement/UserManagement';
import ForumManagement from './Components/Admin/ForumManagement/ForumManagment';
import CreateUser from './Components/Admin/UserManagement/CreateUser';
import EditUser from './Components/Admin/UserManagement/EditUser';
import CreateAnnouncement from './Components/Admin/AnnouncementManagement/CreateAnnouncement';
import AdminEditAnnouncement from './Components/Admin/AnnouncementManagement/AdminEditAnnouncement';
import ProtectedRoute from './Components/Middleware/ProtectedRoute';

function App() {

  if (isAuthenticated() && getUser()) {
    socket.connect()
  }

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/verification' element={<Verification />} />

          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

          <Route path='/tupt-chat' element={<Chat />} />
          <Route path='/announcements' element={<Announcement />} />
          <Route path='/post-announcement' element={<Post />} />
          <Route path='/edit-announcement/:id' element={<EditAnnouncement />} />
          <Route path='/teachers-post' element={<TeachersPosts />} />
          <Route path='/post-emergency' element={<Emergency />} />
          <Route path='/announcement-details/:id' element={<AnnouncementDetails />} />
          <Route path='/categorize-announcements/:teacherId' element={<CategorizeAnnouncements />} />
          <Route path='/announcement/create-group' element={<CreateGroup />} />
          <Route path='/announcement/edit-group/:id' element={<EditGroup />} />

          <Route path='/profile' element={<UserProfile />} />

          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} />
          <Route path='/admin/chat-management' element={<ChatManagement />} />

          <Route path='/admin/user-management' element={<UserManagement />} />
          <Route path='/admin/create-user' element={<CreateUser />} />
          <Route path='/admin/edit-user/:id' element={<EditUser />} />

          <Route path='/admin/announcement-management' element={<AnnouncementManagement />} />
          <Route path='/admin/create-announcement' element={<CreateAnnouncement />} />
          <Route path='/admin/edit-announcement/:id' element={<AdminEditAnnouncement />} />

          <Route path='/admin/forum-management' element={<ForumManagement />} />
        </Routes>

        <Toast />
      </Router>
    </div>
  );
}

export default App;
