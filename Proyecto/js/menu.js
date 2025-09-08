// js/menu.js - Lógica para el menú hamburguesa

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('open');
    });

    // Cierra el menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('open');
        }
    });
});
