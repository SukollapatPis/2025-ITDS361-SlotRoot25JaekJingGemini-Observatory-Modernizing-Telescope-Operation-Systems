import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { name, role } = location.state || {};

  const roleLabel = role === 'ASTRONOMER' ? 'Astronomer' : 'Observer';

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome {name} the {roleLabel}
      </h1>
    </div>
  );
};

export default Dashboard;