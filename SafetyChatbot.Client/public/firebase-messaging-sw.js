importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyB2S_JpKwi2ysCAudFw6QRwZd3cA0yMkaE",
    authDomain: "safety-regulations-chatbot.firebaseapp.com",
    projectId: "safety-regulations-chatbot",
    storageBucket: "safety-regulations-chatbot.firebasestorage.app",
    messagingSenderId: "1086551813013",
    appId: "1:1086551813013:web:58077c9538431d33ce649c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("I GO TIT", payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/logoDarkSquare.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clients) {
        for (const client of clients) {
            client.postMessage({
                type: 'INCIDENT_STATUS_UPDATED',
                payload: payload.data
            });
        }
    });
});
