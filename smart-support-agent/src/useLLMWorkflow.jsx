import { useState } from 'react';
import { getClassificationPrompt, getReplyPrompt, getEscalationPrompt } from './prompts';

export const useLLMWorkflow = () => {
  const [step, setStep] = useState(0); 
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // 🛠️ NEW: Error state to feed the UI

  const cleanJsonResponse = (text) => {
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      throw new Error("The AI returned malformed data. Please try again.");
    }
  };

  const callGroq = async (prompt, requireJson = false) => {
    const key = process.env.REACT_APP_GROQ_API_KEY;
    
    // Check if key exists before even making the network call
    if (!key || key === "your_new_gsk_key_here") {
      throw new Error("API Key is missing or invalid. Please check your .env file.");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    };

    const body = {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    };

    if (requireJson) {
      body.response_format = { type: "json_object" };
    }
    
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      
      if (!res.ok) {
        // 🛠️ PRO FIX: Parse the exact error message from Groq
        const errorData = await res.json();
        const apiErrorMessage = errorData?.error?.message || `API failed with status: ${res.status}`;
        throw new Error(apiErrorMessage);
      }
      
      const json = await res.json();
      return json.choices[0].message.content;
    } catch (err) {
      // Pass the error up the chain
      throw err;
    }
  };

  const processTicket = async (ticket) => {
    setData({ ticket });
    setError(null); // Clear any old errors when starting a new ticket
    
    try {
      setStep(1);
      const classRes = await callGroq(getClassificationPrompt(ticket.message), true);
      const classification = cleanJsonResponse(classRes);
      setData(prev => ({ ...prev, classification }));

      setStep(2);
      const reply = await callGroq(getReplyPrompt(ticket.name, classification.category, classification.urgency, ticket.message), false);
      setData(prev => ({ ...prev, reply }));

      setStep(3);
      const escRes = await callGroq(getEscalationPrompt(classification.category, classification.urgency, ticket.message), true);
      let escalation = cleanJsonResponse(escRes);

      let overridden = false;
      if (classification.urgency === 'High') {
        escalation.escalate = true;
        escalation.reason = "Auto-escalated due to High urgency override.";
        overridden = true;
      }

      setData(prev => ({ ...prev, escalation, overridden }));
      setStep(4);
      
      return { ticket, classification, reply, escalation, overridden };
    } catch (err) {
      console.error("Workflow caught an error:", err);
      // 🛠️ NEW: Set the specific error message to state instead of an alert()
      setError(err.message || "An unexpected network error occurred.");
      setStep(0);
      return null;
    }
  };

  const reset = () => {
    setStep(0);
    setData(null);
    setError(null);
  };

  return { step, data, error, processTicket, reset };
};