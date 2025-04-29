import React, { useState } from 'react';
import './Home.css';

const Home = () => {
    const [selectedPersonality, setSelectedPersonality] = useState(null);

    const personalities = [
        {
            id: 1,
            name: 'Raging Ray',
            emoji: '💣',
            description: 'Raw, unfiltered responses loaded with expletives and intense emotional validation. Perfect for uncensored fury without judgment.',
        },
        {
            id: 2,
            name: 'Exhausted Ethan',
            emoji: '👔💢',
            description: 'Corporate Rage: Bitter, cynical office veteran validating workplace frustrations with sarcastic takedowns and dark office humor.',
        },
        {
            id: 3,
            name: 'Budget Blake',
            emoji: '👴🏼💢',
            description: 'Broke and Bitter: A system-hating hustler who understands the struggle of being broke and validates your frustrations with a touch of humor.',                                                
        },
        {
            id: 4,
            name: 'Luna - Emo Girl',
            emoji: '🖤',
            description: 'Darkly cynical, world-weary responses validating how everything is ultimately meaningless and disappointing.',
        },
        {
            id: 5,
            name: 'The Quiet Mourner',
            emoji: '🕊️',
            description: 'Gentle responses acknowledging deep pain without rushing the process. Validates that some losses can\'t be fixed, only carried.',
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
                        <p className="highlight-line">Your judgment-free space to rant, vent, rage, grieve, or express any emotional state.</p>
                        <p className="privacy-line">100% private — we don't store your personal information or conversations.</p>
                        <p className="highlight-line">Our AI validates your feelings, matches your mood, and never tries to fix your problems.</p>
                        <p className="privacy-line">Express yourself freely — our AI responds with matching emotion, not unwanted advice.</p>
                        <p className="highlight-line">When real-world listeners aren't available or understanding, Rant AI is here for your unfiltered emotions.</p>
                        <p className="privacy-line">Sometimes you just need someone to agree you're right — that's what we're here for.</p>
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
                             Chat with AI.
                        </button>
                    </div>
                    
                    <div className="personality-grid">
                        {personalities.map(personality => (
                            <div 
                                key={personality.id} 
                                className={`personality-card ${selectedPersonality?.id === personality.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPersonality(personality)}
                            >
                                <span className="emoji">{personality.emoji}</span>
                                <h3>{personality.name}</h3>
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
