import React from 'react';

export const ClassificationResult = ({ classification }) => {
  if (!classification) return null;
  const urgColors = { Low: 'green', Medium: 'orange', High: 'red' };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px' }}>
      <h4>Classification Result</h4>
      <span style={{ background: '#eee', padding: '6px 10px', borderRadius: '4px', fontWeight: 'bold' }}>{classification.category}</span>
      <span style={{ background: urgColors[classification.urgency], color: 'white', padding: '6px 10px', borderRadius: '4px', marginLeft: '10px', fontWeight: 'bold' }}>{classification.urgency}</span>
    </div>
  );
};
