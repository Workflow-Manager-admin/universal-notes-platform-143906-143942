import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/**
 * Registration Screen for Notes App
 */
// PUBLIC_INTERFACE
function Register() {
  const { register, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (await register({ username, email, password })) {
      // Registration successful, go to login
      navigate("/login");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit} className="dialog-box" style={{ maxWidth: 370 }}>
        <h2 style={{ marginBottom: 16 }}>Register</h2>
        {submitted && error && <div style={{ color: "crimson", marginBottom: 14 }}>{error}</div>}
        <label>
          Username<br />
          <input type="text" value={username} required minLength={3}
            onChange={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" />
        </label>
        <label>
          Email<br />
          <input type="email" value={email} required
            onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label>
          Password<br />
          <input type="password" value={password} required minLength={6}
            onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </label>
        <button type="submit" className="primary" style={{ marginTop: 6, width: "100%" }} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <div style={{ marginTop: 14, textAlign: "center", fontSize: ".99em"}}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: "var(--color-primary)" }}>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
