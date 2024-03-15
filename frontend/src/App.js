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
import TutorialsList from './Components/Tutorials/TutorialsList';
import ViewUser from './Components/User/ViewUser';
import PreviewFile from './Components/FilePreview/PreviewFile';

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
        <ViewUser />
        <PreviewFile />
        <Alert open={open} setOpen={setOpen} announcement={newAnnouncement} />
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/change-password/:token' element={<ChangePassword />} />
          <Route path='/verification' element={<Verification />} />

          <Route path='/' element={<ProtectedRoute isForAll={true}> <Home /> </ProtectedRoute>} />
          <Route path='/report-incident' element={<ProtectedRoute viewers={['admin', 'teacher', 'student']}> <ReportIncident /></ProtectedRoute>} />
          <Route path='/tupt-chat' element={<ProtectedRoute isForAll={true}> <Chat /> </ProtectedRoute>} />
          <Route path='/announcements' element={<ProtectedRoute isForAll={true}><Announcement /></ProtectedRoute>} />
          <Route path='/post-announcement' element={<ProtectedRoute viewers={['admin', 'teacher']}><Post /></ProtectedRoute>} />
          <Route path='/edit-announcement/:id' element={<ProtectedRoute viewers={['admin', 'teacher']}><EditAnnouncement /></ProtectedRoute>} />
          <Route path='/teachers-post' element={<ProtectedRoute viewers={['admin', 'teacher']}><TeachersPosts /></ProtectedRoute>} />
          <Route path='/archived-posts' element={<ProtectedRoute isForAll={true}><ArchivedPosts /></ProtectedRoute>} />
          <Route path='/announcement-details/:id' element={<ProtectedRoute isForAll={true}><AnnouncementDetails /></ProtectedRoute>} />
          <Route path='/categorize-announcements/:teacherId' element={<ProtectedRoute isForAll={true}><AnnouncementsListByTeacher /></ProtectedRoute>} />
          <Route path='/group-announcements/:groupId' element={<ProtectedRoute isForAll={true}><AnnouncementsListByGroup /></ProtectedRoute>} />
          <Route path='/announcement/create-group' element={<ProtectedRoute viewers={['admin', 'teacher']}><CreateGroup /></ProtectedRoute>} />
          <Route path='/announcement/edit-group/:id' element={<ProtectedRoute viewers={['admin', 'teacher']}><EditGroup /></ProtectedRoute>} />
          <Route path='/archived-announcements' element={<ProtectedRoute viewers={['admin', 'teacher']}><ArchivedAnnouncements /></ProtectedRoute>} />
          <Route path='/tutorials' element={<ProtectedRoute isForAll={true}><TutorialsList /></ProtectedRoute>} />
          <Route path='/collab' element={<ProtectedRoute isForAll={true}><Collab /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute isForAll={true}><UserProfile /></ProtectedRoute>} />

          <Route path='/admin/dashboard' element={<ProtectedRoute viewers={['admin']}> <Dashboard /> </ProtectedRoute>} />
          <Route path='/admin/chat-management' element={<ProtectedRoute viewers={['admin']}><ChatManagement /></ProtectedRoute>} />
          <Route path='/admin/chat-history/:id' element={<ProtectedRoute viewers={['admin']}><ChatHistory /></ProtectedRoute>} />
          <Route path='/admin/user-management' element={<ProtectedRoute viewers={['admin']}><UserManagement /></ProtectedRoute>} />
          <Route path='/admin/create-user' element={<ProtectedRoute viewers={['admin']}><CreateUser /></ProtectedRoute>} />
          <Route path='/admin/edit-user/:id' element={<ProtectedRoute viewers={['admin']}><EditUser /></ProtectedRoute>} />
          <Route path='/admin/announcement-management' element={<ProtectedRoute viewers={['admin']}><AnnouncementManagement /></ProtectedRoute>} />
          <Route path='/admin/create-announcement' element={<ProtectedRoute viewers={['admin']}><CreateAnnouncement /></ProtectedRoute>} />
          <Route path='/admin/edit-announcement/:id' element={<ProtectedRoute viewers={['admin']}><AdminEditAnnouncement /></ProtectedRoute>} />
          <Route path='/admin/forum-management' element={<ProtectedRoute viewers={['admin']}><ForumManagement /></ProtectedRoute>} />
          <Route path='/admin/list-video-tutorial' element={<ProtectedRoute viewers={['admin']}><VideoTutorialsList /></ProtectedRoute>} />
          <Route path='/admin/edit-video-tutorial/:id' element={<ProtectedRoute viewers={['admin']}><EditTutorial /></ProtectedRoute>} />
          <Route path='/admin/create-video-tutorial' element={<ProtectedRoute viewers={['admin']}><CreateTutorial /></ProtectedRoute>} />

        </Routes>

        <Toast />
      </Router>
    </div>
  );
}

export default App;
