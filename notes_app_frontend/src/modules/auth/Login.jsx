import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/**
 * Login Screen for Notes App
 */
// PUBLIC_INTERFACE
function Login() {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErr, setShowErr] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setShowErr(false);
    if (await login(email, password)) {
      navigate("/");
    } else {
      setShowErr(true);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-bg)"
    }}>
      <form onSubmit={handleSubmit} className="dialog-box" style={{ maxWidth: 350 }}>
        <h2 style={{ marginBottom: 16 }}>Sign in</h2>
        {showErr && error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}
        <label>
          Email<br />
          <input type="email" value={email} autoFocus required
            onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </label>
        <label>
          Password<br />
          <input type="password" value={password} required
            onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </label>
        <button type="submit" className="primary" style={{ marginTop: 6, width: "100%" }} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <div style={{ marginTop: 14, textAlign: "center", fontSize: ".99em"}}>
          <span>Need an account? </span>
          <Link to="/register" style={{ color: "var(--color-primary)" }}>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
