
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminLoggedIn } from '../utils/adminAuth';

const AdminRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminRoute;
