// Importar la referencia a Firestore desde firebase.js
import { db } from './firebase.js'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const form = document.querySelector('.formulario-confirmacion');
    const camposAsistire = document.getElementById('camposAsistire');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    const radiosAsistencia = document.getElementsByName('asistencia');
    const formularioHeader = document.getElementById('formularioHeader'); // Referencia al encabezado del formulario

    // Función para mostrar u ocultar campos adicionales basados en la selección de asistencia
    const toggleCamposAsistire = () => {
        const asistenciaSeleccionada = Array.from(radiosAsistencia).find(radio => radio.checked);
        if (asistenciaSeleccionada && asistenciaSeleccionada.value === 'si') {
            camposAsistire.style.display = 'block';
        } else {
            camposAsistire.style.display = 'none';
            document.getElementById('numeroInvitados').value = ''; // Limpiar campo si no se muestra
        }
    };

    // Agregar eventos a los radios de asistencia
    radiosAsistencia.forEach(radio => {
        radio.addEventListener('change', toggleCamposAsistire);
    });

    // Inicializar el estado de los campos adicionales al cargar la página
    toggleCamposAsistire();

    // Manejar el envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Remover clases de validación previas
        form.classList.remove('was-validated');

        // Validar el formulario usando las validaciones de Bootstrap
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Recopilar datos del formulario
        const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correoElectronico = document.getElementById('correoElectronico').value.trim() || null;
        const asistencia = Array.from(radiosAsistencia).find(radio => radio.checked).value;
        const numeroInvitados = document.getElementById('numeroInvitados').value ? parseInt(document.getElementById('numeroInvitados').value) : 0;
        const mensajeAdicional = document.getElementById('mensajeAdicional').value.trim() || null;

        // Validación adicional: Validar el formato del correo electrónico si está presente
        if (correoElectronico && !validateEmail(correoElectronico)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        try {
            // Agregar documento a Firestore
            await addDoc(collection(db, "confirmaciones"), {
                nombre_completo: nombreCompleto,
                telefono: telefono,
                correo_electronico: correoElectronico,
                asistencia: asistencia,
                numero_invitados: numeroInvitados,
                mensaje_adicional: mensajeAdicional,
                fecha_registro: serverTimestamp()
            });

            // Mostrar mensaje de confirmación y ocultar el formulario
            form.style.display = 'none';
            mensajeConfirmacion.style.display = 'block';

            // Ocultar el encabezado del formulario
            formularioHeader.style.display = 'none';

            // Opcional: Reiniciar las validaciones de Bootstrap y limpiar el formulario
            form.classList.remove('was-validated');
            form.reset();
            camposAsistire.style.display = 'none';
        } catch (error) {
            console.error("Error al agregar documento: ", error);
            alert("Hubo un error al enviar tu confirmación. Por favor, intenta de nuevo.");
        }

        // Añadir clase de validación de Bootstrap
        form.classList.add('was-validated');
    });

    // Función para validar el formato del correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Mostrar mensaje de confirmación si la URL contiene #mensajeConfirmacion
    if (window.location.hash === '#mensajeConfirmacion') {
        form.style.display = 'none';
        mensajeConfirmacion.style.display = 'block';
    }
});