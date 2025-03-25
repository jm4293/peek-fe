import firebaseConfig from './constant/firebase';

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  await self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/asset/img/peek.png',
  });
});
