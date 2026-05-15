import React from 'react';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  children,
  role
}) => {

  const token =
    localStorage.getItem('token');

  const userData =
    localStorage.getItem('user');

  const user = userData
    ? JSON.parse(userData)
    : null;

  // Not Logged In

  if (!token || !user) {

    return <Navigate to="/login" replace />;
  }

  // Role Check

  if (role && user.role !== role) {

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;