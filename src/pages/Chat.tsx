import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { moderateMessage } from '../services/moderation';
import { Send, UserPlus, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'coparent';
  timestamp: Date;
  senderName: string;
}

interface ModerationSuggestion {
  original: string;
  alternatives: string[];
}

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [coParentConnected, setCoParentConnected] = useState(false);
  const [moderationSuggestion, setModerationSuggestion] = useState<ModerationSuggestion | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Demo: Add some sample messages
  useEffect(() => {
    const sampleMessages: Message[] = [
      {
        id: '1',
        text: "Hi! I've set up our communication space. Looking forward to working together better.",
        sender: 'me',
        timestamp: new Date(Date.now() - 3600000),
        senderName: user?.displayName || 'You'
      }
    ];

    if (coParentConnected) {
      sampleMessages.push({
        id: '2',
        text: "Thanks for setting this up! This should help us stay organized.",
        sender: 'coparent',
        timestamp: new Date(Date.now() - 1800000),
        senderName: 'Co-Parent'
      });
    }

    setMessages(sampleMessages);
  }, [coParentConnected, user]);

  const handleSendMessage = async (messageText: string = newMessage) => {
    if (!messageText.trim()) return;

    setLoading(true);

    try {
      // Check message with AI moderation
      const moderationResults = await moderateMessage(messageText);

      if (moderationResults.length > 0) {
        // Message was flagged - show alternatives
        setModerationSuggestion({
          original: messageText,
          alternatives: moderationResults
        });
        setLoading(false);
        return;
      }

      // Message is acceptable - send it
      const message: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: 'me',
        timestamp: new Date(),
        senderName: user?.displayName || 'You'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setModerationSuggestion(null);

      // Simulate co-parent response (demo only)
      if (coParentConnected && Math.random() > 0.7) {
        setTimeout(() => {
          const responses = [
            "Got it, thanks for letting me know.",
            "Sounds good to me.",
            "I agree with that approach.",
            "Let me check my calendar and get back to you.",
            "That works for me."
          ];
          
          const response: Message = {
            id: (Date.now() + 1).toString(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: 'coparent',
            timestamp: new Date(),
            senderName: 'Co-Parent'
          };
          
          setMessages(prev => [...prev, response]);
        }, 2000 + Math.random() * 3000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAlternative = (alternative: string) => {
    handleSendMessage(alternative);
  };

  const handleDismissModeration = () => {
    setModerationSuggestion(null);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!coParentConnected) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="bg-yellow-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Clock className="h-12 w-12 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waiting for Co-Parent</h2>
          <p className="text-gray-600 mb-6">
            Your co-parent hasn't joined yet. Once they accept your invitation, 
            you'll be able to start messaging each other.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setCoParentConnected(true)} // Demo button
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <UserPlus className="h-4 w-4 inline mr-2" />
              Simulate Connection (Demo)
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Send Another Invitation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Co-Parent Chat</h1>
            <p className="text-sm text-gray-500">Connected and ready to communicate</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'me'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-primary-100' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Moderation Suggestions */}
      {moderationSuggestion && (
        <div className="bg-yellow-50 border-t border-yellow-200 p-4">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">
              Let's try a more positive approach
            </h3>
            <p className="text-xs text-yellow-700">
              Here are some alternative ways to express your message:
            </p>
          </div>
          <div className="space-y-2 mb-3">
            {moderationSuggestion.alternatives.map((alternative, index) => (
              <button
                key={index}
                onClick={() => handleSelectAlternative(alternative)}
                className="w-full text-left p-3 bg-white border border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors text-sm"
              >
                {alternative}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDismissModeration}
              className="text-xs text-yellow-700 hover:text-yellow-800 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-3"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;