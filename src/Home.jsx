import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { logout } from './AuthContext';
import { getUserTokensCount } from './UserService';
import './Home.css';

// Personality images
import FBomberImage from './assets/Fbomber.png';
import CorporateRageImage from './assets/ExhaustedEthan.jpg';
import BudgetBlake from './assets/BudgetBlake.jpg';
import EmoGirlImage from './assets/LunaEmoGirl.jpg';
import QuietMournerImage from './assets/SilentSage.png';
import CreepyChucklesImg from './assets/CreepyChuckles.png';
import GinaImg from './assets/Gina.png';
import VoidImg from './assets/Void.png';

const Home = () => {
    const [selectedPersonality, setSelectedPersonality] = useState(null);
    const [tokens, setTokens] = useState(0);
    const [isCheckingTokens, setIsCheckingTokens] = useState(false);
    const navigate = useNavigate();

    const personalities = [
        {
            id: 1,
            name: 'Raging Ray',
            image: FBomberImage,
            description: 'Raw, unfiltered responses loaded with expletives and intense emotional validation. Perfect for uncensored fury without judgment.',
        },
        {
            id: 2,
            name: 'Exhausted Ethan',
            image: CorporateRageImage,
            description: 'Corporate Rage: Bitter, cynical office veteran validating workplace frustrations with sarcastic takedowns and dark office humor.',
        },
        {
            id: 3,
            name: 'Budget Blake',
            image: BudgetBlake,
            description: 'Broke and Bitter: A system-hating hustler who understands the struggle of being broke and validates your frustrations with a touch of humor.',
        },
        {
            id: 4,
            name: 'Luna - Emo Girl',
            image: EmoGirlImage,
            description: 'Darkly cynical, world-weary responses validating how everything is ultimately meaningless and disappointing.',
        },
        {
            id: 5,
            name: 'Silent Sage',
            image: QuietMournerImage,
            description: 'Gentle responses acknowledging deep pain without rushing the process. Validates that some losses can\'t be fixed, only carried.',
        },
        {
            id: 6,
            name: 'Creepy Chuckles',
            image: CreepyChucklesImg,
            description: 'This clown validates your darkest thoughts with inappropriate laughter and uncomfortably astute observations.',
        },
        {
            id: 7,
            name: 'Gossip Gina',
            image: GinaImg,
            description: 'A gossip-loving friend who validates your feelings with a side of juicy drama and relatable stories. Always ready to listen and spill the tea.',
        },
        {
            id: 8,
            name: 'The Void',
            image: VoidImg,
            description: 'A space that listens. No responses. No judgment. Just rant. We do not store or process any chats here. The chats get auto deleted once window is closed.',
        }
    ];

    // Fetch tokens on component mount and auth changes
    useEffect(() => {
        const fetchTokens = async () => {
            const uid = auth.currentUser?.uid;
            if (uid) {
                try {
                    const tokenCount = await getUserTokensCount(uid);
                    setTokens(tokenCount);
                } catch (error) {
                    console.error("Failed to fetch tokens:", error);
                }
            }
        };

        const unsubscribe = auth.onAuthStateChanged(() => {
            fetchTokens();
        });

        return () => unsubscribe();
    }, []);

    const handleStartChatting = async () => {
    if (!selectedPersonality) return;

    // Skip token checks if "The Void" is selected
    if (selectedPersonality.name === "The Void") {
        navigate('../void');
        return;
    }

    if (isCheckingTokens) return;

    setIsCheckingTokens(true);
    try {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            navigate('/login');
            return;
        }

        const availableTokens = await getUserTokensCount(uid);
        setTokens(availableTokens);

        if (availableTokens > 0) {
            navigate(`/personality/${selectedPersonality.id}`);
        } else {
            alert("You're out of tokens. Redirecting to purchase page...");
            navigate('/login'); // Update this to token purchase page later
        }
    } catch (error) {
        console.error("Error checking tokens:", error);
        alert("Failed to check token balance. Please try again.");
    } finally {
        setIsCheckingTokens(false);
    }
};


    const handleCardClick = (personality) => {
        setSelectedPersonality(
            selectedPersonality?.id === personality.id ? null : personality
        );
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleProfessionalHelp = () => {
        navigate('/professional-help');
    };
    const handleAboutUs = () => {
        navigate('/about-us');
    };

    return (
        <div className="dark-theme">
            <header className="header">
                <nav className="nav">
                    <span className="nav-item" onClick={handleAboutUs}
                        style={{ cursor: 'pointer' }} >About Us</span>
                    <span className="nav-item" onClick={handleProfessionalHelp}
                        style={{ cursor: 'pointer' }} >Get Professional Help</span>
                    <div className="nav-right">
                        <span className="token-counter">Tokens: {tokens}</span>
                        <button className="nav-item logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
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
                        <p className="highlight-line">When real-world listeners aren't available or understanding, Rant AI is here for your unfiltered emotions.</p>
                    </div>
                </div>

                <div className="personality-section">
                    <div className="section-header">
                        <h2 className="section-title">Pick a Personality below, then click Chat!</h2>
                        <button 
                            className={`chat-button ${selectedPersonality ? 'active' : ''}`}
                            onClick={handleStartChatting}
                            disabled={!selectedPersonality || isCheckingTokens}
                        >
                            {isCheckingTokens ? 'Checking Tokens...' : 'Chat with AI'}
                        </button>
                    </div>
                    
                    <div className="personality-grid">
                        {personalities.map(personality => (
                            <div 
                                key={personality.id} 
                                className={`personality-card ${selectedPersonality?.id === personality.id ? 'selected' : ''}`}
                                onClick={() => handleCardClick(personality)}
                            >
                                <img 
                                    src={personality.image} 
                                    alt={personality.name} 
                                    className="personality-image" 
                                    loading="lazy" // Optimized image loading
                                />
                                <h3>{personality.name}</h3>
                                <div className="description-container">
                                    <p className="personality-description">{personality.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;