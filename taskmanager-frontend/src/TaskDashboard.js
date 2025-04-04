import React, { useEffect, useState } from 'react';
import FriendRequests from './FriendRequests';
import Profile from './Profile';

function TaskDashboard({ user, setUser }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', dueDate: '', priority: 'MEDIUM', status: 'PENDING'
  });
  const [sort, setSort] = useState('dueDate');
  const [view, setView] = useState('tasks');
  const [pendingCount, setPendingCount] = useState(0);


  useEffect(() => {
    fetch(`http://localhost:8080/tasks/users/${user.id}/tasks`)
      .then(res => res.json())
      .then(setTasks);
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:8080/friends/requests/${user.id}`)
      .then(res => res.json())
      .then(data => setPendingCount(data.length));
  }, [user]);
  

  const createTask = async () => {
    const res = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, user: { id: user.id } })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setForm({ title: '', description: '', dueDate: '', priority: 'MEDIUM', status: 'PENDING' });
    setView('tasks');
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleStatus = async (task) => {
    const updated = { ...task, status: task.status === 'PENDING' ? 'COMPLETED' : 'PENDING' };
    await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sort === 'priority') return ['LOW', 'MEDIUM', 'HIGH'].indexOf(b.priority) - ['LOW', 'MEDIUM', 'HIGH'].indexOf(a.priority);
    return 0;
  });
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // or use navigate('/') if using React Router
  };
  

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <aside style={{
        width: '220px',
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2 style={{ fontSize: '24px' }}>MyToDos</h2>
        <button onClick={() => setView('tasks')} style={menuButton(view === 'tasks')}>📋 View Tasks</button>
        <button onClick={() => setView('add')} style={menuButton(view === 'add')}>➕ Add Task</button>
        <button onClick={() => setView('requests')} style={menuButton(view === 'requests')}>
            🔔 Friend Requests {pendingCount > 0 && `(${pendingCount})`}
        </button>
        <button onClick={() => handleLogout()} style={logoutButtonStyle}>
            🚪 Logout
        </button>
        <button onClick={() => setView('profile')} style={menuButton(view === 'profile')}>
          👤 Profile
        </button>

      </aside>

      <main style={{ flex: 1, padding: '40px' }}>
        <h2 style={{ color: '#4f46e5' }}>Welcome, {user.email}</h2>

        {view === 'tasks' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <label><strong>Sort By:</strong></label>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ marginLeft: '10px' }}>
                <option value="dueDate">Due Date (Soonest)</option>
                <option value="priority">Priority (Highest)</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {sortedTasks.map(task => (
                <div key={task.id} style={cardStyle}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" checked={task.status === 'COMPLETED'} onChange={() => toggleStatus(task)} />
                      <strong>{task.title}</strong>
                    </div>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                      📅 <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()} <br />
                      ⚙️ <strong>Status:</strong> {task.status} <br />
                      📌 <strong>Priority:</strong> {task.priority}
                    </div>
                  </div>
                  <button onClick={() => deleteTask(task.id)} style={deleteButtonStyle}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'add' && (
          <div style={{ maxWidth: '600px' }}>
            <h3>New Task</h3>

            <label style={labelStyle}>Title</label>
            <input placeholder="Enter task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} />

            <label style={labelStyle}>Description</label>
            <input placeholder="Enter task description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={inputStyle} />

            <label style={labelStyle}>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} style={inputStyle} />

            <label style={labelStyle}>Priority</label>
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={inputStyle}>
              <option>LOW</option><option>MEDIUM</option><option>HIGH</option>
            </select>

            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
              <option>PENDING</option><option>COMPLETED</option>
            </select>

            <button onClick={createTask} style={buttonStyle}>Add Task</button>
          </div>
        )}

        {/* {view === 'requests' && (
          <FriendRequests user={user} />
        )} */}
        {view === 'requests' && (
              <FriendRequests user={user} onUpdate={() => setPendingCount(prev => Math.max(0, prev - 1))} />
        )}

        {view === 'profile' && <Profile user={user} setUser={setUser} />}

      </main>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '4px',
  marginTop: '12px'
};

const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '10px'
};

const deleteButtonStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 12px',
  cursor: 'pointer'
};

const cardStyle = {
  background: '#fff',
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const menuButton = (active) => ({
  backgroundColor: active ? '#6366f1' : 'transparent',
  color: 'white',
  border: 'none',
  textAlign: 'left',
  padding: '10px 15px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: active ? 'bold' : 'normal'
});

const logoutButtonStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '10px 15px',
  cursor: 'pointer',
  marginTop: 'auto' // push to bottom of sidebar
};

export default TaskDashboard;
