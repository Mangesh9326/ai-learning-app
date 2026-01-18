const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST /api/ai/chat
// @desc    Get AI response (Text or Quiz)
router.post('/chat', auth, async (req, res) => {
  const { message, context, history } = req.body; 

  if (!message) return res.status(400).json({ msg: "Message is required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // SYSTEM PROMPT: This dictates how the AI behaves
    const systemInstruction = `
      You are an expert AI Tutor for a coding platform called AiLearn.
      The student is currently watching a lesson about: "${context}".
      
      RULES:
      1. Be concise, encouraging, and helpful.
      2. IF the user asks for a "Quiz", "Test", or "Question", you MUST return a valid JSON object strictly in this format (no markdown, no extra text):
         {
           "type": "quiz",
           "question": "The actual question here?",
           "options": ["Option A", "Option B", "Option C", "Option D"],
           "correctIndex": 0,
           "explanation": "Why this answer is correct."
         }
      3. For all other questions, return a JSON object:
         {
           "type": "text",
           "content": "Your normal helpful response here."
         }
    `;

    // Construct the chat history for context
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "Understood. I am ready to teach." }] },
        // ... optionally map previous history here
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Clean up response (Gemini sometimes wraps JSON in ```json ... ```)
    const cleanedText = responseText.replace(/```json|```/g, '').trim();

    try {
      const jsonResponse = JSON.parse(cleanedText);
      res.json(jsonResponse);
    } catch (e) {
      // Fallback if AI didn't return valid JSON (rare with good prompting)
      res.json({ type: 'text', content: responseText });
    }

  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json({ msg: "AI Service Error" });
  }
});

module.exports = router;