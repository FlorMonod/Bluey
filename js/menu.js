// js/menu.js - Lógica para el menú hamburguesa y el menú desplegable

document.addEventListener('DOMContentLoaded', function() {
    // Lógica para el menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('open');
    });

    // Lógica para el menú desplegable de Temporadas
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropbtn) {
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault(); // Previene la navegación si el href no es javascript:void(0)
            dropdownContent.classList.toggle('show');
        });
    }

    // Cierra todos los menús al hacer clic fuera
    document.addEventListener('click', function(e) {
        // Cierre del menú hamburguesa
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('open');
        }

        // Cierre del menú desplegable
        if (dropdownContent && !e.target.matches('.dropbtn, .dropbtn *')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});
