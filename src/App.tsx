import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeCometChat } from './services/cometchat';
import { useAuth } from './hooks/useAuth';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import InviteCoParent from './pages/InviteCoParent';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Expenses from './pages/Expenses';

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Initialize CometChat on app start
    initializeCometChat().catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading LiaiZen...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/chat" replace /> : <Login />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? <Navigate to="/invite" replace /> : <Signup />
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/invite"
            element={
              <ProtectedRoute>
                <InviteCoParent />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/chat" replace />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="expenses" element={<Expenses />} />
          </Route>

          {/* Fallback Route */}
          <Route 
            path="*" 
            element={
              isAuthenticated ? <Navigate to="/chat" replace /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;