import React from 'react';
import LandingHome from './components/LandingHome';
import { Signup } from './components/handleAuths/Signup';
import { Login } from './components/handleAuths/Login';
import { ForgotPassword } from './components/handleAuths/ForgotPassword';
// import { Signup } from './signup_login/Signup';
// import { Login } from './signup_login/Login';
// import { ForgotPassword } from './signup_login/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/AuthContext';
import UserDashboard from './components/Dashboard/Dashboard';
// import UserDashboard from './UserDashboard/UserDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingHome />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            exact
            path='/dashboard'
            element={
              <PrivateRoute redirectTo='/'>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
