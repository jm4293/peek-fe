import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from '@/constant/firebase';

console.log('firebase config firebaseConfig: ', firebaseConfig);

const app = initializeApp(firebaseConfig);

console.log('firebase config app: ', app);

const messaging = getMessaging(app);

const web_push_token = process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_TOKEN;

console.log('firebase config web_push_token: ', web_push_token);

export const requestForToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, { vapidKey: web_push_token });

    console.log('firebase config token: ', token);

    return token;
  } catch (error) {
    console.log('FCM Token Error: ', error);
    return null;
  }
};

// 포그라운드 알림 수신
export const onMessageListener = (messageListener: (payload: any) => void): (() => void) => {
  return onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    messageListener(payload);
  });
};

export default app;
