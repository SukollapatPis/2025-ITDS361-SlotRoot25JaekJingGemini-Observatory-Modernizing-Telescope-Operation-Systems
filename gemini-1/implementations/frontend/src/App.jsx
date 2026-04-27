import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AstronomerDashboard } from './pages/AstronomerDashboard';
import { ObserverDashboard } from './pages/ObserverDashboard';
import CreateSciencePlan from './pages/CreateSciencePlan';
import TestPlanPage from './pages/TestSciencePlan';
import SubmitSciencePlan from './pages/SubmitSciencePlan';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AstronomerDashboard />} />
        <Route path="/astronomer-dashboard" element={<AstronomerDashboard />} />
        <Route path="/observer-dashboard" element={<ObserverDashboard />} />
        <Route path="/create-plan" element={<CreateSciencePlan />} />
        <Route path="/test-plan" element={<TestPlanPage />} />
        <Route path="/submit-plan" element={<SubmitSciencePlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;