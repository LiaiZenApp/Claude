# LiaiZen - Co-Parenting Made Simple

LiaiZen is a Progressive Web App (PWA) designed to help co-parents communicate effectively and manage shared responsibilities. Built with React, TypeScript, and Tailwind CSS, it provides a platform for constructive communication with built-in AI moderation.

## Features

- 🔐 **Secure Authentication** - Firebase Authentication with email/password
- 💬 **Real-time Chat** - CometChat integration for instant messaging
- 🤖 **AI Moderation** - Automatic message moderation with positive alternatives
- 📱 **Progressive Web App** - Works offline and installable on mobile devices
- 📅 **Shared Calendar** - (Coming Soon) Coordinate schedules and custody arrangements
- 💰 **Expense Tracking** - (Coming Soon) Manage shared child-related expenses
- 🎨 **Responsive Design** - Mobile-first design that works on all devices

## Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Firebase project
- CometChat account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LiaiZenApp/Claude.git
cd Claude
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your Firebase and CometChat credentials

5. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # External service integrations
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## Setup Instructions

1. **Firebase Setup:**
   - Create a new Firebase project
   - Enable Authentication with Email/Password
   - Create a Firestore database
   - Copy configuration to `.env`

2. **CometChat Setup:**
   - Sign up at CometChat
   - Create a new app
   - Copy App ID, Region, and Auth Key to `.env`

3. **Start Development:**
   ```bash
   npm install
   cp .env.example .env
   # Configure .env with your credentials
   npm start
   ```

## License

This project is licensed under the MIT License.