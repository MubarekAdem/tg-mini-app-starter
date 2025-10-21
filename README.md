# Telegram Mini App Starter

A simple Telegram Mini App built with Next.js that displays user information from Telegram Authentication, including:
- **Username** - The user's Telegram username
- **Telegram ID** - The user's unique Telegram ID  
- **Date Joined** - The date when the user first opened the mini app (stored in localStorage)

## Features

✨ **Telegram Authentication** - Automatically authenticates users through Telegram Mini Apps SDK  
💾 **Persistent Storage** - Tracks first join date using browser localStorage (no backend required)  
🎨 **Beautiful UI** - Modern gradient design with dark mode support  
📱 **Mobile Optimized** - Native-feeling experience in Telegram

<img width="200" height="650" alt="image" src="https://github.com/user-attachments/assets/e318192d-2bd7-4961-8b34-ca7cbe691927" />



## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Set Up Telegram Bot

1. Create a bot using [@BotFather](https://t.me/botfather) on Telegram
2. Get your bot token
3. Use [@BotFather](https://t.me/botfather) to set up a Mini App:
   - Send `/newapp` to BotFather
   - Select your bot
   - Provide app title, description, and photo
   - Set the Web App URL to your deployment URL (or use a tunnel like ngrok for local testing)

### 4. Deploy Your App

Deploy to Vercel, Netlify, or any hosting platform that supports Next.js:

**Vercel (Recommended):**
```bash
npm run build
```

Then deploy using the [Vercel Platform](https://vercel.com/new).

**Or use Vercel CLI:**
```bash
npm i -g vercel
vercel
```

### 5. Update Bot Settings

Once deployed, update your bot's Mini App URL in BotFather with your production URL.

## Testing Locally

To test locally, you'll need to expose your local server to the internet:

1. Install ngrok: `npm install -g ngrok`
2. Run your dev server: `npm run dev`
3. In another terminal: `ngrok http 3000`
4. Use the ngrok HTTPS URL in BotFather for your Mini App

## How It Works

- The app uses the [@telegram-apps/sdk](https://www.npmjs.com/package/@telegram-apps/sdk) to authenticate users
- When a user opens the mini app, their Telegram data (username, ID) is automatically retrieved
- The first time a user opens the app, the current date is saved to localStorage
- On subsequent visits, the original join date is displayed

## Project Structure

```
src/
  app/
    page.tsx        # Main app component with Telegram auth logic
    layout.tsx      # Root layout
    globals.css     # Global styles
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Telegram Mini Apps SDK** - Authentication

## Learn More

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Next.js Documentation](https://nextjs.org/docs)
- [@telegram-apps/sdk](https://docs.telegram-mini-apps.com/)
