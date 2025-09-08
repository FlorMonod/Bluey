// js/galeria.js - Lógica para la galería con efecto lightbox

document.addEventListener('DOMContentLoaded', () => {
    // Convertimos NodeList a Array para usar indexOf
    const galeriaImagenes = Array.from(document.querySelectorAll('.galeria-item img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const cerrar = document.querySelector('.lightbox-cerrar');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let imagenActualIndex;

    const mostrarImagen = (index) => {
        if (index < 0 || index >= galeriaImagenes.length) {
            return; // No hace nada si el índice está fuera de los límites
        }
        const img = galeriaImagenes[index];
        // Usamos el atributo 'data-full' para obtener la URL de la imagen grande
        lightboxImg.src = img.dataset.full;
        imagenActualIndex = index;
    };

    galeriaImagenes.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.classList.add('activo');
            mostrarImagen(index);
        });
    });

    // Función para cerrar el lightbox
    const cerrarLightbox = () => {
        lightbox.classList.remove('activo');
        // Opcional: Limpiar el src para detener la carga si se cierra rápido
        lightboxImg.src = "";
    };

    // Cerrar al hacer clic en el botón 'X'
    cerrar.addEventListener('click', cerrarLightbox);

    // Navegación con flechas
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic se propague al fondo del lightbox
        const nuevoIndex = (imagenActualIndex - 1 + galeriaImagenes.length) % galeriaImagenes.length;
        mostrarImagen(nuevoIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic se propague al fondo del lightbox
        const nuevoIndex = (imagenActualIndex + 1) % galeriaImagenes.length;
        mostrarImagen(nuevoIndex);
    });

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            cerrarLightbox();
        }
    });
});