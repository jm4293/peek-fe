import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

Object.freeze(firebaseConfig);

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const web_push_token = process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_TOKEN;

onMessage(messaging, (payload) => {});

export const requestForToken = async () => {
  return await getToken(messaging, { vapidKey: web_push_token });
};

// 포그라운드 알림 수신
// export const onMessageListener = (messageListener: (payload: any) => void): (() => void) => {
//   if (!messaging) return () => {};
//
//   return onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     messageListener(payload);
//   });
// };

export default app;
