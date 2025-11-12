import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 48 }}>404</h1>
      <p>Page not found.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/app">Open App</Link>
      </div>
    </main>
  );
}
