import { useState } from "react";

export default function Login({ onEnter, rollNumber }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  function submit(event) {
    event.preventDefault();
    if (username.trim() === rollNumber && password === "Secure@1234") onEnter();
    else
      setMessage(
        "Check your roll number and password, or open the demo below.",
      );
  }
  return (
    <main className="login-page">
      <header className="login-brand brand">
        <span className="brand-mark" aria-hidden="true">
          S
        </span>{" "}
        Student Portal
      </header>
      <div className="login-spread">
        <section className="cover">
          <p className="eyebrow">Artificial Intelligence and Data Science (AIDS)</p>
          <h1>
            Student
            <br />
            <em>notebook.</em>
          </h1>
          <div className="book-stack" aria-hidden="true">
            <div>Data Structures</div>
            <div>Frontend Engineering</div>
            <div>Database Management</div>
          </div>
          <p className="cover-footer">
            Academic workspace <span>Roll {rollNumber}</span>
          </p>
        </section>
        <section className="login-card">
          <h2>Sign in</h2>
          <form className="form-stack" onSubmit={submit}>
            <label>
              Roll number
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label htmlFor="password">Password</label>
            <div className="password">
              <input
                id="password"
                aria-label="Password"
                type={visible ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="quiet"
                type="button"
                aria-label={visible ? "Hide password" : "Show password"}
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Hide" : "Show"}
              </button>
            </div>
            {message && (
              <p className="error" role="alert">
                {message}
              </p>
            )}
            <button type="submit">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>
          <div className="demo-box">
            <strong>Explore the shared demo</strong>
            <p>
              Roll {rollNumber} · Password <code>Secure@1234</code>
            </p>
            <button className="secondary" onClick={onEnter}>
              Open demo workspace
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
