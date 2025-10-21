'use client';

import { useEffect, useState } from 'react';
import { 
  retrieveLaunchParams, 
  swipeBehavior, 
  init as initSDK,
  type LaunchParams 
} from '@telegram-apps/sdk';

interface UserData {
  username?: string;
  id: number;
  firstName?: string;
  lastName?: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      // Initialize Telegram Mini App SDK
      initSDK();
      
      // Mount swipe behavior and disable vertical swipes (optional, makes the app feel more native)
      if (swipeBehavior.mount.isAvailable()) {
        swipeBehavior.mount();
        if (swipeBehavior.disableVertical.isAvailable()) {
          swipeBehavior.disableVertical();
        }
      }

      // Get launch params (contains user info)
      const launchParams: LaunchParams = retrieveLaunchParams();
      
      if (launchParams.tgWebAppData && launchParams.tgWebAppData.user) {
        const user = launchParams.tgWebAppData.user;
        setUserData({
          username: user.username,
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
        });
      } else {
        setError('Unable to get user data from Telegram');
      }
    } catch (err) {
      setError('This app must be opened inside Telegram');
      console.error('Telegram SDK initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const displayName = userData?.firstName || userData?.username || 'User';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-2">Error</h2>
          <p className="text-black">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-8">
      <div className="text-center mb-auto pt-8">
        <h1 className="text-3xl font-bold text-black mb-2">Hello, {displayName}</h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <p className="text-xl text-black mb-4">You have pushed the button this many times:</p>
        <p className="text-6xl font-bold text-black mb-8">{count}</p>
      </div>

      <div className="mb-8">
        <button
          onClick={incrementCount}
          className="w-16 h-16 rounded-full bg-black text-white text-3xl font-bold flex items-center justify-center hover:bg-gray-800 transition-colors"
          aria-label="Increment counter"
        >
          +
        </button>
      </div>
    </div>
  );
}
