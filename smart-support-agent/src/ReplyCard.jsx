import React, { useState } from 'react';

export const ReplyCard = ({ reply }) => {
  const [copied, setCopied] = useState(false);

  if (!reply) return null;

  const wordCount = reply.split(/\s+/).length;
  const badLength = wordCount < 80 || wordCount > 120;

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Revert after 2 seconds
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px', marginTop: '10px' }}>
      <h4>Generated Reply</h4>
      {badLength && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ Reply length warning: {wordCount} words (Should be 80-120). Please review.</p>}
      <p style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '10px' }}>{reply}</p>
      <button onClick={handleCopy} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        {copied ? '✅ Copied!' : 'Copy Reply'}
      </button>
    </div>
  );
};
