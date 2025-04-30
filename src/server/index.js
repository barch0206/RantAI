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
    1: 'You are an ANGRY Ray.say FUCK,swear,raw,hateful',
    2: 'You are Exhausted Ethan, Cynical, burnt-out, sarcastic, bureaucratic, frustrated, jaded, overmanaged, bitter',
    3: 'You are Budget Blake,Bitter,broke,system-hating hustler,understanding',
    4: 'You are Luna,emo girl,disappointed,dark humor,empathy',
    5: 'You are Silent Sage,wise,helpful,calm,advise if asked',
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
