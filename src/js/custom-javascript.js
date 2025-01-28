/* Gets Splide library to generate a carousel on the homepage */
import Splide from "./assets/splide/js/splide.min.js";
import { Modal } from "./bootstrap.js";

new Splide(".splide", {
  perPage: 4,
  // Responsive breakpoints
  breakpoints: {
    1200: {
      perPage: 3,
    },
    992: {
      perPage: 2,
    },
    576: {
      perPage: 1,
    },
  },
  gap: "2rem",
}).mount();

// Custom look for "list-group" items in "Resoluciones FACO" page
let listElems = document.querySelectorAll("#lista-resoluciones > li");

listElems.forEach(function (elem) {
  elem.classList.add("list-group-item");
});

/* Checks for the existance of dropdown menus inside #main-menu,
selects the last one and assigns to it the class .dropdown-menu-end
in order to align the right end of the dropdown against the viewport
right limit */

const dropdownMenus = document.querySelectorAll("#main-menu > .dropdown > .dropdown-menu");
const lastDropdown = dropdownMenus.length - 1;

dropdownMenus[lastDropdown].classList.add("dropdown-menu-end");

window.addEventListener('load', (event) => {
  const docCookies = document.cookie;
  const docHref = document.location.href;
  const searchCookie = 'tipo_usuario';

  if(!docCookies.includes(searchCookie) && !docHref.includes(searchCookie)) {
    const modalTipoUsuario = new Modal(document.getElementById('tipo-usuario'), {
      'backdrop' : true,
      'keyboard' : false
    });
    
    modalTipoUsuario.show();
  }
})