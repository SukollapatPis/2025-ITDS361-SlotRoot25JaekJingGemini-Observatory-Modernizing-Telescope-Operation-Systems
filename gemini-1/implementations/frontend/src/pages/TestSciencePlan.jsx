import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Telescope } from "lucide-react";
import TestPlanModal from "../components/TestPlanModal";

export default function TestPlanPage() {
  const navigate = useNavigate();

  const [creatorName, setCreatorName] = useState("");

  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("modified-newest");

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const testRequestIdRef = useRef(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCreatorName(user.name);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    fetch("/api/science-plans/status/CREATED")
      .then((res) => res.json())
      .then((data) => {
        const mappedPlans = data.map((p) => ({
          planId: p.planId,
          planName: p.planName,
          target: p.target,
          telescope: p.telescopeSite,
          status: p.state,

          funding: p.funding,
          startDate: p.startDate?.split("T")[0],
          endDate: p.endDate?.split("T")[0],
          creator: p.creator?.name,
          objective: p.objective,

          dataProcessing: {
            fileType: p.requirements?.fileType,
            fileQuality: p.requirements?.fileQuality,
            colorMode: p.requirements?.colorType,
            contrast: p.requirements?.contrast,
            exposure: p.requirements?.exposure,
            brightness: p.requirements?.brightness,
            saturation: p.requirements?.saturation,
            luminance: p.requirements?.luminance,
            hue: p.requirements?.hue,
            highlights: p.requirements?.highlights,
            shadows: p.requirements?.shadows,
            whites: p.requirements?.whites,
            blacks: p.requirements?.blacks,
          },
          updatedAt: p.lastModified,
          raw: p,
        }));

        setPlans(mappedPlans);
      })
      .catch((err) => {
        console.error("Failed to fetch created science plans:", err);
      });
  };

  const filteredSorted = [...plans]
    .filter((p) => {
      return (
        p.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(p.planId).toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      const da = new Date(a.updatedAt).getTime();
      const db = new Date(b.updatedAt).getTime();
      return sortBy === "modified-newest" ? db - da : da - db;
    });

  const startTest = async (plan) => {
    if (!plan) return;

    const planId = plan.planId;
    const requestId = Date.now();
    testRequestIdRef.current = requestId;

    console.log("START TEST PLAN ID:", planId);

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch(`/api/science-plans/${planId}/test`, {
        method: "POST",
      });

      const text = await res.text();

      console.log("TEST RESULT FOR PLAN:", planId, text);

      if (testRequestIdRef.current !== requestId) {
        return;
      }

      if (!res.ok) {
        setTestResult(`ERROR: ${text}`);
        return;
      }

      setTestResult(text);
    } catch (err) {
      if (testRequestIdRef.current === requestId) {
        setTestResult("Failed to test plan.");
      }
    } finally {
      if (testRequestIdRef.current === requestId) {
        setIsTesting(false);
      }
    }
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

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/astronomer-dashboard")}
          >
            Back to Dashboard
          </button>
        </nav>

        <main>
          <div className="page-header">
            <h1>Test Science Plans</h1>
          </div>

          <div className="controls">
            <div className="search-wrap">
              <svg
                className="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder="Search by plan name or target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sel-wrap">
              <svg
                className="sel-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
              </svg>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
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
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSorted.map((plan) => (
                  <tr key={plan.planId}>
                    <td>
                      <span className="plan-id">{plan.planId}</span>
                    </td>
                    <td>{plan.planName}</td>
                    <td className="text-muted">{plan.target}</td>
                    <td className="text-muted">{plan.telescope}</td>
                    <td>
                      <span className="badge badge-created">{plan.status}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn-test"
                        onClick={() => {
                          testRequestIdRef.current = Date.now();
                          setSelectedPlan(plan);
                          setTestResult(null);
                          setIsTesting(false);
                          setIsTestModalOpen(true);
                        }}
                      >
                        Test
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSorted.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "32px" }}
                    >
                      No created science plans available for testing.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <TestPlanModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        selectedPlan={selectedPlan}
        testResult={testResult}
        isTesting={isTesting}
        onFinish={fetchPlans}
        onStartTest={startTest}
      />
    </>
  );
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
  .btn-test { color: var(--brand); border: 1px solid var(--brand-light); padding: 6px 12px; border-radius: 6px; background: transparent; cursor: pointer; font-weight: 600; font-family: 'Inter', sans-serif; }
  .overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(2px); }
  .modal { background: var(--surface); border-radius: 12px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column; }
  .modal-header { padding: 20px 24px; border-bottom: 2px solid var(--text-1); display: flex; justify-content: space-between; align-items: center; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .detail-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .detail-item label { display: block; font-size: 11px; font-weight: 600; color: var(--text-2); text-transform: uppercase; margin-bottom: 4px; }
  .detail-section { margin-bottom: 16px; }
  .detail-section h4 { font-size: 13px; font-weight: 600; margin-bottom: 12px; }
  .info-box { background: #F8FAFC; border-radius: 8px; padding: 12px; border: 1px solid #F1F5F9; font-size: 13px; }
  .divider { border: 0; border-top: 1px solid var(--border); margin: 20px 0; }
  .history-date { color: var(--text-2); font-size: 12px; }
  .history-log { padding-left: 20px; margin-top: 4px; }
  .test-subtext { color: var(--text-2); font-size: 13px; margin-bottom: 20px; }
  .test-row { display: flex; flex-direction: column; gap: 12px; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 12px; background: #fff; }
  .test-row.fail { border-color: #FCA5A5; }
  .test-row-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
  .test-label { font-weight: 500; color: #334155; }
  .test-status { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
  .pass .test-status { color: #10B981; }
  .fail .test-status { color: #EF4444; }
  .error-msg-box { width: 100%; padding: 10px 12px; background: #FEF2F2; border-radius: 6px; color: #B91C1C; font-size: 13px; border: 1px solid #FCA5A5; line-height: 1.5; }
  .test-failure-banner { margin-top: 24px; padding: 16px; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; color: #991B1B; }
  .banner-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .test-failure-banner p { font-size: 13px; padding-left: 24px; }
  .button-group { display: flex; gap: 12px; }
  .test-success-banner {
  margin-top: 24px;
  padding: 16px;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  color: #166534;
}

.test-success-banner p {
  font-size: 13px;
  padding-left: 0;
}
`;
