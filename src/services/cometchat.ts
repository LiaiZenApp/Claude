import { CometChat } from '@cometchat-pro/chat';

const appID = process.env.REACT_APP_COMETCHAT_APP_ID || '';
const region = process.env.REACT_APP_COMETCHAT_REGION || '';
const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY || '';

export const initializeCometChat = async (): Promise<boolean> => {
  try {
    const appSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    
    await CometChat.init(appID, appSettings);
    console.log('CometChat initialization completed successfully');
    return true;
  } catch (error) {
    console.error('CometChat initialization failed:', error);
    return false;
  }
};

export const loginUser = async (uid: string): Promise<CometChat.User | null> => {
  try {
    const user = await CometChat.login(uid, authKey);
    console.log('Login successful:', user);
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

export const createUser = async (uid: string, name: string): Promise<CometChat.User | null> => {
  try {
    const user = new CometChat.User(uid);
    user.setName(name);
    
    const createdUser = await CometChat.createUser(user, authKey);
    console.log('User created successfully:', createdUser);
    return createdUser;
  } catch (error) {
    console.error('User creation failed:', error);
    return null;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    await CometChat.logout();
    console.log('Logout completed successfully');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

export const sendMessage = async (receiverID: string, messageText: string): Promise<CometChat.TextMessage | null> => {
  try {
    const receiverType = CometChat.RECEIVER_TYPE.USER;
    const textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);
    
    const message = await CometChat.sendMessage(textMessage);
    console.log('Message sent successfully:', message);
    return message;
  } catch (error) {
    console.error('Message sending failed:', error);
    return null;
  }
};

export default CometChat;