import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GetProfessionalHelp.css';

const GetProfessionalHelp = () => {
    const navigate = useNavigate();

    return (
        <div className="help-page">
            <header className="help-header">
                <nav className="help-nav">
                    <span className="back-button" onClick={() => navigate('/')}>
                        Back to Login
                    </span>
                </nav>
            </header>

            <main className="help-main">
                <h1 className="help-title">
                    <span className="title-highlight">Professional</span>
                    <span className="title-sub">Help</span>
                </h1>

                <div className="help-box">
                    <p className="highlight">While RageAI offers emotional validation, it's important to recognize when professional support is needed.</p>

                    <p className="section-heading">When to Seek Professional Help:</p>
                    <ul>
                        <li>Persistent feelings of hopelessness or sadness lasting more than two weeks</li>
                        <li>Overwhelming anxiety that interferes with daily activities</li>
                        <li>Thoughts of harming yourself or others</li>
                        <li>Major changes in sleep, appetite, or energy levels</li>
                        <li>Difficulty performing routine tasks or maintaining relationships</li>
                        <li>Using substances to cope with emotions</li>
                        <li>Experiencing trauma or distressing events you can't process alone</li>
                        <li>When emotional distress significantly impacts your quality of life</li>
                    </ul>

                    <p className="section-heading">Global Crisis Resources:</p>
                    <ul>
                        <li>
                            <a
                                href="https://www.iasp.info/resources/Crisis_Centres/"
                                target="_blank"
                                rel="noreferrer"
                                className="help-link"
                            >
                                International Association for Suicide Prevention
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.befrienders.org/"
                                target="_blank"
                                rel="noreferrer"
                                className="help-link"
                            >
                                Befrienders Worldwide
                            </a>
                        </li>
                    </ul>

                    <p className="highlight">
                        Seeking help is a sign of strength, not weakness. Professional mental health support can provide tools and strategies for long-term well-being that complement the emotional release RageAI offers.
                    </p>

                    <p className="section-heading">
                        If you're in crisis, please contact emergency services or a crisis helpline immediately.
                    </p>

                    <button className="back-button" onClick={() => navigate('/')}>
                        Back to Login
                    </button>
                </div>
            </main>
        </div>
    );
};

export default GetProfessionalHelp;
