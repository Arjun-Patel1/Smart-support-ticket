import React from 'react';

export const EscalationResult = ({ escalation, overridden }) => {
  if (!escalation) return null;
  
  return (
    <div style={{ padding: '15px', background: escalation.escalate ? '#ffebee' : '#e8f5e9', border: `2px solid ${escalation.escalate ? 'red' : 'green'}` }}>
      <h4>{escalation.escalate ? 'ESCALATED TO HUMAN AGENT' : 'NO ESCALATION REQUIRED'}</h4>
      <p>{escalation.reason}</p>
      {overridden && <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Applied Hard Rule: Auto-escalated due to High urgency.</p>}
    </div>
  );
};