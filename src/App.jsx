import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './ProtectedRoute';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>} />
                <Route path="/personality/:id" element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
