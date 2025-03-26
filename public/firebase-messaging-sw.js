importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/10.0.0/firebase-app-compat.min.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/10.0.0/firebase-messaging-compat.min.js');
importScripts('/firebase-env.js');

const firebaseConfig = {
  apiKey: self.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: self.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: self.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: self.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: self.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: self.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: self.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'REQUEST_FCM_TOKEN') {
//     messaging
//       .getToken({ vapidKey: 'YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR' })
//       .then((currentToken) => {
//         if (currentToken) {
//           // 요청한 클라이언트에게만 토큰 전달
//           event.source.postMessage({
//             type: 'FCM_TOKEN',
//             token: currentToken,
//           });
//         } else {
//           console.log('No registration token available. Request permission to generate one.');
//         }
//       })
//       .catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//       });
//   }
// });

messaging.onBackgroundMessage(async (payload) => {
  await self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/peek.png',
  });

  // 클라이언트로 메시지 전달
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'FCM_MESSAGE',
        payload: payload,
      });
    });
  });
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TERMINATE') {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => client.postMessage({ type: 'TERMINATED' }));
    });

    self
      .deleteToken(event.data.token)
      .then(() => {
        console.log('Token deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting token:', error);
      });

    self.registration.unregister();
  }
});
