import React, { useEffect, useState } from 'react';

function Profile({ user, setUser }) {
  const [form, setForm] = useState({ username: '', description: '', password: '' });
  const [friends, setFriends] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load profile info
    fetch(`http://localhost:8080/users/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          username: data.username || '',
          description: data.description || '',
          password: ''
        });
      });

    // Load accepted friends
    fetch(`http://localhost:8080/friends/friends/${user.id}`)
      .then(res => res.json())
      .then(setFriends);
  }, [user.id]);

  const updateProfile = async () => {
    const res = await fetch(`http://localhost:8080/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setMessage('Profile updated!');
    } else {
      setMessage('Error updating profile');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ color: '#4f46e5' }}>My Profile</h2>

      <label style={labelStyle}>Username</label>
      <input
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        style={inputStyle}
      />

      <label style={labelStyle}>Description</label>
      <textarea
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        style={{ ...inputStyle, minHeight: 80 }}
      />

      <label style={labelStyle}>Change Password</label>
      <input
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        placeholder="New password"
        style={inputStyle}
      />

      <button onClick={updateProfile} style={buttonStyle}>Update Profile</button>
      {message && <p style={{ color: '#4f46e5', marginTop: '10px' }}>{message}</p>}

      <h3 style={{ marginTop: '40px' }}>My Friends</h3>
      <ul style={{ paddingLeft: 0 }}>
        {friends.length === 0 && <li style={{ color: '#888' }}>No friends yet</li>}
        {friends.map(friend => (
          <li key={friend.id} style={friendItem}>
            👤 {friend.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: 5,
  marginTop: 15
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
  marginBottom: '10px'
};

const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const friendItem = {
  background: '#f3f4f6',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '6px'
};

export default Profile;
