import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import firebaseConfig from '@/constant/firebase';

console.log('firebaseConfig', firebaseConfig);

const app = initializeApp(firebaseConfig);

console.log('app', app);

let messaging: Messaging;

if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
  console.log('messaging', messaging);
}

const web_push_token = process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_TOKEN;

console.log('web_push_token', web_push_token);

export const requestForToken = async () => {
  if (!messaging) return;

  const token = await getToken(messaging, { vapidKey: web_push_token });
  console.log('token', token);

  localStorage.setItem('firebaseToken', token);
  return token;
};

// 포그라운드 알림 수신
export const onMessageListener = (messageListener: (payload: any) => void): (() => void) => {
  if (!messaging) return () => {};

  return onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    messageListener(payload);
  });
};

export default app;
