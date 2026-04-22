import React from 'react';

export const WorkflowProgress = ({ step }) => (
  <div style={{ margin: '20px 0', padding: '15px', background: '#eef2f5', borderRadius: '8px' }}>
    <h4 style={{ marginTop: 0 }}>Workflow Progress</h4>
    <p>{step >= 1 ? '✅' : '⏳'} Step 1: Classify Ticket {step === 1 && '(Running...)'}</p>
    <p>{step >= 2 ? '✅' : '⏳'} Step 2: Generate Reply {step === 2 && '(Running...)'}</p>
    <p>{step >= 3 ? '✅' : '⏳'} Step 3: Escalation Check {step === 3 && '(Running...)'}</p>
  </div>
);