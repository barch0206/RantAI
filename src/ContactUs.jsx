import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-page">
            <header className="contact-header">
                <nav className="contact-nav">
                    <span className="back-button" onClick={() => navigate('/')}>
                        Back to Login
                    </span>
                </nav>
            </header>

            <main className="contact-main">
                <h1 className="contact-title">
                    <span className="title-highlight">Contact</span>
                    <span className="title-sub">Us</span>
                </h1>

                <div className="contact-box">
                    <p className="intro-text">
                        Have questions, feedback, or suggestions about Rage AI? I'd love to hear from you!
                    </p>

                    <h2 className="section-title">Get in Touch</h2>
                    <ul className="contact-list">
                        <li><strong>Name:</strong> Sankalp Hegde</li>
                        <li><strong>Email:</strong> <a href="mailto:sankalph1234@gmail.com">sankalph1234@gmail.com</a></li>
                        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sankalp-hegde-48895123a" target="_blank" rel="noopener noreferrer">Sankalp Hegde</a></li>
                    </ul>

                    <h2 className="section-title">When to Contact</h2>
                    <ul className="bullet-list">
                        <li>Technical issues or bugs you encounter on the site</li>
                        <li>Feature suggestions for new personalities or functionality</li>
                        <li>Partnership or collaboration opportunities</li>
                        <li>Media inquiries or interview requests</li>
                        <li>General feedback about your experience with Rage AI</li>
                    </ul>

                    <h2 className="section-title">Response Time</h2>
                    <p className="response-text">
                        I strive to respond to all inquiries within 48 hours during weekdays. Please note that as Rage AI is a personal project alongside my work at Accenture, response times may vary.
                    </p>

                    <p className="closing-text">
                        Your thoughts and feedback are valuable in helping improve Rage AI and making it a better emotional outlet for everyone.<br />
                        Thank you for your interest in Rage AI!
                    </p>

                    <button className="back-button" onClick={() => navigate('/')}>
                        Back to Login
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;
