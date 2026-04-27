import { Telescope } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditSciencePlan() {
    const navigate = useNavigate();
    const location = useLocation();

    const plan = location.state?.plan || {};
    const planId = plan.planId || 'SP-1006';

    const [formData, setFormData] = useState({
        planName: plan.planName || 'Lunar Crater Mapping',
        creator: plan.creator || 'Dr. Edwin Hubble',
        funding: plan.funding ? plan.funding.toString().replace(/[^0-9.]/g, '') : '500',
        target: plan.target || 'Moon',
        objective: plan.objective || 'High resolution mapping of Tycho crater.',
        startDate: plan.startDate || '2026-09-01',
        endDate: plan.endDate || '2026-09-05',
        telescope: plan.telescope || 'Hawaii',
        fileType: 'PNG',
        fileQuality: 'Low',
        colorMode: 'B&W',
        contrast: 0,
        exposure: 1,
        highlights: 1,
        shadows: 0.5,
        whites: 1,
        blacks: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        if (e) e.preventDefault();

        // 🟢 แก้ไขตรงนี้: เปลี่ยน path ให้ตรงกับ App.jsx ของคุณ
        navigate('/dashboard/astronomer', {
            state: {
                justSaved: true,
                message: 'Science Plan updated successfully. Status reset to CREATED, please test again.'
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <>
            <style>{css}</style>
            <div className="app">
                <nav>
                    <div className="logo">
                        <div className="logo-icon">
                            <Telescope className="w-5 h-5 text-white" strokeWidth={1.8} />
                        </div>
                        <span className="logo-name">Gemini OCS</span>
                    </div>
                    <div className="nav-user">
                        <div className="user-info">
                            <div className="user-name">Dr. Edwin Hubble</div>
                            <div className="user-role">Astronomer</div>
                        </div>
                        <button className="logout-btn" title="Sign out" onClick={handleLogout}>
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <main className="edit-main">
                    <div className="edit-header">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h1>Edit Science Plan: {planId}</h1>
                    </div>

                    <form className="form-card" onSubmit={handleSave}>
                        <div className="form-section">
                            <h3 className="section-title">General Information</h3>
                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label>Plan Name</label>
                                    <input type="text" name="planName" value={formData.planName} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Creator</label>
                                    <input type="text" name="creator" value={formData.creator} disabled className="input-disabled" />
                                </div>
                                <div className="form-group">
                                    <label>Funding ($)</label>
                                    <input type="number" name="funding" value={formData.funding} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Target (Star Catalog)</label>
                                    <select name="target" value={formData.target} onChange={handleChange}>
                                        <option value="Moon">Moon</option>
                                        <option value="M31">M31</option>
                                        <option value="M42">M42</option>
                                        <option value="Alpha Centauri">Alpha Centauri</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label>Objective</label>
                                <textarea name="objective" rows="3" value={formData.objective} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-grid-2 mt-3">
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Telescope Assigned</label>
                                    <select name="telescope" value={formData.telescope} onChange={handleChange}>
                                        <option value="Hawaii">Hawaii</option>
                                        <option value="Chile">Chile</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-section mt-5">
                            <h3 className="section-title">Data Processing Requirements</h3>
                            <div className="form-grid-3">
                                <div className="form-group">
                                    <label>File Type</label>
                                    <select name="fileType" value={formData.fileType} onChange={handleChange}>
                                        <option value="PNG">PNG</option>
                                        <option value="RAW">RAW</option>
                                        <option value="FITS">FITS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>File Quality</label>
                                    <select name="fileQuality" value={formData.fileQuality} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Fine">Fine</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Color Mode</label>
                                    <select name="colorMode" value={formData.colorMode} onChange={handleChange}>
                                        <option value="B&W">B&W</option>
                                        <option value="Grayscale">Grayscale</option>
                                        <option value="Color">Color</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Contrast</label>
                                    <input type="number" step="0.1" name="contrast" value={formData.contrast} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Exposure</label>
                                    <input type="number" step="0.1" name="exposure" value={formData.exposure} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Highlights</label>
                                    <input type="number" step="0.1" name="highlights" value={formData.highlights} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Shadows</label>
                                    <input type="number" step="0.1" name="shadows" value={formData.shadows} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Whites</label>
                                    <input type="number" step="0.1" name="whites" value={formData.whites} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Blacks</label>
                                    <input type="number" step="0.1" name="blacks" value={formData.blacks} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                            <button type="submit" className="btn-save">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Science Plan
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --brand: #4F46E5; --brand-light: #EEF2FF; --brand-dark: #4338CA;
    --bg: #F8FAFC; --surface: #ffffff; --border: #E2E8F0;
    --text-1: #0F172A; --text-2: #475569; --text-3: #94A3B8;
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
  .edit-main { padding: 40px 32px; max-width: 900px; width: 100%; margin: 0 auto; flex: 1; }
  .edit-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .back-btn { background: transparent; border: none; cursor: pointer; color: var(--text-2); padding: 8px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
  .back-btn:hover { background: #F1F5F9; color: var(--text-1); }
  .edit-header h1 { font-size: 20px; font-weight: 700; color: var(--text-1); }
  .form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
  .section-title { font-size: 16px; font-weight: 600; color: var(--text-1); border-bottom: 2px solid var(--text-1); padding-bottom: 12px; margin-bottom: 24px; }
  .mt-3 { margin-top: 20px; }
  .mt-5 { margin-top: 40px; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
  .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px 24px; }
  .form-group label { display: block; font-size: 12px; font-weight: 500; color: var(--text-2); margin-bottom: 8px; }
  .form-group input, .form-group select, .form-group textarea { width: 100%; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; color: var(--text-1); outline: none; transition: 0.2s; background: var(--surface); }
  .form-group input, .form-group select { height: 42px; padding: 0 12px; }
  .form-group textarea { padding: 12px; resize: vertical; line-height: 1.5; }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-light); }
  .input-disabled { background: #F8FAFC !important; color: var(--text-3) !important; cursor: not-allowed; }
  .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); background: var(--surface); }
  .btn-cancel { background: transparent; color: var(--text-1); font-weight: 500; border: none; padding: 0 16px; border-radius: 6px; cursor: pointer; transition: 0.2s; }
  .btn-cancel:hover { background: #F1F5F9; }
  .btn-save { display: inline-flex; align-items: center; gap: 6px; background: var(--brand); color: #fff; font-weight: 500; border: none; height: 42px; padding: 0 20px; border-radius: 6px; cursor: pointer; transition: 0.2s; }
  .btn-save:hover { background: var(--brand-dark); }
`;