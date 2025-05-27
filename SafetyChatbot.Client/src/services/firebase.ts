import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, MessagePayload } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFirebaseToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
        });

        if (token) {
            await fetch("/api/push/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token })
            });
        }
    } catch (err) {
        console.error("Can't get FCM token:", err);
    }
};

export { messaging };