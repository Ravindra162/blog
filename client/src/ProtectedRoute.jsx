import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// Example authentication function
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={isAuthenticated()===true ? <Element /> : <Navigate to="/login" replace />}
  />
);

export default ProtectedRoute;
