import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Telescope } from 'lucide-react';
// ============================================================
// MOCK DATA
// ============================================================
const MOCK_PLANS = [
  {
    planId: 'SP-1001',
    planName: 'Andromeda Galaxy Survey',
    creator: 'Dr. Edwin Hubble',
    target: 'M31',
    status: 'SUBMITTED',
    updatedAt: '2025-04-17T10:30:00Z',
  },
  {
    planId: 'SP-1002',
    planName: 'Crab Nebula Spectroscopy',
    creator: 'Dr. Vera Rubin',
    target: 'M1',
    status: 'SUBMITTED',
    updatedAt: '2025-04-16T08:15:00Z',
  },
  {
    planId: 'SP-1003',
    planName: 'Jupiter Atmospheric Study',
    creator: 'Dr. Carl Sagan',
    target: 'Jupiter',
    status: 'VALIDATED',
    updatedAt: '2025-04-15T14:22:00Z',
  },
  {
    planId: 'SP-1004',
    planName: 'Pleiades Star Cluster',
    creator: 'Dr. Cecilia Payne',
    target: 'M45',
    status: 'INVALIDATED',
    updatedAt: '2025-04-14T09:00:00Z',
  },
  {
    planId: 'SP-1005',
    planName: 'Black Hole Event Horizon',
    creator: 'Dr. Roger Penrose',
    target: 'Sgr A*',
    status: 'RUNNING',
    updatedAt: '2025-04-13T16:45:00Z',
  },
]

// ============================================================
// STATUS BADGE
// ============================================================
const statusConfig = {
  SUBMITTED: { label: 'Submitted', className: 'badge-submitted' },
  VALIDATED: { label: 'Validated', className: 'badge-validated' },
  INVALIDATED: { label: 'Invalidated', className: 'badge-invalidated' },
  RUNNING: { label: 'Running', className: 'badge-running' },
  CREATED: { label: 'Created', className: 'badge-created' },
  TESTED: { label: 'Tested', className: 'badge-tested' },
  COMPLETE: { label: 'Complete', className: 'badge-complete' },
  CANCELLED: { label: 'Cancelled', className: 'badge-cancelled' },
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || { label: status, className: 'badge-created' }
  return <span className={`badge ${cfg.className}`}>{cfg.label}</span>
}

// ============================================================
// PLAN DETAILS
// ============================================================
function PlanDetails({ plan }) {
  const date = new Date(plan.updatedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  return (
    <div className="detail-grid">
      <div className="detail-item">
        <label>Plan ID</label>
        <p className="plan-id">{plan.planId}</p>
      </div>
      <div className="detail-item">
        <label>Status</label>
        <p><StatusBadge status={plan.status} /></p>
      </div>
      <div className="detail-item detail-full">
        <label>Plan Name</label>
        <p>{plan.planName}</p>
      </div>
      <div className="detail-item">
        <label>Creator</label>
        <p>{plan.creator}</p>
      </div>
      <div className="detail-item">
        <label>Target</label>
        <p>{plan.target}</p>
      </div>
      <div className="detail-item">
        <label>Last Modified</label>
        <p>{date}</p>
      </div>
    </div>
  )
}

// ============================================================
// TOAST
// ============================================================
function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ============================================================
// MODAL
// ============================================================
function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null
  return (
    <div className="overlay" onClick={(e) => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export function ObserverDashboard() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState(MOCK_PLANS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('SUBMITTED')
  const [sortBy, setSortBy] = useState('modified-newest')

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('action')
  const [rejectReason, setRejectReason] = useState('')

  const [toasts, setToasts] = useState([])

  // 🟢 ดึงข้อมูลผู้ใช้จาก localStorage (เพื่อให้ชื่อใน Navbar เปลี่ยนตามคน Login)
  const [user, setUser] = useState({ name: 'Obs. Jocelyn Bell', role: 'Science Observer' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }

  const updatePlanStatus = (planId, newStatus) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.planId === planId ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p
      )
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const filteredSorted = [...plans]
    .filter((p) => {
      const matchSearch =
        p.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.target.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = statusFilter === 'ALL' || p.status === statusFilter
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortBy === 'planId-asc') return a.planId.localeCompare(b.planId)
      if (sortBy === 'planId-desc') return b.planId.localeCompare(a.planId)
      const da = new Date(a.updatedAt).getTime()
      const db = new Date(b.updatedAt).getTime()
      return sortBy === 'modified-newest' ? db - da : da - db
    })

  const openValidate = (plan) => {
    setSelectedPlan(plan)
    setModalMode('action')
    setRejectReason('')
    setIsModalOpen(true)
  }

  const openView = (plan) => {
    setSelectedPlan(plan)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleApprove = () => {
    updatePlanStatus(selectedPlan.planId, 'VALIDATED')
    showToast(`Plan ${selectedPlan.planId} validated successfully.`, 'success')
    setIsModalOpen(false)
  }

  const handleReject = () => {
    if (!rejectReason.trim()) {
      showToast('Please provide a reason for rejection.', 'error')
      return
    }
    updatePlanStatus(selectedPlan.planId, 'INVALIDATED')
    showToast(`Plan ${selectedPlan.planId} has been rejected.`, 'error')
    setIsModalOpen(false)
  }

  const renderFooter = () => {
    if (modalMode === 'view')
      return <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>

    if (modalMode === 'rejecting')
      return (
        <>
          <button className="btn btn-secondary" onClick={() => setModalMode('action')}>Back</button>
          <button className="btn btn-danger" onClick={handleReject}>Confirm Reject</button>
        </>
      )

    if (modalMode === 'confirming')
      return (
        <>
          <button className="btn btn-secondary" onClick={() => setModalMode('action')}>Back</button>
          <button className="btn btn-primary" onClick={handleApprove}>Confirm Validate</button>
        </>
      )

    return (
      <>
        <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
        <button className="btn btn-danger" onClick={() => setModalMode('rejecting')}>Reject</button>
        <button className="btn btn-primary" onClick={() => setModalMode('confirming')}>Approve</button>
      </>
    )
  }

  const modalTitle =
    selectedPlan?.status === 'SUBMITTED'
      ? `Validate Science Plan: ${selectedPlan?.planId}`
      : `Science Plan Details: ${selectedPlan?.planId}`

  return (
    <>
      <style>{css}</style>

      <div className="app">
        {/* NAV */}
        <nav>
          <div className="logo">
            <div className="logo-icon">
              <Telescope className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <span className="logo-name">Gemini OCS</span>
          </div>
          <div className="nav-user">
            {/* 🟢 แก้ไขตรงส่วน .user-info และ .avatar ให้คลิกได้เพื่อไปหน้า Profile */}
            <div 
              className="user-info" 
              onClick={() => navigate('/profile')} 
              style={{ cursor: 'pointer' }}
            >
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <div 
              className="avatar" 
              onClick={() => navigate('/profile')} 
              style={{ cursor: 'pointer' }}
            >
              {user.name.split(' ').map(n => n[0]).join('').slice(-2).toUpperCase()}
            </div>
            <button className="logout-btn" title="Sign out" onClick={handleLogout}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </nav>

        {/* MAIN */}
        <main>
          <h1>Submitted Science Plans</h1>

          {/* CONTROLS */}
          <div className="controls">
            <div className="search-wrap">
              <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
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
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All Statuses</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="VALIDATED">Validated</option>
                <option value="INVALIDATED">Invalidated</option>
                <option value="RUNNING">Running</option>
                <option value="CREATED">Created</option>
                <option value="TESTED">Tested</option>
                <option value="COMPLETE">Complete</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="sel-wrap">
              <svg className="sel-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M3 7h18M6 12h12M9 17h6" />
              </svg>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="modified-newest">Last Modified (Newest)</option>
                <option value="modified-oldest">Last Modified (Oldest)</option>
                <option value="planId-asc">Plan ID (A–Z)</option>
                <option value="planId-desc">Plan ID (Z–A)</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Plan ID</th>
                  <th>Name</th>
                  <th>Creator</th>
                  <th>Target</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSorted.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#9CA3AF' }}>
                      {statusFilter === 'SUBMITTED'
                        ? 'There are currently no submitted science plans.'
                        : 'No science plans found.'}
                    </td>
                  </tr>
                ) : (
                  filteredSorted.map((plan) => (
                    <tr key={plan.planId}>
                      <td><span className="plan-id">{plan.planId}</span></td>
                      <td>{plan.planName}</td>
                      <td className="text-muted">{plan.creator}</td>
                      <td className="text-muted">{plan.target}</td>
                      <td><StatusBadge status={plan.status} /></td>
                      <td style={{ textAlign: 'right' }}>
                        {plan.status === 'SUBMITTED' ? (
                          <button className="btn btn-primary" onClick={() => openValidate(plan)}>
                            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Validate
                          </button>
                        ) : (
                          <button className="btn btn-ghost" onClick={() => openView(plan)} title="View Info">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        footer={renderFooter()}
      >
        <div className="space-y-4">
          {selectedPlan && <PlanDetails plan={selectedPlan} />}

          {modalMode === 'rejecting' && (
            <div style={{ borderTop: '1px solid #E5E7EB', marginTop: 16, paddingTop: 16 }}>
              <label className="reject-label">
                Reason for Rejection <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please explain why this science plan is being rejected..."
              />
            </div>
          )}

          {modalMode === 'confirming' && (
            <div className="confirm-box">
              <h4>Confirm Validation</h4>
              <p>Are you sure you want to validate this science plan? This will approve the plan for execution.</p>
            </div>
          )}
        </div>
      </Modal>

      <Toast toasts={toasts} />
    </>
  )
}

// ============================================================
// CSS — Inter font ทั้งหมด
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --brand: #4F46E5; --brand-light: #EEF2FF; --brand-dark: #3730A3;
    --bg: #F8F8FA; --surface: #fff; --border: #E5E7EB;
    --text-1: #111827; --text-2: #6B7280; --text-3: #9CA3AF;
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-1); font-size: 14px; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  nav {
    background: var(--surface); border-bottom: 1px solid var(--border);
    padding: 0 24px; height: 56px; display: flex; align-items: center;
    justify-content: space-between; position: sticky; top: 0; z-index: 10;
  }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 34px; height: 34px; background: var(--brand); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .logo-name { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }
  .nav-user { display: flex; align-items: center; gap: 12px; }
  .user-info { text-align: right; }
  .user-name { font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; }
  .user-role { font-size: 11px; color: var(--text-2); font-family: 'Inter', sans-serif; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--brand-light); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: var(--brand); font-family: 'Inter', sans-serif; }
  .logout-btn { background: none; border: none; cursor: pointer; color: var(--text-3); padding: 4px; border-radius: 6px; display: flex; align-items: center; }
  .logout-btn:hover { color: var(--text-2); background: var(--bg); }

  main { padding: 32px 24px; max-width: 1100px; width: 100%; margin: 0 auto; flex: 1; }
  h1 { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 20px; }

  .controls {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 14px 16px; display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
  }
  .search-wrap { flex: 1; min-width: 200px; position: relative; }
  .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; color: var(--text-3); pointer-events: none; }
  .search-wrap input { width: 100%; height: 36px; padding: 0 12px 0 32px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; font-family: 'Inter', sans-serif; background: var(--bg); outline: none; }
  .search-wrap input:focus { border-color: var(--brand); background: #fff; }
  .sel-wrap { position: relative; min-width: 160px; }
  .sel-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; color: var(--text-3); pointer-events: none; }
  .sel-wrap select { width: 100%; height: 36px; padding: 0 12px 0 30px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; font-family: 'Inter', sans-serif; background: var(--bg); outline: none; appearance: none; cursor: pointer; }
  .sel-wrap select:focus { border-color: var(--brand); background: #fff; }

  .table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  table { width: 100%; border-collapse: collapse; }
  thead { background: #FAFAFA; border-bottom: 1px solid var(--border); }
  th { padding: 10px 16px; font-size: 11px; font-weight: 600; color: var(--text-2); text-align: left; letter-spacing: 0.5px; text-transform: uppercase; font-family: 'Inter', sans-serif; }
  td { padding: 14px 16px; font-size: 13px; border-bottom: 1px solid #F3F4F6; vertical-align: middle; font-family: 'Inter', sans-serif; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr { transition: background 0.1s; }
  tbody tr:hover { background: #FAFBFF; }
  .plan-id { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: var(--brand); }
  .text-muted { color: var(--text-2); }

  .badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 600; letter-spacing: 0.4px; text-transform: uppercase; border-width: 1px; border-style: solid; font-family: 'Inter', sans-serif; }
  .badge-submitted   { background: #F5F3FF; color: #5B21B6; border-color: #C4B5FD; }
  .badge-validated   { background: #ECFDF5; color: #065F46; border-color: #6EE7B7; }
  .badge-invalidated { background: #FEF2F2; color: #991B1B; border-color: #FCA5A5; }
  .badge-running     { background: #EFF6FF; color: #1E40AF; border-color: #93C5FD; }
  .badge-created     { background: var(--bg); color: var(--text-2); border-color: var(--border); }
  .badge-tested      { background: #FFFBEB; color: #92400E; border-color: #FCD34D; }
  .badge-complete    { background: #ECFDF5; color: #065F46; border-color: #6EE7B7; }
  .badge-cancelled   { background: #F3F4F6; color: #6B7280; border-color: #D1D5DB; }

  .btn { display: inline-flex; align-items: center; gap: 5px; padding: 0 12px; height: 32px; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Inter', sans-serif; }
  .btn-primary   { background: var(--brand); color: #fff; }
  .btn-primary:hover { background: var(--brand-dark); }
  .btn-ghost     { background: transparent; color: var(--text-2); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--bg); color: var(--text-1); }
  .btn-danger    { background: #EF4444; color: #fff; }
  .btn-danger:hover { background: #DC2626; }
  .btn-secondary { background: var(--bg); color: var(--text-1); border: 1px solid var(--border); }
  .btn-secondary:hover { background: var(--border); }

  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
  .modal { background: var(--surface); border-radius: 14px; width: 100%; max-width: 560px; max-height: 80vh; overflow-y: auto; border: 1px solid var(--border); }
  .modal-header { padding: 18px 20px 14px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .modal-title { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; }
  .modal-close { background: none; border: none; cursor: pointer; color: var(--text-3); width: 28px; height: 28px; border-radius: 6px; font-size: 16px; display: flex; align-items: center; justify-content: center; }
  .modal-close:hover { background: var(--bg); color: var(--text-1); }
  .modal-body { padding: 20px; }
  .modal-footer { padding: 14px 20px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 8px; }

  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .detail-full { grid-column: 1 / -1; }
  .detail-item label { display: block; font-size: 11px; font-weight: 600; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-family: 'Inter', sans-serif; }
  .detail-item p { font-size: 13px; font-family: 'Inter', sans-serif; }
  .reject-label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px; font-family: 'Inter', sans-serif; }
  textarea { width: 100%; border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; font-size: 13px; font-family: 'Inter', sans-serif; resize: vertical; outline: none; background: var(--bg); }
  textarea:focus { border-color: var(--brand); background: #fff; }
  .confirm-box { margin-top: 16px; padding: 14px; border-radius: 8px; background: #ECFDF5; border: 1px solid #6EE7B7; }
  .confirm-box h4 { font-size: 13px; font-weight: 600; color: #065F46; margin-bottom: 4px; font-family: 'Inter', sans-serif; }
  .confirm-box p { font-size: 12px; color: #065F46; font-family: 'Inter', sans-serif; }

  .toast-wrap { position: fixed; bottom: 20px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 200; }
  .toast { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 16px; font-size: 13px; font-family: 'Inter', sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.08); animation: slideIn 0.2s ease; }
  .toast-success { border-left: 3px solid #10B981; }
  .toast-error   { border-left: 3px solid #EF4444; }
  @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
`

export default ObserverDashboard