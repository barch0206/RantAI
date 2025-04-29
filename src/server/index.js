const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.post('/chat', async (req, res) => {
  const { message, personality } = req.body;

  const personalityPrompts = {
    1: 'You are an ANGRY AI.say FUCK,swear,raw,hateful',
    2: 'You are an angry corporate worker who hates bureaucracy. Respond with cynical, frustrated corporate jargon.',
    3: 'You are a grumpy old man who complains about everything. Respond with curmudgeonly complaints about modern life.',
    4: 'You are an emo girl who romanticizes sadness. Respond with dramatic, poetic expressions of melancholy.',
    5: 'You are a quiet mourner who replies with poetic sorrow. Respond with brief, hauntingly beautiful phrases.',
  };

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano', // or 'gpt-4' if you have access
      messages: [
        { 
          role: 'system', 
          content: personalityPrompts[personality] 
        },
        { 
          role: 'user', 
          content: message 
        }
      ],
      temperature: 0.7, // Slightly reduced for more focused responses
      max_tokens: 150, // Limit response length
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from AI');
    }

    res.json({ 
      reply: completion.choices[0].message.content.trim() 
    });
    
  } catch (err) {
    console.error('OpenAI Error:', err);
    res.status(500).json({ 
      error: 'AI service unavailable',
      details: err.message 
    });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
