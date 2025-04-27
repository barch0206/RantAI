import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
    const { id } = useParams(); // Get the personality ID from the URL
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    // Define personalities
    const personalities = [
        { id: 1, name: 'F-Bomb Machine' },
        { id: 2, name: 'Corporate Rage' },
        { id: 3, name: 'Grumpy Old Man' },
        { id: 4, name: 'Emo Girl' },
        { id: 5, name: 'The Quiet Mourner' }
    ];

    const personality = personalities.find(p => p.id === parseInt(id));

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    
    // Handle message sending
    const handleSendMessage = () => {
        if (input.trim() === '') return;

        // Add user message
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'user', text: input }
        ]);

        // Simulate a bot reply after a delay (ChatGPT logic can be added here)
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: `${input}eeeee`}
            ]);
        }, 1000);

        setInput(''); // Clear input
    };

    const handleBackToHome = () => {
        navigate('/'); // Navigates back to the home page
    };

    return (
        <div className="chat-page">
            <div className="left-section">
                <div className="left-content">
                    <h1>{personality ? personality.name : 'Loading...'} - Chat</h1>
                    {/* Left Partition Content (for image, disclaimer, etc.) */}
                    <div className="left-image">
                        <img src="path_to_image.jpg" alt="Image" className="image" />
                    </div>
                    <div className="disclaimer">
                        <p>Disclaimer: This is a judgment-free space. Express yourself freely!</p>
                    </div>
                    <button onClick={handleBackToHome} className="chat-button">
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="right-section">
                <div className="chat-content">
                    <div className="chat-box">
                        {/* Display chat messages */}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                            >
                                <span>{msg.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="input-section">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage} className="send-button">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
