// Seleccionar el botón de menú y el menú popup
const menuButton = document.querySelector('.menu__button');
const popupMenu = document.querySelector('.popup__menu');

// Evento para mostrar el menú popup al hacer clic en el botón
menuButton.addEventListener('click', () => {
    popupMenu.style.display = 'flex';
});

// Cerrar el menú popup al hacer clic fuera del menú o en un enlace
popupMenu.addEventListener('click', (e) => {
    if (e.target === popupMenu || e.target.tagName === 'A') {
        popupMenu.style.display = 'none';
    }
});

