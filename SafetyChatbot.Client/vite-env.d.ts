/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_FIREBASE_VAPID_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
