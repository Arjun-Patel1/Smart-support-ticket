// src/TicketForm.jsx
import React, { useState } from 'react';

export const TicketForm = ({ onSubmit, isProcessing }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const validateAndSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email || !form.email.includes('@') || !form.email.includes('.')) newErrors.email = "Valid email is required.";
    if (!form.subject) newErrors.subject = "Subject is required.";
    if (!form.message) newErrors.message = "Message is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) onSubmit(form);
  };

  return (
    <div className="card">
      <h3>Submit New Support Ticket</h3>
      <form onSubmit={validateAndSubmit}>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Customer Name</label>
            <input type="text" placeholder="Jane Doe" disabled={isProcessing} onChange={e => setForm({...form, name: e.target.value})} />
            {errors.name && <span style={{ color: 'var(--danger-text)', fontSize: '12px' }}>{errors.name}</span>}
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Email Address</label>
            <input type="email" placeholder="jane@example.com" disabled={isProcessing} onChange={e => setForm({...form, email: e.target.value})} />
            {errors.email && <span style={{ color: 'var(--danger-text)', fontSize: '12px' }}>{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input type="text" placeholder="Brief description of the issue" disabled={isProcessing} onChange={e => setForm({...form, subject: e.target.value})} />
          {errors.subject && <span style={{ color: 'var(--danger-text)', fontSize: '12px' }}>{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label>Message Details</label>
          <textarea rows="4" placeholder="Please provide as much detail as possible..." disabled={isProcessing} onChange={e => setForm({...form, message: e.target.value})} />
          {errors.message && <span style={{ color: 'var(--danger-text)', fontSize: '12px' }}>{errors.message}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={isProcessing}>
          {isProcessing ? '⚙️ Processing Workflow...' : 'Submit Ticket & Run AI Workflow'}
        </button>
      </form>
    </div>
  );
};