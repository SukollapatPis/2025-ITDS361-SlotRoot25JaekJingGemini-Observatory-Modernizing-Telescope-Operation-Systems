import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Telescope } from 'lucide-react';
export default function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: 'Dr. Edwin Hubble',
        role: 'Astronomer',
        email: 'edwin@gemini.edu'
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <>
            <style>{css}</style>
            <div className="app">
                <nav>
                    <div className="logo" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        <div className="logo-icon">
                        <Telescope className="w-5 h-5 text-white" strokeWidth={1.8} />
                        </div>
                        <span className="logo-name">Gemini OCS</span>
                    </div>
                    <div className="nav-user">
                        <div className="user-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-role">{user.role}</div>
                        </div>
                        {/* 🟢 แก้ไขไอคอน Logout ให้เหมือนกับหน้า Dashboard */}
                        <button className="logout-btn" title="Sign out" onClick={handleLogout}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </nav>

                <main className="profile-main">
                    <h1>User Profile</h1>

                    <div className="profile-card">
                        <div className="profile-banner"></div>

                        <div className="profile-content">
                            <div className="avatar-wrapper">
                                <div className="avatar-circle">
                                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="user-header">
                                <h2>{user.name}</h2>
                                <div className="role-tag">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    {user.role}
                                </div>
                            </div>

                            <div className="info-divider"></div>

                            <div className="info-section">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <label>Email Address</label>
                                        <p>{user.email}</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <label>System Role</label>
                                        <p>{user.role}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="read-only-banner">
                                <div className="banner-icon">
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                                <p>This is a read-only profile page. Your role and permissions are managed by the Gemini Observatory administrators.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #FAFAFA; color: #0F172A; }
  .app { min-height: 100vh; }
  nav { background: #fff; border-bottom: 1px solid #E2E8F0; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 18px; }
  .logo-icon { width: 32px; height: 32px; background: #4F46E5; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 18px; }
  .nav-user { display: flex; align-items: center; gap: 16px; }
  .user-info { text-align: right; font-size: 13px; }
  .user-role { color: #64748B; font-size: 11px; }
  .logout-btn { background: none; border: none; cursor: pointer; color: #94A3B8; padding: 4px; }
  .logout-btn:hover { color: #4F46E5; }

  .profile-main { padding: 60px 32px; max-width: 800px; margin: 0 auto; text-align: center; }
  h1 { font-size: 24px; font-weight: 700; margin-bottom: 40px; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto; }
  
  .profile-card { 
    background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; 
    overflow: hidden; width: 100%; max-width: 500px; margin: 0 auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: left;
  }
  .profile-banner { height: 100px; background: #4F46E5; }
  .profile-content { padding: 0 32px 32px; position: relative; }
  
  .avatar-wrapper { position: relative; margin-top: -45px; margin-bottom: 16px; }
  .avatar-circle { 
    width: 90px; height: 90px; background: #F8FAFC; border: 4px solid #fff; 
    border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4F46E5;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }

  .user-header h2 { font-size: 22px; font-weight: 700; color: #0F172A; margin-bottom: 4px; }
  .role-tag { display: flex; align-items: center; gap: 6px; color: #64748B; font-size: 14px; }
  
  .info-divider { height: 1px; background: #F1F5F9; margin: 24px 0; }
  
  .info-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
  .info-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #94A3B8; }
  .info-text label { display: block; font-size: 12px; font-weight: 500; color: #64748B; margin-bottom: 2px; }
  .info-text p { font-size: 14px; color: #334155; }

  .read-only-banner { 
    background: #EFF6FF; border: 1px solid #DBEAFE; border-radius: 8px; 
    padding: 16px; display: flex; gap: 12px; margin-top: 32px;
  }
  .banner-icon { color: #3B82F6; flex-shrink: 0; }
  .read-only-banner p { font-size: 12px; color: #1E40AF; line-height: 1.5; }
`;