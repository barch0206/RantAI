import React, { useState } from 'react';
import './Home.css';

const Home = () => {
    const [selectedPersonality, setSelectedPersonality] = useState(null);

    const personalities = [
        {
            id: 1,
            name: 'Grumpy Old Man',
            emoji: '👴🏼💢',
            description: 'Cranky "back in my day" complaints about modern life',
            color: '#ff6b6b'
        },
        {
            id: 2,
            name: 'Passionate Activist',
            emoji: '✊🏽',
            description: 'Righteous indignation against injustice',
            color: '#ff8e8e'
        },
        {
            id: 3,
            name: 'Corporate Burnout',
            emoji: '👨🏽‍💼☕',
            description: 'Sarcastic workplace humor',
            color: '#ff9e76'
        },
        {
            id: 4,
            name: 'Rage Gamer',
            emoji: '🎮💢',
            description: 'Expletive-filled competitive frustration',
            color: '#ff6b6b'
        },
        {
            id: 5,
            name: 'Snarky Critic',
            emoji: '🤨',
            description: 'Biting, sarcastic commentary',
            color: '#ff8e8e'
        },
        {
            id: 6,
            name: 'Traffic Ranter',
            emoji: '🚗💨',
            description: 'Road rage validation specialist',
            color: '#ff9e76'
        },
        {
            id: 7,
            name: 'The Quiet Mourner',
            emoji: '🕊️',
            description: 'Gentle understanding for grief',
            color: '#8a9bff'
        },
        {
            id: 8,
            name: 'Melancholy Poet',
            emoji: '📜',
            description: 'Contemplative expressions of sadness',
            color: '#8a9bff'
        }
    ];

    const handleStartChatting = () => {
        if (selectedPersonality) {
            window.location.href = `/personality/${selectedPersonality.id}`;
        }
    };

    return (
        <div className="dark-theme">
            <header className="header">
                <nav className="nav">
                    <span className="nav-item">About Us</span>
                    <span className="nav-item">Get Professional Help</span>
                </nav>
            </header>

            <main className="main-content">
                <div className="brand-section">
                    <h1 className="ventai-title">
                        <span className="title-rage">RAGE</span>
                        <span className="title-ai">AI</span>
                    </h1>
                    <div className="description-box">
                        <p className="highlight-line">Your unfiltered emotional outlet for rage, grief, and everything in between</p>
                        <p>• Scream into the void and hear it scream back •</p>
                        <p>• No judgment • No advice • Just validation •</p>
                        <p className="privacy-line">100% anonymous - your rants disappear like steam</p>
                    </div>
                </div>

                <div className="personality-section">
                    <div className="section-header">
                        <h2 className="section-title">PICK YOUR RAGE BUDDY</h2>
                        <button 
                            className={`chat-button ${selectedPersonality ? 'active' : ''}`}
                            onClick={handleStartChatting}
                            disabled={!selectedPersonality}
                        >
                            <span className="button-icon">💥</span> UNLEASH RAGE
                        </button>
                    </div>
                    
                    <div className="personality-grid">
                        {personalities.map(personality => (
                            <div 
                                key={personality.id} 
                                className={`personality-card ${selectedPersonality?.id === personality.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPersonality(personality)}
                                style={{ borderColor: personality.color }}
                            >
                                <span className="emoji" style={{ color: personality.color }}>{personality.emoji}</span>
                                <h3 style={{ color: personality.color }}>{personality.name}</h3>
                                <p className="personality-description">{personality.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;