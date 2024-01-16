import Splide from './assets/splide/js/splide.min.js';

// Add your custom JS here.
new Splide( '.splide', {
    perPage: 4,
    breakpoints: {
        1200: {
            perPage: 3
        },
        992: {
            perPage: 2
        },
        576: {
            perPage: 1
        }
    },
    gap: '2rem'
} ).mount();

// Lookeo de elementos de lista hijos de "list-group" en Resoluciones FACO
let listElems = document.querySelectorAll('#lista-resoluciones > li');

listElems.forEach(function(elem) {
    elem.classList.add('list-group-item');
});

// Snippet para capturar último dropdown a la derecha y asegurar alineación
// correcta que no se salga de la pantalla (clase .dropdown-menu-end)
const dropdownMenus = document.querySelectorAll('#main-menu > .dropdown > .dropdown-menu');
const lastDropdown = dropdownMenus.length - 1;

dropdownMenus[lastDropdown].classList.add('dropdown-menu-end');