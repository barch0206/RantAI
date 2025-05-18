import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
    const navigate = useNavigate();

    const paragraphs = [
        "Hi there! I'm Sankalp Hegde, the creator behind Rage AI.",
        "I graduated from VIT (Vellore Institute of Technology) in 2024 and am currently work as a professional at Accenture. My passion lies in developing innovative projects that combine technology with human needs.",
        "Rage AI began as a personal self-help project — something I created just for fun to explore the emotional validation we all sometimes need. What started as a simple experiment evolved into this site when I realized others might benefit from a space where they could express themselves freely without judgment.",
        "I believe technology should serve our emotional wellbeing, not just our productivity. That's why Rage AI focuses on validating feelings rather than trying to \"fix\" them — sometimes we just need someone (or something) to understand.",
        "If you have questions, suggestions, or just want to chat about the project, please reach out through the Contact Us tab. I'm always open to feedback and new ideas to make Rage AI more helpful.",
        "Thanks for visiting, and I hope Rage AI provides the emotional outlet you're looking for!"
    ];

    return (
        <div className="about-page">
            <header className="about-header">
                <nav className="about-nav">
                    <span className="back-button" onClick={() => navigate('/')}>
                        Back to Login
                    </span>
                </nav>
            </header>

            <main className="about-main">
                <h1 className="about-title">
                    <span className="title-highlight">About</span>
                    <span className="title-sub">Us</span>
                </h1>

                <div className="about-box">
                    {paragraphs.map((text, index) => (
                        <p
                            key={index}
                            className={index % 2 === 0 ? 'pink-text' : 'blue-text'}
                        >
                            {text}
                        </p>
                    ))}

                    <button className="back-button" onClick={() => navigate('/')}>
                        Back to Login
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;
