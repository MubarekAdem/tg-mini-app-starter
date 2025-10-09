'use client';

import { useEffect, useState } from 'react';
import { initData, initSwipeBehavior, init as initSDK } from '@telegram-apps/sdk';

interface UserData {
  username?: string;
  id: number;
  firstName?: string;
  lastName?: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dateJoined, setDateJoined] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Initialize Telegram Mini App SDK
      initSDK();
      
      // Initialize swipe behavior (optional, makes the app feel more native)
      const [swipeBehavior] = initSwipeBehavior();
      swipeBehavior.disableVerticalSwipe();

      // Get init data (contains user info)
      const [initDataResult] = initData();
      
      if (initDataResult && initDataResult.user) {
        const user = initDataResult.user;
        setUserData({
          username: user.username,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        // Check localStorage for date joined
        const storedDate = localStorage.getItem('telegram_mini_app_date_joined');
        if (storedDate) {
          setDateJoined(storedDate);
        } else {
          // First time user - store current date
          const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          localStorage.setItem('telegram_mini_app_date_joined', currentDate);
          setDateJoined(currentDate);
        }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <span className="text-4xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome!</h1>
          <p className="text-gray-500 dark:text-gray-400">Your Telegram Profile</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Username</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">
              {userData?.username ? `@${userData.username}` : 'No username'}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Telegram ID</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white font-mono">
              {userData?.id}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date Joined</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">
              {dateJoined}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
