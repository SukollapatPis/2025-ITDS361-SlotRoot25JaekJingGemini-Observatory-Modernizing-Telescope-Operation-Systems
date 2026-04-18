import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Telescope } from 'lucide-react';
import { mockPlans } from '../data/mockPlans'

// ============================================================
// STATUS BADGE COMPONENT
// ============================================================
const statusConfig = {
  CREATED: { label: 'CREATED', className: 'badge-created' },
  SUBMITTED: { label: 'SUBMITTED', className: 'badge-submitted' },
  INVALIDATED: { label: 'INVALIDATED', className: 'badge-invalidated' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || { label: status, className: 'badge-created' }
  return <span className={`badge ${cfg.className}`}>{cfg.label}</span>
}

// ============================================================
// TOAST COMPONENT (Notification)
// ============================================================
function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className="toast toast-success">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="#16A34A">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ============================================================
// MODAL COMPONENT
// ============================================================
function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null
  return (
    <div className="overlay" onClick={(e) => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

// ============================================================
// PLAN DETAILS COMPONENT (แสดงใน Modal)
// ============================================================
function PlanDetails({ plan }) {
  if (!plan) return null;

  return (
    <div className="plan-details-content">
      <div className="detail-grid">
        <div className="detail-item">
          <label>Plan Name</label>
          <p>{plan.planName}</p>
        </div>
        <div className="detail-item">
          <label>Status</label>
          <p><StatusBadge status={plan.status} /></p>
        </div>
        <div className="detail-item">
          <label>Creator</label>
          <p>{plan.creator}</p>
        </div>
        <div className="detail-item">
          <label>Funding</label>
          <p>{plan.funding}</p>
        </div>
        <div className="detail-item">
          <label>Start Date</label>
          <p>{plan.startDate}</p>
        </div>
        <div className="detail-item">
          <label>End Date</label>
          <p>{plan.endDate}</p>
        </div>
        <div className="detail-item">
          <label>Telescope</label>
          <p>{plan.telescope}</p>
        </div>
        <div className="detail-item">
          <label>Target</label>
          <p>{plan.target}</p>
        </div>
      </div>

      <div className="detail-section">
        <label>Objective</label>
        <div className="info-box">{plan.objective}</div>
      </div>

      <hr className="divider" />

      <div className="detail-section">
        <h4>Data Processing Requirements</h4>
        <div className="detail-grid-3">
          <div className="detail-item"><label>File Type</label><p>{plan.dataProcessing?.fileType}</p></div>
          <div className="detail-item"><label>File Quality</label><p>{plan.dataProcessing?.fileQuality}</p></div>
          <div className="detail-item"><label>Color Mode</label><p>{plan.dataProcessing?.colorMode}</p></div>
          <div className="detail-item"><label>Contrast</label><p>{plan.dataProcessing?.contrast}</p></div>
          <div className="detail-item"><label>Exposure</label><p>{plan.dataProcessing?.exposure}</p></div>
          <div className="detail-item"><label>Brightness</label><p>{plan.dataProcessing?.brightness}</p></div>
          <div className="detail-item"><label>Saturation</label><p>{plan.dataProcessing?.saturation}</p></div>
          <div className="detail-item"><label>Luminance</label><p>{plan.dataProcessing?.luminance}</p></div>
          <div className="detail-item"><label>Hue</label><p>{plan.dataProcessing?.hue}</p></div>
        </div>
      </div>

      <div className="detail-section">
        <h4>Edit History Log</h4>
        <div className="info-box history-box">
          {plan.history?.map((h, i) => (
            <div key={i} className="history-item">
              <span className="history-date">{h.date}</span>
              <ul className="history-log"><li>{h.log}</li></ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export function AstronomerDashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  // States
  const [plans] = useState(mockPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState('modified-newest')
  const [toasts, setToasts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTestModalOpen, setIsTestModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // 🟢 ประกาศ State user เพื่อดึงข้อมูลจาก localStorage
  const [user, setUser] = useState({ name: 'Dr. Edwin Hubble', role: 'Astronomer' });

  useEffect(() => {
    // โหลดข้อมูลผู้ใช้จริง
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (location.state?.justLoggedIn) {
      const id = Date.now()
      setToasts([{ id, message: 'Logged in successfully' }])
      const newState = { ...location.state }; delete newState.justLoggedIn;
      navigate(location.pathname, { replace: true, state: newState });
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
    }

    if (location.state?.justSaved) {
      const id = Date.now()
      setToasts([{ id, message: location.state.message }])
      const newState = { ...location.state }; delete newState.justSaved; delete newState.message;
      navigate(location.pathname, { replace: true, state: newState });
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500)
    }
  }, [location, navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const openViewModal = (plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const openTestModal = (plan) => {
    setSelectedPlan(plan)
    setIsTestModalOpen(true)
  }

  const filteredSorted = [...plans]
    .filter((p) => {
      const matchSearch =
        p.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.planId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = statusFilter === 'ALL' || p.status === statusFilter
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      const da = new Date(a.updatedAt).getTime()
      const db = new Date(b.updatedAt).getTime()
      return sortBy === 'modified-newest' ? db - da : da - db
    })

  return (
    <>
      <style>{css}</style>
      <Toast toasts={toasts} />

      {/* VIEW DETAILS MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPlan ? `Science Plan Details: ${selectedPlan.planId}` : ''}
        footer={<button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>}
      >
        <PlanDetails plan={selectedPlan} />
      </Modal>

      {/* TESTING POPUP MODAL - FIXED UI OVERLAP */}
      <Modal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        title={selectedPlan ? `Testing Science Plan: ${selectedPlan.planId}` : ''}
        footer={<button className="btn btn-primary" style={{ minWidth: '80px' }} onClick={() => setIsTestModalOpen(false)}>Finish</button>}
      >
        <div className="test-modal-content">
          <p className="test-subtext">Running validation tests on the virtual telescope environment...</p>

          <div className="test-row pass">
            <div className="test-row-header">
              <span className="test-label">Star System Selection Test</span>
              <span className="test-status">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Pass
              </span>
            </div>
          </div>

          <div className="test-row fail">
            <div className="test-row-header">
              <span className="test-label">Image Processing Configuration Test</span>
              <span className="test-status">Fail</span>
            </div>
            <div className="error-msg-box">Contrast must be greater than 0.</div>
          </div>

          <div className="test-row pass">
            <div className="test-row-header">
              <span className="test-label">Telescope Location Test</span>
              <span className="test-status">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Pass
              </span>
            </div>
          </div>

          <div className="test-row fail">
            <div className="test-row-header">
              <span className="test-label">Observation Duration Test</span>
              <span className="test-status">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Fail
              </span>
            </div>
            <div className="error-msg-box">
              Insufficient funding for the requested observation duration. <br />
              Minimum $1000 required.
            </div>
          </div>

          <div className="test-failure-banner">
            <div className="banner-header">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <strong>Testing failed</strong>
            </div>
            <p>Please review the errors above, edit your science plan, and try testing again.</p>
          </div>
        </div>
      </Modal>

      <div className="app">
        <nav>
          <div className="logo">
            <div className="logo-icon">
              <Telescope className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <span className="logo-name">Gemini OCS</span>
          </div>
          <div className="nav-user">
            {/* 🟢 ส่วนชื่อผู้ใช้ที่คลิกเพื่อไปหน้า Profile ได้ */}
            <div className="user-info"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            {/* 🟢 ปุ่ม Logout พร้อมไอคอนที่ต้องการ */}
            <button className="logout-btn" title="Sign out" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </nav>

        <main>
          <div className="page-header">
            <h1>My Science Plans</h1>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/create-plan')}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Science Plan
            </button>
          </div>

          <div className="controls">
            <div className="search-wrap">
              <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by plan name or target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sel-wrap">
              <svg className="sel-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All Statuses</option>
                <option value="CREATED">Created</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="INVALIDATED">Invalidated</option>
              </select>
            </div>

            <div className="sel-wrap">
              <svg className="sel-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
              </svg>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="modified-newest">Last Modified (Newest)</option>
                <option value="modified-oldest">Last Modified (Oldest)</option>
              </select>
            </div>
          </div>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Plan ID</th>
                  <th>Name</th>
                  <th>Target</th>
                  <th>Telescope</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSorted.map((plan) => (
                  <tr key={plan.planId}>
                    <td><span className="plan-id">{plan.planId}</span></td>
                    <td>{plan.planName}</td>
                    <td className="text-muted">{plan.target}</td>
                    <td className="text-muted">{plan.telescope}</td>
                    <td><StatusBadge status={plan.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-wrapper">
                        <button className="icon-btn" title="View" onClick={() => openViewModal(plan)}>
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        {plan.status !== 'SUBMITTED' && (
                          <>
                            <button
                              className="icon-btn"
                              title="Edit"
                              onClick={() => navigate('/edit-plan', { state: { plan } })}
                            >
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button className="btn-test" onClick={() => openTestModal(plan)}>Test</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --brand: #4F46E5; --brand-light: #EEF2FF; --brand-dark: #4338CA;
    --bg: #FAFAFA; --surface: #ffffff; --border: #E2E8F0;
    --text-1: #0F172A; --text-2: #64748B; --text-3: #94A3B8;
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-1); font-size: 14px; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  nav { background: var(--surface); border-bottom: 1px solid var(--border); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
  .logo { display: flex; align-items: center; gap: 12px; }
  .logo-icon { width: 36px; height: 36px; background: var(--brand); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .logo-name { font-size: 18px; font-weight: 700; }
  .nav-user { display: flex; align-items: center; gap: 16px; }
  .user-info { text-align: right; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 12px; color: var(--text-3); }
  .logout-btn { background: none; border: none; cursor: pointer; color: var(--text-3); padding: 6px; border-radius: 6px; }
  .logout-btn:hover { color: var(--brand); background: var(--brand-light); }
  .user-info:hover .user-name {
    color: #4F46E5;
    text-decoration: underline;
  }
  .toast-wrap { position: fixed; top: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
  .toast { display: flex; align-items: center; gap: 10px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 14px 20px; font-weight: 500; color: #166534; box-shadow: 0 4px 6px rgba(0,0,0,0.05); animation: slideInRight 0.3s ease-out; }
  @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  
  main { padding: 40px 32px; max-width: 1200px; width: 100%; margin: 0 auto; flex: 1; }
  .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  h1 { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
  
  .controls { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; margin-bottom: 24px; }
  .search-wrap { flex: 1; position: relative; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; color: var(--text-3); }
  .search-wrap input { width: 100%; height: 40px; padding: 0 16px 0 36px; border: 1px solid var(--border); border-radius: 6px; outline: none; }
  
  .sel-wrap { position: relative; min-width: 180px; }
  .sel-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; color: var(--text-3); pointer-events: none; }
  .sel-wrap select { width: 100%; height: 40px; padding: 0 36px; border: 1px solid var(--border); border-radius: 6px; appearance: none; cursor: pointer; }
  
  .table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 14px 24px; font-size: 12px; font-weight: 600; color: var(--text-2); text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 16px 24px; font-size: 13px; border-bottom: 1px solid #F1F5F9; }
  .plan-id { font-weight: 600; color: #4F46E5; }
  .text-muted { color: var(--text-2); }
  
  .badge { display: inline-flex; padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; }
  .badge-created { background: #F1F5F9; color: #475569; }
  .badge-submitted { background: #F3E8FF; color: #7E22CE; }
  .badge-invalidated { background: #FEE2E2; color: #DC2626; }
  
  .btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 0 16px; height: 40px; background: var(--brand); color: #fff; border-radius: 6px; border: none; font-weight: 500; cursor: pointer; }
  .btn-secondary { background: #F8FAFC; border: 1px solid var(--border); padding: 8px 16px; border-radius: 6px; cursor: pointer; }
  .actions-wrapper { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
  .icon-btn { background: transparent; border: none; color: var(--text-2); cursor: pointer; padding: 4px; border-radius: 4px; }
  .btn-test { color: var(--brand); border: 1px solid var(--brand-light); padding: 6px 12px; border-radius: 6px; background: transparent; cursor: pointer; font-weight: 600; font-family: 'Inter', sans-serif;}
  
  .overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(2px); }
  .modal { background: var(--surface); border-radius: 12px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column; }
  .modal-header { padding: 20px 24px; border-bottom: 2px solid var(--text-1); display: flex; justify-content: space-between; align-items: center; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
  
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .detail-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .detail-item label { display: block; font-size: 11px; font-weight: 600; color: var(--text-2); text-transform: uppercase; margin-bottom: 4px; }
  .info-box { background: #F8FAFC; border-radius: 8px; padding: 12px; border: 1px solid #F1F5F9; font-size: 13px; }
  .divider { border: 0; border-top: 1px solid var(--border); margin: 20px 0; }
  .history-date { color: var(--text-2); font-size: 12px; }
  .history-log { padding-left: 20px; margin-top: 4px; }

  /* TEST MODAL STYLES - FIXED OVERLAPPING */
  .test-subtext { color: var(--text-2); font-size: 13px; margin-bottom: 20px; }
  .test-row { 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    border: 1px solid #E2E8F0; 
    border-radius: 8px; 
    padding: 16px; 
    margin-bottom: 12px; 
    background: #fff; 
  }
  .test-row.fail { border-color: #FCA5A5; }
  .test-row-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
  }
  .test-label { font-weight: 500; color: #334155; }
  .test-status { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
  .pass .test-status { color: #10B981; }
  .fail .test-status { color: #EF4444; }

  .error-msg-box { 
    width: 100%;
    padding: 10px 12px; 
    background: #FEF2F2; 
    border-radius: 6px; 
    color: #B91C1C; 
    font-size: 13px; 
    border: 1px solid #FCA5A5;
    line-height: 1.5;
  }

  .test-failure-banner { 
    margin-top: 24px; padding: 16px; background: #FEF2F2; 
    border: 1px solid #FCA5A5; border-radius: 8px; color: #991B1B;
  }
  .banner-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .test-failure-banner p { font-size: 13px; padding-left: 24px; }
`;

export default AstronomerDashboard;