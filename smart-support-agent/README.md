🤖 Smart Support Ticket Workflow
A professional, multi-step AI agentic workflow built with React.js and Groq Llama 3.1. This application automates the triage, response generation, and escalation decision-making process for incoming customer support tickets.

🚀 Overview
This project simulates a real-world support automation system. Instead of a single AI call, it utilizes an Agentic Pipeline where each step informs the next, ensuring high-quality, structured data and professional customer interactions.

The 3-Step Workflow:
Classification: Analyzes intent and assigns a Category (Billing, Tech, etc.) and Urgency (Low, Medium, High).

Personalized Reply: Generates a context-aware email (80-120 words) with a tone that adapts to the ticket's urgency.

Escalation Logic: Decides if a human agent is needed based on specific risk criteria, with a hard-coded safety override for high-priority issues.

🛠️ Tech Stack
Frontend: React.js (Hooks, Functional Components)

AI Engine: Groq Cloud LPU (Model: llama-3.1-8b-instant)

Styling: Modern CSS3 (Inter Font, CSS Variables)

State Management: Custom logic via useLLMWorkflow hook

📂 Project Structure
Following professional separation of concerns:

prompts.js: Centralized prompt engineering with schema enforcement and guardrails.

useLLMWorkflow.js: Custom hook managing the async state machine and API integration.

Components/: Modular UI components (Form, Progress, Results, Log).

.env: Secure environment variable management for API keys.

⚡ Setup & Installation
Clone & Install:

Bash
npm install
Environment Configuration:
Create a .env file in the root directory:

Code snippet
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
Launch:

Bash
npm start
🧪 Testing the Logic
To verify the Hard Rule Override and Tone Adaptation, test with this high-priority scenario:

Subject: URGENT: Billing Error & Legal Notice
Message: You charged my card twice and I cannot pay my rent. If this isn't fixed in 24 hours, I am contacting my lawyer. I want a human to talk to me now!

Expected Result: * Urgency: High

Tone: Highly Apologetic

Escalation: Forced true with the note: "Applied Hard Rule: Auto-escalated due to High urgency."

🛡️ Key Professional Features
Rate-Limit Resilience: Built-in delay logic and error handling to respect API quotas.

Anti-Hallucination Guardrails: Prompts include strict rules to prevent the AI from promising refunds or inventing fake company policies.

Zero-Inference JSON Parsing: Custom sanitization to ensure LLM markdown doesn't break the application state.

UX-First Design: Real-time progress tracking, inline validation, and a persistent session log with expandable details.