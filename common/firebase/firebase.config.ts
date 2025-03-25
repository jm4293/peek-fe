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

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const web_push_token = process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_TOKEN;

export const requestForToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, { vapidKey: web_push_token });

    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('FCM Token Error:', error);
    return null;
  }
};

// 포그라운드 알림 수신
// export const onMessageListener = (messageListener: (payload: any) => void): (() => void) => {
//   return onMessage(messaging, (payload) => {
//     messageListener(payload);
//   });
// };

export default app;
