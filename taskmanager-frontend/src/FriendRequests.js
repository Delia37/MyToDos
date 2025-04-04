import React, { useEffect, useState } from 'react';

function FriendRequests({ user, onUpdate }) {
  const [requests, setRequests] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const respondToRequest = async (id, action) => {
    const res = await fetch(`http://localhost:8080/friends/request/${id}/${action}`, {
      method: 'PUT'
    });
  
    if (res.ok) {
      setRequests(prev => prev.filter(req => req.id !== id)); // remove locally
      onUpdate?.(); // 🔔 decrease counter
    }
  };
  

  const sendFriendRequest = async () => {
    setMessage('');
    try {
      const res = await fetch(`http://localhost:8080/users/email/${email}`);
      if (!res.ok) {
        setMessage('User not found');
        return;
      }
      const foundUser = await res.json();
      const response = await fetch(`http://localhost:8080/friends/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: user.id, receiverId: foundUser.id })
      });
      const text = await response.text();
      setMessage(text);
      setEmail('');
    } catch (err) {
      setMessage('Error sending request');
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/friends/requests/${user.id}`)
      .then(res => res.json())
      .then(setRequests);
  }, [user.id]);
  

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '30px' }}>
      <h2 style={{ color: '#4f46e5' }}>Friend Requests</h2>

      <h3>Send Friend Request</h3>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ ...inputStyle, width: '100%', marginBottom: '10px' }}
      />
      <button
        onClick={sendFriendRequest}
        style={{ ...acceptButton, marginBottom: '10px' }}
      >
        Send Request
      </button>
      {message && <p style={{ color: '#4f46e5' }}>{message}</p>}

      <h3>Pending Requests</h3>
      {requests.length === 0 ? (
        <p>No pending friend requests.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {requests.map(req => (
            <li key={req.id} style={cardStyle}>
              <div>
                <strong>{req.sender.email}</strong><br />
                <span style={{ fontSize: '13px', color: '#888' }}>
                  Sent: {new Date(req.timestamp).toLocaleString()}
                </span>
              </div>
              <div>
                <button onClick={() => respondToRequest(req.id, 'accept')} style={acceptButton}>Accept</button>
                <button onClick={() => respondToRequest(req.id, 'reject')} style={rejectButton}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const acceptButton = {
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '6px 12px',
  marginRight: '8px',
  cursor: 'pointer'
};

const rejectButton = {
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '6px 12px',
  cursor: 'pointer'
};

const cardStyle = {
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default FriendRequests;
