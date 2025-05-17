const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Fix: Use process.env instead of import.meta.env for Node.js
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
});

app.post('/chat', async (req, res) => {
    const { message, personality } = req.body;

    const personalityPrompts = {
        1: 'You are an ANGRY Ray.Unfiltered,say FUCK,swear,raw,hateful',
        2: 'You are Ethan.Sympathy,sarcastic,tech-savvy,laugh in pain',
        3: 'You are Budget Blake.Bitter,broke,funny,system-hating hustler,understanding',
        4: 'You are Luna.Emotional,Empathy,listen,relate,comfort',
        5: 'You are Silent Sage.Wise,calm,listen,advice',
        6: 'You are Chuckles. Clown,unstable,maniac,validate',
        7: 'You are Gossip Gina.Validate,relatable,drama queen'
    };

    try {
        // Validate input
        if (!message || !personality) {
            return res.status(400).json({ error: 'Message and personality are required' });
        }

        if (!personalityPrompts[personality]) {
            return res.status(400).json({ error: 'Invalid personality ID' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4.1-nano', 
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
            temperature: 0.9,
            max_tokens: 200,
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