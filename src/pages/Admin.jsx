import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Admin() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: '', category: 'india', img: '/images/destination-kashmir.png', dest: 'India · Kashmir', 
    title: '', duration: '5 Nights / 6 Days', tour_type: 'Group Tour', price: '₹30,000', badge: 'New'
  });

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      if (!res.ok) throw new Error('Failed to fetch packages from database');
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Validation failed');
      alert('Package added!');
      fetchPackages();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this package?')) return;
    try {
      await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      fetchPackages();
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div style={{ padding: '40px', background: 'var(--clr-bg-secondary)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'var(--ff-heading)', color: 'var(--clr-primary)' }}>Admin Dashboard</h1>
        <Link to="/" className="btn btn-outline" style={{ color: 'var(--clr-primary)', borderColor: 'var(--clr-primary)' }}>View Site</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        {/* ADD FORM */}
        <div style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '20px' }}>Add New Package</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input name="id" placeholder="ID (e.g. goa)" value={formData.id} onChange={handleChange} required style={inputStyle} />
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required style={inputStyle} />
            <input name="dest" placeholder="Destination (e.g. India · Goa)" value={formData.dest} onChange={handleChange} required style={inputStyle} />
            <input name="price" placeholder="Price (e.g. ₹15,999)" value={formData.price} onChange={handleChange} required style={inputStyle} />
            <input name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} required style={inputStyle} />
            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save Package</button>
          </form>
        </div>

        {/* PACKAGE LIST */}
        <div style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '20px' }}>Current Packages</h2>
          {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={thStyle}>ID</th><th style={thStyle}>Title</th><th style={thStyle}>Price</th><th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={tdStyle}>{p.id}</td>
                    <td style={tdStyle}>{p.title}</td>
                    <td style={tdStyle}>{p.price}</td>
                    <td style={tdStyle}>
                      <button onClick={() => handleDelete(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && <tr><td colSpan="4" style={tdStyle}>No packages found in D1 DB.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' };
const thStyle = { padding: '12px 10px', color: 'var(--clr-text-muted)' };
const tdStyle = { padding: '12px 10px' };

export default Admin;
