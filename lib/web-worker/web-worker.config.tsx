// 'use client';
//
// import { useEffect } from 'react';
// import { requestForToken } from '@/common/firebase';
//
// interface Props {
//   children: React.ReactNode;
// }
//
// export default function WebWorkerConfig(props: Props) {
//   const { children } = props;
//
//   useEffect(() => {
//     if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//       if ('serviceWorker' in navigator) {
//         navigator.serviceWorker
//           .register('/firebase-messaging-sw.js')
//           .then(async (registration) => {
//             const token = await requestForToken();
//
//             console.log('Token:', token);
//
//             console.info('Service Worker registered with scope:', registration.scope);
//
//             navigator.serviceWorker.addEventListener('message', (event) => {
//               // if (event.data && event.data.type === 'FCM_TOKEN') {
//               //   const token = event.data.token;
//               //   localStorage.setItem('firebaseToken', token);
//               //   console.log('FCM Token:', token);
//               // }
//
//               if (event.data && event.data.type === 'FCM_MESSAGE') {
//                 const { title, body } = event.data.payload.notification;
//                 alert(`Title: ${title}\nBody: ${body}`);
//               }
//
//               if (event.data && event.data.type === 'TERMINATED') {
//                 console.info('Service worker has been terminated.');
//               }
//             });
//           })
//           .catch((error) => {
//             console.error('Service Worker registration failed:', error);
//           });
//       } else {
//         console.warn('This browser does not support the required APIs for Firebase Messaging.');
//       }
//     }
//   }, []);
//
//   return <div>{children}</div>;
// }
