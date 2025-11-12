// src/FormComponents.js
import React from "react";

export default function FormComponents({ name, email, password, onName, onEmail, onPassword }) {
  return (
    <>
      <label className="field">
        <div className="label-text">Name</div>
        <input
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </label>

      <label className="field">
        <div className="label-text">Email</div>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </label>

      <label className="field">
        <div className="label-text">Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          placeholder="*******"
        />
      </label>
    </>
  );
}
    