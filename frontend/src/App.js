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
import AnnouncementsListByTeacher from './Components/Announcement/AnnouncementsListByTeacher';
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
import Collab from './Components/Collab/Collab';
import ToastEmmiter from './Components/Layout/ToastEmmiter';
import Alert from './Components/Layout/Alert';
import AnnouncementsListByGroup from './Components/Announcement/AnnouncementsListByGroup';
import ReportIncident from './Components/Incidents/ReportIncident';
import ChatHistory from './Components/Admin/ChatManagement/ChatHistory';
import ArchivedAnnouncements from './Components/Announcement/ArchivedAnnouncements';
import ArchivedPosts from './Components/Collab/ArchivedPosts';
import VideoTutorialsList from './Components/Admin/VideoTutorialManagement/VideoTutorialsList';
import EditTutorial from './Components/Admin/VideoTutorialManagement/EditTutorial';
import CreateTutorial from './Components/Admin/VideoTutorialManagement/CreateTutorial';

function App() {

  const [open, setOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({});

  if (isAuthenticated() && getUser()) {
    socket.connect()
  }


  useEffect(() => {

    const handlePushAnnouncement = (data) => {
      // ToastEmmiter.info('New announcement arrived');

      const { announcement } = JSON.parse(data);

      setNewAnnouncement(announcement)

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          let beat = new Audio('/sounds/announcement-notif.mp3');
          beat.play().catch(error => {
          });
          setOpen(true);
          stream.getTracks().forEach(track => track.stop());
        })
    };

    socket.on('push-announcement', handlePushAnnouncement);

    return () => {
      socket.off('push-announcement', handlePushAnnouncement);
    };

  }, []);


  return (
    <div className="App">
      <Router>
        <Alert open={open} setOpen={setOpen} announcement={newAnnouncement} />
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password/:token' element={<ChangePassword />} />
          <Route path='/verification' element={<Verification />} />

          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

          <Route path='/report-incident' element={<ProtectedRoute> <ReportIncident /> </ProtectedRoute>} />

          <Route path='/tupt-chat' element={<Chat />} />
          <Route path='/announcements' element={<Announcement />} />
          <Route path='/post-announcement' element={<Post />} />
          <Route path='/edit-announcement/:id' element={<EditAnnouncement />} />
          <Route path='/teachers-post' element={<TeachersPosts />} />
          <Route path='/post-emergency' element={<Emergency />} />
          <Route path='/archived-posts' element={<ArchivedPosts />} />
          <Route path='/announcement-details/:id' element={<AnnouncementDetails />} />
          <Route path='/categorize-announcements/:teacherId' element={<AnnouncementsListByTeacher />} />
          <Route path='/group-announcements/:groupId' element={<AnnouncementsListByGroup />} />
          <Route path='/announcement/create-group' element={<CreateGroup />} />
          <Route path='/announcement/edit-group/:id' element={<EditGroup />} />
          <Route path='/archived-announcements' element={<ArchivedAnnouncements />} />


          <Route path='/collab' element={<Collab />} />

          <Route path='/profile' element={<UserProfile />} />

          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} />

          <Route path='/admin/chat-management' element={<ChatManagement />} />
          <Route path='/admin/chat-history/:id' element={<ChatHistory />} />

          <Route path='/admin/user-management' element={<UserManagement />} />
          <Route path='/admin/create-user' element={<CreateUser />} />
          <Route path='/admin/edit-user/:id' element={<EditUser />} />

          <Route path='/admin/announcement-management' element={<AnnouncementManagement />} />
          <Route path='/admin/create-announcement' element={<CreateAnnouncement />} />
          <Route path='/admin/edit-announcement/:id' element={<AdminEditAnnouncement />} />

          <Route path='/admin/forum-management' element={<ForumManagement />} />


          <Route path='/admin/list-video-tutorial' element={<VideoTutorialsList />} />
          <Route path='/admin/edit-video-tutorial/:id' element={<EditTutorial />} />
          <Route path='/admin/create-video-tutorial' element={<CreateTutorial />} />



        </Routes>

        <Toast />
      </Router>
    </div>
  );
}

export default App;
