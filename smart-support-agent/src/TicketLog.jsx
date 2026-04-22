import React, { useState } from 'react';

export const TicketLog = ({ logs }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (logs.length === 0) return <p style={{ color: '#666' }}>No tickets processed in this session.</p>;

  return (
    <div>
      <h2>Session Log ({logs.length})</h2>
      {logs.map((log, index) => {
        const isExpanded = expandedIndex === index;
        
        return (
          <div key={index} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{log.ticket.name}</strong> — {log.ticket.subject} <br/>
                <span style={{ fontSize: '13px', background: '#eee', padding: '3px 6px', marginRight: '5px' }}>{log.classification.category}</span>
                <span style={{ fontSize: '13px', background: log.classification.urgency === 'High' ? 'red' : log.classification.urgency === 'Medium' ? 'orange' : 'green', color: 'white', padding: '3px 6px' }}>{log.classification.urgency}</span>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: log.escalation.escalate ? 'red' : 'green', marginLeft: '10px' }}>
                  {log.escalation.escalate ? 'Escalated' : 'Resolved'}
                </span>
              </div>
              <button onClick={() => setExpandedIndex(isExpanded ? null : index)} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {/* Expandable Section */}
            {isExpanded && (
              <div style={{ marginTop: '15px', background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                <p><strong>Classification Reason:</strong> {log.classification.reasoning}</p>
                <p><strong>Escalation Reason:</strong> {log.escalation.reason}</p>
                <hr style={{ border: '0.5px solid #ddd' }} />
                <p><strong>Generated Reply:</strong></p>
                <p style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{log.reply}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};