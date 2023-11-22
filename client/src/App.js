import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import ExerciceDetail from './pages/ExerciceDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Feedback from './components/FeedBack'; 
import Username from './components/Username';
import Password from './components/Password';
import Reset from './components/Reset';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import WeightTracker from './components/WeightTracker';

import { ProtectRoute, AuthorizeUser } from './middleware/auth';

const App = () => (
  <Router>
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Routes>
        <Route
          path="/home"
          element={
            <AuthorizeUser>
              <Navbar />
              <ProtectRoute>
                <Home />
              </ProtectRoute>
              <Footer />
            </AuthorizeUser>
          }
        />
        <Route
          path="/exercise/:id"
          element={
            <AuthorizeUser>
              <Navbar />
              <ExerciceDetail />
              <Footer />
            </AuthorizeUser>
          }
        />
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/password"
          element={
            <AuthorizeUser>
              <ProtectRoute>
                <Password />
              </ProtectRoute>
              <Footer />
            </AuthorizeUser>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthorizeUser>
              <Navbar />
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
              <Footer />
            </AuthorizeUser>
          }
        />
        <Route
          path="/weighttracker"
          element={ // Add a new Route for the WeightTracker component
            <AuthorizeUser>
              <Navbar />
            
                <WeightTracker />
              
              <Footer />
            </AuthorizeUser>
          }
        />
            <Route
          path="/feedback"
          element={
            <AuthorizeUser>
              <Navbar />
              <Feedback />
               <Footer />
            </AuthorizeUser>
          }
        />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  </Router>
);

export default App;
