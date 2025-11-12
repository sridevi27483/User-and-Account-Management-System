import React from "react";

function Login() {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "#f0f2f5" 
    }}>
      <div style={{ 
        background: "#fff", 
        padding: "30px", 
        borderRadius: "10px", 
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)", 
        width: "320px",
        textAlign: "center"
      }}>
        <h2>Sign In</h2>
        <form>
          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <label>Username</label><br />
            <input 
              type="text" 
              placeholder="Enter username" 
              style={{ width: "100%", padding: "8px" }} 
            />
          </div>

          <div style={{ marginBottom: "12px", textAlign: "left" }}>
            <label>Password</label><br />
            <input 
              type="password" 
              placeholder="Enter password" 
              style={{ width: "100%", padding: "8px" }} 
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: "100%", 
              background: "#007bff", 
              color: "white", 
              border: "none", 
              padding: "10px", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
