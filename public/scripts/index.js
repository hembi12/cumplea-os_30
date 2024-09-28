// Importar la referencia a Firestore desde firebase.js
import { db } from './firebase.js'; // Asegúrate de la ruta correcta

// Fecha del evento actualizada a las 5 PM
var eventDate = new Date("Dec 8, 2024 17:00:00").getTime();

// Actualizar la cuenta regresiva cada segundo
var countdown = setInterval(function() {
    var now = new Date().getTime();
    var distance = eventDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Si la cuenta regresiva termina
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "¡El evento ya comenzó!";
    }
}, 1000);

// Funcionalidad del Botón Hamburguesa
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerButton = document.getElementById("hamburger-button");
    const menu = document.getElementById("menu");

    hamburgerButton.addEventListener("click", function() {
        menu.classList.toggle("active");
        // Alternar el icono de hamburguesa a 'X'
        const icon = hamburgerButton.querySelector("i");
        if (menu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", function(event) {
        if (!menu.contains(event.target) && !hamburgerButton.contains(event.target)) {
            menu.classList.remove("active");
            // Restaurar el icono de hamburguesa
            const icon = hamburgerButton.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
});