import React, { useState } from 'react';
import TaskDashboard from './TaskDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const login = async () => {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const userObj = await res.json();
      setUser(userObj);
    } else {
      alert(await res.text());
    }
  };

  const register = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const res = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      alert("Registered successfully! Now log in.");
      setIsRegistering(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      alert(await res.text());
    }
  };

  if (user) {
    return <TaskDashboard user={user} setUser={setUser} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* LEFT: Image panel */}
      <div style={{
        flex: 1,
        backgroundColor: '#f0f4ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        overflow: 'hidden'
      }}>
        <img
          src="/login.jpeg"
          alt="To-do visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* RIGHT: Login/register form */}
      <div style={{
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{
            fontSize: '32px',
            color: '#4f46e5',
            textAlign: 'center',
            marginBottom: '0px'
          }}>
            MyToDos
          </h1>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
            marginBottom: '30px'
          }}>
            Turn plans into progress.
          </p>

          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ marginBottom: 20 }}>{isRegistering ? "Create your account" : "Welcome back"}</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />

            {isRegistering && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={inputStyle}
              />
            )}

            {isRegistering ? (
              <>
                <button onClick={register} style={buttonStyle}>Register</button>
                <p style={switchTextStyle}>
                  Already have an account?{' '}
                  <span style={linkStyle} onClick={() => {
                    setIsRegistering(false);
                    setConfirmPassword('');
                  }}>
                    Log in
                  </span>
                </p>
              </>
            ) : (
              <>
                <button onClick={login} style={buttonStyle}>Login</button>
                <p style={switchTextStyle}>
                  Don’t have an account?{' '}
                  <span style={linkStyle} onClick={() => {
                    setIsRegistering(true);
                    setConfirmPassword('');
                  }}>
                    Register
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginBottom: '10px'
};

const switchTextStyle = {
  fontSize: '0.9em',
  textAlign: 'center'
};

const linkStyle = {
  color: '#4f46e5',
  cursor: 'pointer',
  textDecoration: 'underline'
};

export default App;