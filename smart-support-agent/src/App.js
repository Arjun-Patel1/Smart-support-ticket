// src/App.jsx
import React, { useState } from 'react';
import { useLLMWorkflow } from './useLLMWorkflow';
import { TicketForm } from './TicketForm';
import { WorkflowProgress } from './WorkflowProgress';
import { ClassificationResult } from './ClassificationResult';
import { ReplyCard } from './ReplyCard';
import { EscalationResult } from './EscalationResult';
import { TicketLog } from './TicketLog';

function App() {
  const { step, data, error, processTicket, reset } = useLLMWorkflow();
  const [logs, setLogs] = useState([]);

  const handleTicket = async (formData) => {
    const result = await processTicket(formData);
    if (result) {
      setLogs(prev => [result, ...prev]);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="header-title">Smart Support Agent</h1>
      
      <TicketForm onSubmit={handleTicket} isProcessing={step > 0 && step < 4} />
      
      {error && (
        <div className="alert-box alert-error" style={{ marginBottom: '24px' }}>
          <strong>⚠️ Workflow Error:</strong> {error}
        </div>
      )}

      {step > 0 && (
        <div className="card">
          <WorkflowProgress step={step} />
          
          <div style={{ marginTop: '20px' }}>
            {data?.classification && <ClassificationResult classification={data.classification} />}
            {data?.reply && <ReplyCard reply={data.reply} />}
            {data?.escalation && <EscalationResult escalation={data.escalation} overridden={data.overridden} />}
          </div>

          {step === 4 && (
            <button onClick={reset} className="btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
              Clear and Process New Ticket
            </button>
          )}
        </div>
      )}
      
      <div className="card">
        <TicketLog logs={logs} />
      </div>
    </div>
  );
}

export default App;