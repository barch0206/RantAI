import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Void.css'; // You can create styling similar to ChatPage.css
import VoidImg from './assets/Void.png'; // Placeholder for Void image

function VoidChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatBoxRef = useRef(null);
    const navigate = useNavigate();

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        setMessages(prev => [...prev, { sender: 'user', text: input }]);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    const handleBackToHome = () => {
        navigate('/Home');
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-page void-theme">
            <div className="left-section">
                <div className="left-content">
                    <button onClick={handleBackToHome} className="chat-button">
                        Back to Home
                    </button>

                    <h2 className="chat-header">You're in the Void.</h2>
                    <div className="left-image">
                        <img src={VoidImg} alt={VoidImg} className="Void" />
                    </div>
                    <div className="disclaimer">
                        <p>This space listens. No responses. Free of charge. Just rant.</p>
                        <p>We do not process any chats here. The chats get auto deleted once window is closed.</p>
                    </div>
                </div>
            </div>

            <div className="right-section">
                <div className="chat-content">
                    <div className="chat-box" ref={chatBoxRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className="chat-message user-message">
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
                        placeholder="Type what's on your mind..."
                    />
                    <button onClick={handleSendMessage} className="send-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VoidChatPage;
