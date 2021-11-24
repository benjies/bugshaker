import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children, redirectTo }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to={redirectTo} />;
  // <Routes>
  //   <Route
  //     {...rest}
  //     render={(props) => {
  //       return currentUser ? <Element {...props} /> : <Navigate to='/' />;
  //     }}
  //   ></Route>
  // </Routes>
}
