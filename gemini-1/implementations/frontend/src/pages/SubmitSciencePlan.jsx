import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Telescope } from "lucide-react";

export default function SubmitSciencePlan() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("modified-newest");
  const [message, setMessage] = useState("");

  const fetchPlans = () => {
    fetch("/api/science-plans/status/TESTED")
      .then((res) => res.json())
      .then((data) => {
        const mappedPlans = data.map((p) => ({
          planId: p.planId,
          planName: p.planName,
          target: p.target,
          telescope: p.telescopeSite,
          status: p.state,
          updatedAt: p.lastModified,
        }));

        setPlans(mappedPlans);
      })
      .catch((err) => console.error("Failed to fetch plans:", err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmitPlan = async (plan) => {
    setMessage("");

    try {
      const res = await fetch(`/api/science-plans/${plan.planId}/submit`, {
        method: "POST",
      });

      const text = await res.text();

      if (!res.ok) {
        setMessage(`Submit failed: ${text}`);
        return;
      }

      setMessage(`Plan ${plan.planId} submitted successfully.`);
      fetchPlans();
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Failed to submit plan. Please try again.");
    }
  };

  const filteredSorted = [...plans]
    .filter((p) =>
      p.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(p.planId).includes(searchTerm)
    )
    .sort((a, b) => {
      const da = new Date(a.updatedAt).getTime();
      const db = new Date(b.updatedAt).getTime();
      return sortBy === "modified-newest" ? db - da : da - db;
    });

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
            <h1>Submit Science Plans</h1>
          </div>

          {message && <div className="message-box">{message}</div>}

          <div className="controls">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search by plan name or target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sel-wrap">
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
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSorted.map((plan) => (
                  <tr key={plan.planId}>
                    <td><span className="plan-id">{plan.planId}</span></td>
                    <td>{plan.planName}</td>
                    <td className="text-muted">{plan.target}</td>
                    <td className="text-muted">{plan.telescope}</td>
                    <td><span className="badge badge-created">{plan.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn-primary"
                        onClick={() => handleSubmitPlan(plan)}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSorted.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "32px" }}>
                      No science plans available for submission.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --brand: #4F46E5; --brand-light: #EEF2FF;
    --bg: #FAFAFA; --surface: #ffffff; --border: #E2E8F0;
    --text-1: #0F172A; --text-2: #64748B;
  }
  body { font-family: Inter, sans-serif; background: var(--bg); color: var(--text-1); font-size: 14px; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  nav { background: var(--surface); border-bottom: 1px solid var(--border); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .logo { display: flex; align-items: center; gap: 12px; }
  .logo-icon { width: 36px; height: 36px; background: var(--brand); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .logo-name { font-size: 18px; font-weight: 700; }
  main { padding: 40px 32px; max-width: 1200px; width: 100%; margin: 0 auto; }
  .page-header { margin-bottom: 24px; }
  h1 { font-size: 24px; font-weight: 700; }
  .controls { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; margin-bottom: 24px; }
  .search-wrap { flex: 1; }
  input, select { width: 100%; height: 40px; padding: 0 12px; border: 1px solid var(--border); border-radius: 6px; }
  .sel-wrap { min-width: 220px; }
  .table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 14px 24px; font-size: 12px; font-weight: 600; color: var(--text-2); text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 16px 24px; font-size: 13px; border-bottom: 1px solid #F1F5F9; }
  .plan-id { font-weight: 600; color: var(--brand); }
  .text-muted { color: var(--text-2); }
  .badge { display: inline-flex; padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600; }
  .badge-created { background: #F1F5F9; color: #475569; }
  .btn-primary { display: inline-flex; align-items: center; justify-content: center; height: 40px; padding: 0 16px; background: var(--brand); color: #fff; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; }
  .btn-secondary { background: #F8FAFC; border: 1px solid var(--border); padding: 8px 16px; border-radius: 6px; cursor: pointer; }
  .message-box { margin-bottom: 16px; padding: 12px 16px; border-radius: 8px; background: var(--brand-light); color: var(--brand); font-weight: 500; }
`;