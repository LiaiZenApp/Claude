// Mock CometChat service for demo purposes
// This allows the app to run without the actual CometChat dependency

const mockCometChat = {
  init: () => Promise.resolve(true),
  login: () => Promise.resolve({ uid: 'demo-user' }),
  logout: () => Promise.resolve(true),
  createUser: () => Promise.resolve({ uid: 'demo-user' }),
  sendMessage: () => Promise.resolve({ id: 'demo-message' }),
  AppSettingsBuilder: function() {
    return {
      subscribePresenceForAllUsers: () => this,
      setRegion: () => this,
      build: () => ({})
    };
  },
  User: function(uid: string) {
    this.uid = uid;
    this.setName = () => {};
    return this;
  },
  TextMessage: function(receiver: string, text: string, type: string) {
    this.receiver = receiver;
    this.text = text;
    this.type = type;
    return this;
  },
  RECEIVER_TYPE: {
    USER: 'user'
  }
};

const appID = process.env.REACT_APP_COMETCHAT_APP_ID || '';
const region = process.env.REACT_APP_COMETCHAT_REGION || '';
const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY || '';

export const initializeCometChat = async (): Promise<boolean> => {
  try {
    console.log('Demo mode: CometChat initialization simulated');
    return true;
  } catch (error) {
    console.error('CometChat initialization failed:', error);
    return false;
  }
};

export const loginUser = async (uid: string): Promise<any> => {
  try {
    console.log('Demo mode: Login simulated for user:', uid);
    return { uid, name: 'Demo User' };
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

export const createUser = async (uid: string, name: string): Promise<any> => {
  try {
    console.log('Demo mode: User creation simulated:', { uid, name });
    return { uid, name };
  } catch (error) {
    console.error('User creation failed:', error);
    return null;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    console.log('Demo mode: Logout simulated');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

export const sendMessage = async (receiverID: string, messageText: string): Promise<any> => {
  try {
    console.log('Demo mode: Message sent simulated:', { receiverID, messageText });
    return {
      id: Date.now().toString(),
      text: messageText,
      receiver: receiverID
    };
  } catch (error) {
    console.error('Message sending failed:', error);
    return null;
  }
};

export default mockCometChat;