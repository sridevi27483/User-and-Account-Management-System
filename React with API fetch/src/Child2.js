// src/Child2.js
import React from "react";
import { useSelector } from "react-redux";
import "./FormContainer.css"; // reuse existing styles

export default function Child2() {
  // read current input values (live)
  const liveState = useSelector((s) => ({
    name: s.form.name,
    email: s.form.email,
    password: s.form.password,
  }));

  // create an object that includes only non-empty fields
  const livePreview = {};
  if (liveState.name && liveState.name.trim() !== "") livePreview.name = liveState.name;
  if (liveState.email && liveState.email.trim() !== "") livePreview.email = liveState.email;
  // password intentionally omitted from preview unless you want it:
  // if (liveState.password && liveState.password.trim() !== "") livePreview.password = liveState.password;

  // last submitted snapshot (may be null)
  const last = useSelector((s) => s.form.lastSubmitted);

  // helper to pretty-print the preview object (empty object -> show message)
  const prettyJson = (obj) => {
    if (!obj || Object.keys(obj).length === 0) return null;
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="submitted-list">
      <h4>Child 2 (Read-only View)</h4>

      <div style={{ marginBottom: 12, fontSize: 14, color: "#374151" }}>
        <strong>Live preview (updates while you type):</strong>
      </div>

      {prettyJson(livePreview) ? (
        <pre className="json-box">
{prettyJson(livePreview)}
        </pre>
      ) : (
        <div className="no-submitted" style={{ marginBottom: 16 }}>
          Type in a field to see a live preview.
        </div>
      )}

      <div style={{ marginBottom: 8, fontSize: 14, color: "#374151" }}>
        <strong>Last submitted snapshot:</strong>
      </div>

      {last ? (
        <pre className="json-box">
{`{
  "name": "${last.name}",
  "email": "${last.email}"
}`}
        </pre>
      ) : (
        <div className="no-submitted">No submissions yet.</div>
      )}
    </div>
  );
}
