import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Telescope } from "lucide-react";

export default function CreateSciencePlan() {
  const navigate = useNavigate();

  const [creatorName, setCreatorName] = useState("");
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [metadata, setMetadata] = useState({
    targets: [],
    telescopeSites: [],
    fileTypes: [],
    fileQualities: [],
    colorTypes: [],
  });
  const rangeFields = [
    "contrast",
    "exposure",
    "brightness",
    "saturation",
    "highlights",
    "shadows",
    "whites",
    "blacks",
    "luminance",
    "hue",
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCreatorName(user.name);
    }
  }, []);

  useEffect(() => {
    fetch("/api/science-plans/metadata/enums")
      .then((res) => res.json())
      .then((data) => {
        setMetadata(data);
      })
      .catch((err) => {
        console.error("Failed to fetch metadata:", err);
      });
  }, []);

  const [formData, setFormData] = useState({
    planName: "",
    funding: 0,
    targetName: "Auriga",
    objective: "",
    startDate: "",
    endDate: "",
    telescopeSite: "HAWAII",
    fileType: "JPEG",
    fileQuality: "Low",
    colorType: "COLOR",
    contrast: 1,
    exposure: 1,
    brightness: 1,
    saturation: 1,
    luminance: 1,
    hue: 1,
    highlights: 1,
    shadows: 1,
    whites: 1,
    blacks: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "planName" && value.length > 50) return;

    if (name === "funding") {
      const num = Math.max(0, Number(value));
      setFormData((prev) => ({
        ...prev,
        [name]: num,
      }));
      return;
    }

    if (rangeFields.includes(name)) {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: "",
        }));
        return;
      }

      const num = Number(value);
      if (num < 0 || num > 50) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBackAttempt = (e) => {
    if (e) e.preventDefault();
    setShowDiscardModal(true);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    const body = {
      planName: formData.planName,
      funding: parseFloat(formData.funding),
      objective: formData.objective,
      targetName: formData.targetName,
      telescopeSite: formData.telescopeSite,
      startDate: formData.startDate
        ? `${formData.startDate}T22:00:00.000+07:00`
        : null,
      endDate: formData.endDate
        ? `${formData.endDate}T23:00:00.000+07:00`
        : null,
      fileType: formData.fileType,
      fileQuality: formData.fileQuality,
      colorType: formData.colorType,

      contrast: parseFloat(formData.contrast),
      exposure: parseFloat(formData.exposure),

      ...(formData.colorType === "COLOR" && {
        brightness: parseFloat(formData.brightness),
        saturation: parseFloat(formData.saturation),
        luminance: parseFloat(formData.luminance),
        hue: parseFloat(formData.hue),
      }),

      ...(formData.colorType === "BW" && {
        highlights: parseFloat(formData.highlights),
        shadows: parseFloat(formData.shadows),
        whites: parseFloat(formData.whites),
        blacks: parseFloat(formData.blacks),
      }),
    };

    console.log("CREATE BODY:", body);

    try {
      const res = await fetch("/api/science-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error("CREATE API ERROR:", responseText);
        throw new Error(responseText);
      }

      navigate("/astronomer-dashboard", {
        state: {
          justSaved: true,
          message:
            "Science Plan created successfully. Please test before submitting.",
        },
      });
    } catch (err) {
      console.error("❌ Create plan error:", err);
      alert("Failed to save science plan. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const NumberField = ({ name, label }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="number"
        step="0.1"
        min="0"
        max="50"
        name={name}
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <>
      <style>{css}</style>

      {showDiscardModal && (
        <div className="modal-overlay">
          <div className="discard-modal">
            <div className="modal-header-simple">
              <span className="modal-title">Discard Changes?</span>
              <button
                className="close-x"
                onClick={() => setShowDiscardModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body-simple">
              <p>
                Are you sure you want to discard your changes? Any unsaved data
                will be lost.
              </p>
            </div>
            <div className="modal-footer-simple">
              <button
                className="btn-keep"
                onClick={() => setShowDiscardModal(false)}
              >
                Keep Editing
              </button>
              <button
                className="btn-discard"
                onClick={() => navigate("/astronomer-dashboard")}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div className="user-name">{creatorName}</div>
              <div className="user-role">Astronomer</div>
            </div>
            <button
              className="logout-btn"
              title="Sign out"
              onClick={handleLogout}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
        </nav>

        <main className="form-main">
          <div className="form-header">
            <button className="back-btn" onClick={handleBackAttempt}>
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h1>Create Science Plan</h1>
          </div>

          <form className="form-card" onSubmit={handleSave}>
            {/* Section 1: General Information */}
            <div className="form-section">
              <h3 className="section-title">General Information</h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Plan Name</label>
                  <input
                    type="text"
                    name="planName"
                    value={formData.planName}
                    onChange={handleChange}
                    placeholder="Enter plan name"
                    maxLength={50}
                  />
                  <small>{formData.planName.length}/50 characters</small>
                </div>
                <div className="form-group">
                  <label>Creator</label>
                  <input
                    type="text"
                    value={creatorName}
                    disabled
                    className="input-disabled"
                  />
                </div>

                <div className="form-group">
                  <label>Funding ($)</label>
                  <input
                    type="number"
                    name="funding"
                    value={formData.funding}
                    onChange={handleChange}
                    min="0"
                    step={100}
                  />
                </div>
                <div className="form-group">
                  <label>Target (Star Catalog)</label>
                  <select
                    name="targetName"
                    value={formData.targetName}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Target --</option>

                    {metadata.targets.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Objective</label>
                <textarea
                  name="objective"
                  rows="3"
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="Describe the science objective..."
                ></textarea>
              </div>

              <div className="form-grid-2 mt-3">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Telescope Assigned</label>
                  <select
                    name="telescopeSite"
                    value={formData.telescopeSite}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Telescope --</option>

                    {metadata.telescopeSites.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Data Processing Requirements */}
            <div className="form-section mt-5">
              <h3 className="section-title">Data Processing Requirements</h3>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>File Type</label>
                  <select
                    name="fileType"
                    value={formData.fileType}
                    onChange={handleChange}
                  >
                    {metadata.fileTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>File Quality</label>
                  <select
                    name="fileQuality"
                    value={formData.fileQuality}
                    onChange={handleChange}
                  >
                    {metadata.fileQualities.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Color Type</label>
                  <select
                    name="colorType"
                    value={formData.colorType}
                    onChange={handleChange}
                  >
                    {metadata.colorTypes.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <NumberField name="contrast" label="Contrast" />
                <NumberField name="exposure" label="Exposure" />

                {formData.colorType === "COLOR" && (
                  <>
                    <NumberField name="brightness" label="Brightness" />
                    <NumberField name="saturation" label="Saturation" />
                    <NumberField name="luminance" label="Luminance" />
                    <NumberField name="hue" label="Hue" />
                  </>
                )}

                {formData.colorType === "BW" && (
                  <>
                    <NumberField name="highlights" label="Highlights" />
                    <NumberField name="shadows" label="Shadows" />
                    <NumberField name="whites" label="Whites" />
                    <NumberField name="blacks" label="Blacks" />
                  </>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleBackAttempt}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
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

  .form-main { padding: 40px 32px; max-width: 900px; width: 100%; margin: 0 auto; flex: 1; }
  .form-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .back-btn { background: transparent; border: none; cursor: pointer; color: var(--text-2); padding: 8px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .back-btn:hover { background: #F1F5F9; color: var(--text-1); }
  .form-header h1 { font-size: 20px; font-weight: 700; }

  .form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
  .section-title { font-size: 15px; font-weight: 600; color: var(--text-1); border-bottom: 2px solid var(--text-1); padding-bottom: 12px; margin-bottom: 24px; }
  
  .mt-3 { margin-top: 20px; }
  .mt-5 { margin-top: 40px; }

  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
  .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px 24px; }
  
  .form-group label { display: block; font-size: 12px; font-weight: 500; color: var(--text-2); margin-bottom: 8px; }
  .form-group input, .form-group select, .form-group textarea { width: 100%; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; color: var(--text-1); outline: none; background: var(--surface); }
  .form-group input, .form-group select { height: 42px; padding: 0 12px; }
  .form-group textarea { padding: 12px; resize: vertical; line-height: 1.5; }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-light); }
  .input-disabled { background: #F8FAFC !important; color: var(--text-3) !important; cursor: not-allowed; }

  .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); }
  .btn-cancel { background: transparent; color: var(--text-1); font-weight: 500; border: none; padding: 0 16px; border-radius: 6px; cursor: pointer; }
  .btn-cancel:hover { background: #F1F5F9; }
  .btn-save { display: inline-flex; align-items: center; gap: 8px; background: var(--brand); color: #fff; font-weight: 500; border: none; height: 42px; padding: 0 20px; border-radius: 6px; cursor: pointer; }
  .btn-save:hover { background: var(--brand-dark); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
  .discard-modal { background: #fff; width: 100%; max-width: 440px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden; }
  .modal-header-simple { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .modal-title { font-weight: 600; color: var(--text-1); font-size: 16px; }
  .close-x { background: none; border: none; font-size: 18px; color: var(--text-3); cursor: pointer; }
  .modal-body-simple { padding: 24px 20px; color: var(--text-2); font-size: 14px; line-height: 1.5; }
  .modal-footer-simple { padding: 12px 20px 20px; display: flex; justify-content: flex-end; gap: 12px; }
  .btn-keep { background: #F8FAFC; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; color: var(--text-1); cursor: pointer; }
  .btn-keep:hover { background: #F1F5F9; }
  .btn-discard { background: #DC2626; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
  .btn-discard:hover { background: #B91C1C; }
`;
