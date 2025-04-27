// src/App.js
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/personality/:id" element={<ChatPage />} />
            </Routes>
        </Router>
  );
}

export default App;
