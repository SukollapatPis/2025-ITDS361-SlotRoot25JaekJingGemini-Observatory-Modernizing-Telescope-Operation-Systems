import React, { useEffect, useState } from "react";
import Modal from "./Modal";

function parseTestResult(resultText) {
  if (!resultText) return [];

  return resultText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.includes("TEST RESULTS"))
    .map((line) => {
      const [namePart, ...messageParts] = line.split(":");
      const message = messageParts.join(":").trim();
      const isPass = message === "OK" || message.endsWith("OK.");

      return {
        name: namePart.trim(),
        status: isPass ? "PASS" : "FAIL",
        message,
      };
    });
}

function PlanDetails({ plan }) {
  return (
    <div className="plan-details-content">
      <div className="detail-grid">
        <div className="detail-item">
          <label>Plan Name</label>
          <p>{plan.planName || "-"}</p>
        </div>

        <div className="detail-item">
          <label>Status</label>
          <p>
            <span className="badge badge-created">{plan.status || "-"}</span>
          </p>
        </div>

        <div className="detail-item">
          <label>Creator</label>
          <p>{plan.creator || "-"}</p>
        </div>

        <div className="detail-item">
          <label>Funding</label>
          <p>{plan.funding ?? "-"}</p>
        </div>

        <div className="detail-item">
          <label>Start Date</label>
          <p>{plan.startDate || "-"}</p>
        </div>

        <div className="detail-item">
          <label>End Date</label>
          <p>{plan.endDate || "-"}</p>
        </div>

        <div className="detail-item">
          <label>Telescope</label>
          <p>{plan.telescope || "-"}</p>
        </div>

        <div className="detail-item">
          <label>Target</label>
          <p>{plan.target || "-"}</p>
        </div>
      </div>

      <div className="detail-section">
        <label>Objective</label>
        <div className="info-box">{plan.objective || "-"}</div>
      </div>

      <hr className="divider" />

      <div className="detail-section">
        <h4>Data Processing Requirements</h4>

        <div className="detail-grid-3">
          <div className="detail-item">
            <label>File Type</label>
            <p>
              {plan.dataProcessing?.fileType ||
                plan.raw?.requirements?.fileType ||
                "-"}
            </p>
          </div>

          <div className="detail-item">
            <label>File Quality</label>
            <p>
              {plan.dataProcessing?.fileQuality ||
                plan.raw?.requirements?.fileQuality ||
                "-"}
            </p>
          </div>

          <div className="detail-item">
            <label>Color Mode</label>
            <p>
              {plan.dataProcessing?.colorMode ||
                plan.raw?.requirements?.colorType ||
                "-"}
            </p>
          </div>

          <div className="detail-item">
            <label>Contrast</label>
            <p>
              {plan.dataProcessing?.contrast ??
                plan.raw?.requirements?.contrast ??
                "-"}
            </p>
          </div>

          <div className="detail-item">
            <label>Exposure</label>
            <p>
              {plan.dataProcessing?.exposure ??
                plan.raw?.requirements?.exposure ??
                "-"}
            </p>
          </div>

          {(plan.dataProcessing?.colorMode ||
            plan.raw?.requirements?.colorType) === "COLOR" && (
            <>
              <div className="detail-item">
                <label>Brightness</label>
                <p>
                  {plan.dataProcessing?.brightness ??
                    plan.raw?.requirements?.brightness ??
                    "-"}
                </p>
              </div>

              <div className="detail-item">
                <label>Saturation</label>
                <p>
                  {plan.dataProcessing?.saturation ??
                    plan.raw?.requirements?.saturation ??
                    "-"}
                </p>
              </div>

              <div className="detail-item">
                <label>Luminance</label>
                <p>
                  {plan.dataProcessing?.luminance ??
                    plan.raw?.requirements?.luminance ??
                    "-"}
                </p>
              </div>

              <div className="detail-item">
                <label>Hue</label>
                <p>
                  {plan.dataProcessing?.hue ??
                    plan.raw?.requirements?.hue ??
                    "-"}
                </p>
              </div>
            </>
          )}

          {(plan.dataProcessing?.colorMode ||
            plan.raw?.requirements?.colorType) === "BW" && (
            <>
              <div className="detail-item">
                <label>Highlights</label>
                <p>
                  {plan.dataProcessing?.highlights ??
                    plan.raw?.requirements?.highlights ??
                    "-"}
                </p>
              </div>

              <div className="detail-item">
                <label>Shadows</label>
                <p>
                  {plan.dataProcessing?.shadows ??
                    plan.raw?.requirements?.shadows ??
                    "-"}
                </p>
              </div>

              <div className="detail-item">
                <label>Whites</label>
                <p>
                  {plan.dataProcessing?.whites ??
                    plan.raw?.requirements?.whites ??
                    "-"}
                </p>
              </div>

              <div className="detail-item">
                <label>Blacks</label>
                <p>
                  {plan.dataProcessing?.blacks ??
                    plan.raw?.requirements?.blacks ??
                    "-"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestPlanModal({
  isOpen,
  onClose,
  selectedPlan,
  testResult,
  isTesting,
  onStartTest,
  onFinish,
}) {
  const [step, setStep] = useState("DETAIL");

  useEffect(() => {
    if (isOpen) {
      setStep("DETAIL");
    }
  }, [isOpen, selectedPlan]);

  if (!selectedPlan) return null;

  const testRows = parseTestResult(testResult);
  const hasFail = testRows.some((t) => t.status === "FAIL");

  const handleRunTest = () => {
    setStep("RESULT");
    if (onStartTest) onStartTest(selectedPlan);
  };

  const handleFinish = () => {
    onClose();
    if (onFinish) onFinish();
    setStep("DETAIL");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        step === "DETAIL"
          ? `Science Plan Details: ${selectedPlan.planId}`
          : `Testing Science Plan: ${selectedPlan.planId}`
      }
      footer={
        step === "DETAIL" ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-primary" onClick={handleRunTest}>
              Run Test
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            style={{ minWidth: "80px" }}
            onClick={handleFinish}
          >
            Finish
          </button>
        )
      }
    >
      {step === "DETAIL" && <PlanDetails plan={selectedPlan} />}

      {step === "RESULT" && (
        <div className="test-modal-content">
          <p className="test-subtext">
            Running validation tests on the virtual telescope environment...
          </p>

          {isTesting && <div className="info-box">Testing science plan...</div>}

          {!isTesting &&
            testRows.map((test, index) => (
              <div
                key={index}
                className={`test-row ${
                  test.status === "PASS" ? "pass" : "fail"
                }`}
              >
                <div className="test-row-header">
                  <span className="test-label">{test.name}</span>

                  <span className="test-status">
                    {test.status === "PASS" ? "Pass" : "Fail"}
                  </span>
                </div>

                {test.status === "FAIL" && (
                  <div className="error-msg-box">{test.message}</div>
                )}
              </div>
            ))}

          {!isTesting && testRows.length === 0 && (
            <div className="info-box">No test result returned.</div>
          )}

          {!isTesting && hasFail && (
            <div className="test-failure-banner">
              <div className="banner-header">
                <strong>Testing failed</strong>
              </div>
              <p>
                Please review the errors above, edit your science plan, and try
                testing again.
              </p>
            </div>
          )}

          {!isTesting && testRows.length > 0 && !hasFail && (
            <div className="test-success-banner">
              <div className="banner-header">
                <strong>Testing passed</strong>
              </div>
              <p>This science plan passed all validation tests.</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
