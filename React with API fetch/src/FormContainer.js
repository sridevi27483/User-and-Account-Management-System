import React, { useState } from "react";
import { loginUser, fetchCustomers } from "./api/authApi";
import { useNavigate } from "react-router-dom";

export default function FormContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!username.trim() || !password) {
      setMsg("Please enter username and password.");
      return;
    }

    try {
      const res = await loginUser({ username, password });
      const token = res?.token ?? res?.access_token ?? res?.data?.token ?? res;
      console.log("JWT token:", token);

      setMsg("✅ You are successfully logged in!");
      // Optional: Fetch customers after login
      const customers = await fetchCustomers(token);
      console.log("Fetched customers:", customers);

      // Redirect after 1.5s
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Login failed:", err);
      setMsg(`❌ Login failed: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        {msg && (
          <p style={{ marginTop: "16px", fontSize: "14px", color: "#333" }}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
