// js/contacto.js - Lógica de validación para el formulario de contacto

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');

    // Expresión regular para una validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mostrarError = (input, mensaje) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-text');
        
        errorDisplay.innerText = mensaje;
        input.classList.add('invalid'); // Añade clase para resaltar el campo
    };

    const quitarError = (input) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-text');

        errorDisplay.innerText = '';
        input.classList.remove('invalid'); // Quita la clase de resaltado
    };

    form.addEventListener('submit', (e) => {
        let esValido = true;

        // Quitar errores previos
        quitarError(nombreInput);
        quitarError(emailInput);
        quitarError(mensajeInput);

        // 1. Validar Nombre
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput, 'Por favor, ingresa tu nombre.');
            esValido = false;
        }

        // 2. Validar Email
        if (emailInput.value.trim() === '') {
            mostrarError(emailInput, 'Por favor, ingresa tu email.');
            esValido = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(emailInput, 'Por favor, ingresa un email válido.');
            esValido = false;
        }

        // 3. Validar Mensaje
        if (mensajeInput.value.trim() === '') {
            mostrarError(mensajeInput, 'Por favor, escribe un mensaje.');
            esValido = false;
        }

        // Si algo no es válido, prevenimos el envío del formulario
        if (!esValido) {
            e.preventDefault();
        } else {
            // Opcional: Mostrar un mensaje de "Enviando..." o similar
            // En este caso, simplemente dejamos que el formulario se envíe (acción mailto)
            console.log('Formulario válido, procediendo al envío.');
        }
    });
});