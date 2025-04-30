import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatPage.css';

import FBomberImage from '../assets/Fbomber.png';
import ExhaustedEthanImg from '../assets/ExhaustedEthan.jpg';
import BudgetBlakeImg from '../assets/BudgetBlake.jpg';
import LunaImg from '../assets/LunaEmoGirl.jpg';
import MournerImg from '../assets/SilentSage.png';

function ChatPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const chatBoxRef = useRef(null);

    const personalities = [
        {
            id: 1,
            name: 'Raging Ray',
            image: FBomberImage
        },
        {
            id: 2,
            name: 'Exhausted Ethan',
            image: ExhaustedEthanImg
        },
        {
            id: 3,
            name: 'Budget Blake',
            image: BudgetBlakeImg
        },
        {
            id: 4,
            name: 'Luna - Emo Girl',
            image: LunaImg
        },
        {
            id: 5,
            name: 'Silent Sage',
            image: MournerImg
        }
    ];

    const personality = personalities.find(p => p.id === parseInt(id));
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsSending(true);

        try {
            const response = await fetch('https://sturdy-system-6xx57wx469x3rpjq-5000.app.github.dev/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, personality: parseInt(id) })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'Oops, something went wrong.' }]);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    if (!personality) {
        return (
            <div className="chat-page">
                <p style={{ color: 'white', padding: '2rem' }}>Invalid personality ID. Please go back.</p>
                <button onClick={handleBackToHome} className="chat-button">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="chat-page">
            <div className="left-section">
                <div className="left-content">
                    <button onClick={handleBackToHome} className="chat-button">
                        Back to Home
                    </button>
                    <h2 className="chat-header">You are chatting with: {personality.name}</h2>
                    <div className="left-image">
                        <img src={personality.image} alt={personality.name} className="Fbomber" />
                    </div>
                    <div className="disclaimer">
                        <p>Disclaimer: This is a judgment-free space. Express yourself freely!</p>
                    </div>
                </div>
            </div>

            <div className="right-section">
                <div className="chat-content">
                    <div className="chat-box" ref={chatBoxRef}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                            >
                                <span>{msg.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage} className="send-button">
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
