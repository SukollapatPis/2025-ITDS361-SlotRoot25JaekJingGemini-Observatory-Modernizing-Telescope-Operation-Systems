import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { role } = location.state || {};

  // redirect ตาม role อัตโนมัติ
  if (role === 'OBSERVER') {
    return <Navigate to="/dashboard/observer" state={location.state} replace />;
  }

  if (role === 'ASTRONOMER') {
    return <Navigate to="/dashboard/astronomer" state={location.state} replace />;
  }

  // ถ้าไม่มี role ให้กลับหน้า login
  return <Navigate to="/" replace />;
};

export default Dashboard;