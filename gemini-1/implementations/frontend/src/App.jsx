import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AstronomerDashboard } from './pages/AstronomerDashboard';
import { ObserverDashboard } from './pages/ObserverDashboard';
import CreateSciencePlan from './pages/CreateSciencePlan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AstronomerDashboard />} />
        <Route path="/astronomer-dashboard" element={<AstronomerDashboard />} />
        <Route path="/observer-dashboard" element={<ObserverDashboard />} />
        <Route path="/create-plan" element={<CreateSciencePlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;