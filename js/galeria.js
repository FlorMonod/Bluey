// js/galeria.js - Lógica para la galería con efecto lightbox

document.addEventListener('DOMContentLoaded', () => {
    // Convertimos NodeList a Array para usar indexOf
    const galeriaImagenes = Array.from(document.querySelectorAll('.galeria-item img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const cerrar = document.querySelector('.lightbox-cerrar');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const zoomInBtn = document.querySelector('.lightbox-zoom-in');
    const zoomOutBtn = document.querySelector('.lightbox-zoom-out');

    let imagenActualIndex;

    const mostrarImagen = (index) => {
        if (index < 0 || index >= galeriaImagenes.length) {
            return; // No hace nada si el índice está fuera de los límites
        }
        const img = galeriaImagenes[index];
        // Usamos el atributo 'data-full' para obtener la URL de la imagen grande
        lightboxImg.src = img.dataset.full;
        lightboxImg.classList.remove('zoomed'); // Resetea el zoom al cambiar de imagen
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
        lightboxImg.classList.remove('zoomed'); // Resetea el zoom al cerrar
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

    // --- LÓGICA DE ZOOM ---
    zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.classList.add('zoomed');
    });

    zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.classList.remove('zoomed');
    });

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        // Si la imagen está con zoom, el clic en el fondo la achica
        if (lightboxImg.classList.contains('zoomed')) {
            lightboxImg.classList.remove('zoomed');
            return; // Evita que se cierre el lightbox inmediatamente
        }
        if (e.target === lightbox) {
            cerrarLightbox();
        }
    });

    // Clic en la imagen para quitar zoom
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        if (lightboxImg.classList.contains('zoomed')) {
            lightboxImg.classList.remove('zoomed');
        }
    });

    // Manejo del teclado: Escape para cerrar, flechas para navegar
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('activo')) {
            if (e.key === 'Escape') {
                // Si la imagen tiene zoom, primero quita el zoom. Si no, cierra.
                if (lightboxImg.classList.contains('zoomed')) {
                    lightboxImg.classList.remove('zoomed');
                } else {
                    cerrarLightbox();
                }
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click(); // Simulamos un clic en el botón "anterior"
            } else if (e.key === 'ArrowRight') {
                nextBtn.click(); // Simulamos un clic en el botón "siguiente"
            }
        }
    });
});