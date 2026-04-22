import React, { useState } from 'react';

export const TicketForm = ({ onSubmit, isProcessing }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.includes('@') || !form.email.includes('.')) {
      return setError('Please enter a valid email.');
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3>Submit Ticket</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Name" required disabled={isProcessing} onChange={e => setForm({...form, name: e.target.value})} style={{ display: 'block', margin: '10px 0', width: '100%' }}/>
      <input type="email" placeholder="Email" required disabled={isProcessing} onChange={e => setForm({...form, email: e.target.value})} style={{ display: 'block', margin: '10px 0', width: '100%' }}/>
      <input type="text" placeholder="Subject" required disabled={isProcessing} onChange={e => setForm({...form, subject: e.target.value})} style={{ display: 'block', margin: '10px 0', width: '100%' }}/>
      <textarea placeholder="Message" required disabled={isProcessing} onChange={e => setForm({...form, message: e.target.value})} style={{ display: 'block', margin: '10px 0', width: '100%', height: '80px' }}/>
      <button type="submit" disabled={isProcessing}>{isProcessing ? 'Processing...' : 'Run Workflow'}</button>
    </form>
  );
};

export const WorkflowProgress = ({ step }) => (
  <div style={{ margin: '20px 0', padding: '10px', background: '#f0f4f8', borderRadius: '8px' }}>
    <p>{step >= 1 ? '✅' : '⏳'} Classify Ticket {step === 1 && '(Running...)'}</p>
    <p>{step >= 2 ? '✅' : '⏳'} Generate Reply {step === 2 && '(Running...)'}</p>
    <p>{step >= 3 ? '✅' : '⏳'} Escalation Check {step === 3 && '(Running...)'}</p>
  </div>
);

export const ResultCards = ({ data }) => {
  if (!data) return null;
  const wordCount = data.reply ? data.reply.split(/\s+/).length : 0;
  const badLength = wordCount < 80 || wordCount > 120;
  const urgColors = { Low: '#4CAF50', Medium: '#FF9800', High: '#F44336' };

  return (
    <div>
      {data.classification && (
        <div style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px' }}>
          <h4>Classification</h4>
          <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px' }}>{data.classification.category}</span>
          <span style={{ background: urgColors[data.classification.urgency], color: 'white', padding: '4px 8px', borderRadius: '4px', marginLeft: '10px' }}>{data.classification.urgency}</span>
        </div>
      )}

      {data.reply && (
        <div style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px' }}>
          <h4>Draft Reply</h4>
          {badLength && <p style={{ color: 'orange' }}>⚠️ Word count constraint missed ({wordCount} words)</p>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.reply}</p>
          <button onClick={() => navigator.clipboard.writeText(data.reply)}>Copy to Clipboard</button>
        </div>
      )}

      {data.escalation && (
        <div style={{ padding: '15px', background: data.escalation.escalate ? '#ffebee' : '#e8f5e9', border: `2px solid ${data.escalation.escalate ? 'red' : 'green'}` }}>
          <h4>{data.escalation.escalate ? 'ESCALATED' : 'NO ESCALATION REQUIRED'}</h4>
          <p>{data.escalation.reason}</p>
        </div>
      )}
    </div>
  );
};