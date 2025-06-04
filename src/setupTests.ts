// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Firebase Auth
jest.mock('./services/firebase', () => ({
  auth: {},
  db: {}
}));

// Mock CometChat
jest.mock('@cometchat-pro/chat', () => ({
  CometChat: {
    init: jest.fn().mockResolvedValue(true),
    login: jest.fn().mockResolvedValue({ uid: 'test-user' }),
    logout: jest.fn().mockResolvedValue(true),
    createUser: jest.fn().mockResolvedValue({ uid: 'test-user' }),
    sendMessage: jest.fn().mockResolvedValue({ id: 'message-id' }),
    AppSettingsBuilder: jest.fn().mockImplementation(() => ({
      subscribePresenceForAllUsers: jest.fn().mockReturnThis(),
      setRegion: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnValue({})
    })),
    User: jest.fn().mockImplementation((uid) => ({
      uid,
      setName: jest.fn()
    })),
    TextMessage: jest.fn().mockImplementation((receiver, text, type) => ({
      receiver,
      text,
      type
    })),
    RECEIVER_TYPE: {
      USER: 'user'
    }
  }
}));