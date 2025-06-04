import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Copy, CheckCircle } from 'lucide-react';

const InviteCoParent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Generate a simple invite code (in production, this would be generated server-side)
  const inviteCode = `LIAI-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  const handleEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate sending email invitation
      // In production, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setInviteSent(true);
    } catch (error) {
      console.error('Failed to send invite:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSkip = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-secondary-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Invite Your Co-Parent</h1>
            <p className="text-gray-600 mt-2">Connect with your co-parent to start communicating better</p>
          </div>

          {!inviteSent ? (
            <>
              {/* Email Invitation */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary-500" />
                  Send Email Invitation
                </h2>
                <form onSubmit={handleEmailInvite} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Co-Parent's Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="coparent@email.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Sending Invitation...' : 'Send Invitation'}
                  </button>
                </form>
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Share Invite Code */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Share Invite Code</h2>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Your invite code:</p>
                      <p className="text-lg font-mono font-bold text-gray-900">{inviteCode}</p>
                    </div>
                    <button
                      onClick={copyInviteCode}
                      className="flex items-center space-x-2 bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-700">
                        {copied ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Share this code with your co-parent so they can connect with you
                </p>
              </div>
            </>
          ) : (
            <div className="text-center mb-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-green-900 mb-2">Invitation Sent!</h2>
                <p className="text-green-700">
                  We've sent an invitation to <strong>{email}</strong>. 
                  They'll receive an email with instructions to join LiaiZen.
                </p>
              </div>
            </div>
          )}

          {/* Skip Button */}
          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              Skip for now - I'll invite them later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCoParent;