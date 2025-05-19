import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from './firebase'; 
import LoginImg from './assets/LoginImg2.png';
import './Login.css';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            // await signInWithPopup(auth, provider);
            // navigate('/home');
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const existingDoc = await getDoc(userDocRef);

            if (!existingDoc.exists()) {
            // Create new user doc
            await setDoc(userDocRef, {
                name: user.displayName || "",
                email: user.email || "",
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                tokensCount: 25
            });
            } else {
            // Update last login timestamp
            await updateDoc(userDocRef, {
                lastLogin: serverTimestamp()
            });
            }
            navigate('/home');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleProfessionalHelp = () => {
        navigate('/professional-help');
    };
    
    const handleAboutUs = () => {
        navigate('/about-us');
    };
    const handleContactUs = () => {
        navigate('/contact-us');
    };
    const handleVoid = () => {
        navigate('/void');
    };

    return (
        <div className="dark-theme">
            <header className="header">
                <nav className="nav">
                    <span className="nav-item" onClick={handleAboutUs}
                        style={{ cursor: 'pointer' }} >About Us</span>
                    <span className="nav-item" onClick={handleProfessionalHelp}
                        style={{ cursor: 'pointer' }} >Get Professional Help</span>
                    <span className="nav-item" onClick={handleContactUs} style={{cursor:'pointer'}}>Contact Us</span>
                    <span className="nav-item void" onClick={handleVoid} style={{cursor:'pointer'}}>The Void</span>
                </nav>
            </header>
            <main className="main-content">
                <div className="image-section">
                    <div className="image-container">
                        <img
                            src={LoginImg}
                            alt="Therapy Visual"
                            className="therapist-image"
                        />
                    </div>
                </div>

                <div className="brand-section">
                    <div className="title-container">
                        <h1 className="ventai-title">
                            <span className="title-rage">RAGE</span>
                            <span className="title-ai">AI</span>
                        </h1>
                        <div className="button-wrapper">
                            <button className="chat-button active" onClick={handleLogin}>
                                Login with Google
                            </button>
                        </div>
                    </div>
                    <div className="description-box">
                        <h1 style={{ color: '#ff85c1' }}>What We Offer:</h1>
                        <p className="privacy-line"><strong>Feel Better Your Way</strong></p>
                        <p className="highlight-line">
                            Rage AI gives you emotional support personalities that match your mood. Need to vent your frustrations? We're here for you. Choose from a wide range of personalities to express anger, sadness, anxiety, despair, financial stress, and more.
                        </p>
                        <p className="privacy-line">
                            Our AI therapy companions understand your emotions and mental health needs. They respond how you need them to. Each personality offers a unique emotional connection.
                            You'll find the perfect match for your feelings.
                        </p>
                        <p className="highlight-line">
                            We don't judge your feelings. We validate your experiences and frustrations. We keep your conversations private and confidential.
                            We offer advice for coping only if you ask for it.
                        </p>
                        <p className="privacy-line">
                            Login to start chatting for free. No credit card required. We value your privacy and security.
                        </p>
                        <p className="highlight-line">Feeling angry or stressed? Chat with Raging Ray who swears with you. Need quiet support during anxiety? Silent Sage just listens. Explore Emo Luna, Exhausted Ethan and more personality cards!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;