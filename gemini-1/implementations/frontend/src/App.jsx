import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import CreateSciencePlan from './pages/CreateSciencePlan';
import { ObserverDashboard } from './pages/ObserverDashboard';
import { AstronomerDashboard } from './pages/AstronomerDashboard';
import EditSciencePlan from './pages/EditSciencePlan'; 
import UserProfile from './pages/UserProfile'; // 🟢 เพิ่มการ Import
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้าแรก: Login */}
        <Route path="/" element={<LoginPage />} />

        {/* 🟢 เส้นทางหลักของแต่ละบทบาท */}
        {/* แนะนำให้ใช้ path สั้นๆ ตามที่ปุ่ม Edit/Save เรียกใช้ครับ */}
        <Route path="/dashboard/observer" element={<ObserverDashboard />} />
        <Route path="/dashboard/astronomer" element={<AstronomerDashboard />} />
        
        {/* 🟢 หน้าแก้ไข: ต้องมั่นใจว่า path นี้ตรงกับใน navigate('/edit-plan') */}
        <Route path="/edit-plan" element={<EditSciencePlan />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* หน้า Dashboard กลาง (ถ้ามี) */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-plan" element={<CreateSciencePlan />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;