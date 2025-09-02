'use client';

import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const web_push_token = process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_TOKEN;

Object.freeze(firebaseConfig);

const app = initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

export const requestForToken = async () => {
  if (!messaging) {
    messaging = getMessaging(app);
  }

  return await getToken(messaging, { vapidKey: web_push_token });
};

export default app;
