// Importar las funciones necesarias desde los SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js"; // Asegúrate de incluir el SDK de analytics

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA44X-zFwuJdh1neBTI_Fh95ov2a9Q-g4A",
    authDomain: "rsvp-cumple.firebaseapp.com",
    projectId: "rsvp-cumple",
    storageBucket: "rsvp-cumple.appspot.com",
    messagingSenderId: "381184260037",
    appId: "1:381184260037:web:e79951978e0da43d54bdac",
    measurementId: "G-N53Q9E4S6E"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app); // Inicializar Google Analytics

// Exporta la referencia a Firestore
export { db };