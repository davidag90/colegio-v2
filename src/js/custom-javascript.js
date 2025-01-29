/* Gets Splide library to generate a carousel on the homepage */
import Splide from "@splidejs/splide";
import { Modal } from "./bootstrap.js";

const splideCheck = document.querySelector('.splide');
const bodyElement = document.querySelector('body');


/* -----------------------------------------------------------------
Checks for the existance of dropdown menus inside #main-menu,
selects the last one and assigns to it the class .dropdown-menu-end
in order to align the right end of the dropdown against the viewport
right limit
----------------------------------------------------------------- */

const dropdownMenus = document.querySelectorAll("#main-menu > .dropdown > .dropdown-menu");
const lastDropdown = dropdownMenus.length - 1;

dropdownMenus[lastDropdown].classList.add("dropdown-menu-end");


/* ----------------------------------
Pacientes/Profesionales modal
---------------------------------- */
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


/* ---------------------
SplideJS implementation
--------------------- */
if(splideCheck) {
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
}

// Custom look for "list-group" items in "Resoluciones FACO" page
let listElems = document.querySelectorAll("#lista-resoluciones > li");

listElems.forEach(function (elem) {
  elem.classList.add("list-group-item");
});


/* -------------------------
Delegados Departamentales
--------------------------*/
if(bodyElement.classList.contains('delegados-departamentales')) {
  const listaDepartamentos = document.getElementById('lista-departamentos');
  const contentBlocks = document.querySelectorAll('.content-departamento');
  const deptosMapa = document.querySelectorAll('.svg-map-wrapper > svg path');
  const deptosVacios = ['rio-seco', 'sobremonte', 'pocho', 'minas'];
  
  const deptosMapaFilter = Array.from(deptosMapa).filter(elemento => {
      const idElemento = elemento.getAttribute('id');
      return ! deptosVacios.includes(idElemento);
  });
  
  function initDeptos() {
      let deptoInit = listaDepartamentos.value;
  
      contentBlocks.forEach(element => {
          if(element.id === deptoInit) {
              element.classList.remove('d-none');
              element.classList.add('d-block');
          } else {
              element.classList.add('d-none');
              element.classList.remove('d-block');
          }
      });
  
      deptosMapa.forEach(element => {
          if(element.id === deptoInit) {
              element.classList.add('selected');
              element.classList.remove('not-selected');
          } else {
              element.classList.add('not-selected');
              element.classList.remove('selected');
          }
      });
  }
  
  initDeptos();
  
  listaDepartamentos.addEventListener('change', (evt) => {
      let deptoSelecc = evt.target.value;
  
      contentBlocks.forEach(element => {
          if(element.id === deptoSelecc) {
              element.classList.remove('d-none');
              element.classList.add('d-block');
          } else {
              element.classList.add('d-none');
              element.classList.remove('d-block');
          }
      });
  
      deptosMapa.forEach(element => {
          if(element.id === deptoSelecc) {
              element.classList.add('selected');
              element.classList.remove('not-selected');
          } else {
              element.classList.add('not-selected');
              element.classList.remove('selected');
          }
      });
  });
  
  deptosMapaFilter.forEach(element => {
      element.addEventListener('click', (evt) => {
          const opcionesLista = document.querySelectorAll('#lista-departamentos > option');
          let deptoSelecc = evt.target.getAttribute('id');
          console.log(deptoSelecc);
  
          opcionesLista.forEach(element => {
              if(element.value === deptoSelecc) {
                  element.setAttribute('selected', true);
              } else {
                  element.removeAttribute('selected');
              }
          });
  
          deptosMapa.forEach(mapElement => {
              mapElement.classList.remove('selected');
              mapElement.classList.add('not-selected');
          });
  
          evt.target.classList.add('selected');
          evt.target.classList.remove('not-selected');
  
          contentBlocks.forEach(element => {
              if(element.id === deptoSelecc) {
                  element.classList.remove('d-none');
                  element.classList.add('d-block');
              } else {
                  element.classList.add('d-none');
                  element.classList.remove('d-block');
              }
          });
      });
  });
  
  deptosVacios.forEach(element =>{
      let deptoVacio = document.getElementById(element);
      
      deptoVacio.classList.add('forbidden');
  });
}


/* --------------------------
Convenios y Beneficios
-------------------------- */
if(bodyElement.classList.contains('convenios-beneficios')) {
  const botonesFiltro = document.querySelectorAll('.boton-filtro');
  
  botonesFiltro.forEach( function(boton) {
    boton.addEventListener('click', function() {
          botonesFiltro.forEach( function(elem) {
              elem.classList.remove('active')
          });
      
          boton.classList.add('active');
  
          let rubroFiltro = boton.getAttribute('colodont-rubro');
          let convenios = document.querySelectorAll('.convenio');
  
          if(rubroFiltro === 'todos') {
              convenios.forEach( function(convenio) {
                  convenio.classList.remove('d-none');
              });
          } else {
              convenios.forEach( function(convenio) {
                  convenio.classList.add('d-none');
              });
      
              let conveniosRubro = document.querySelectorAll('.' + rubroFiltro);
      
              conveniosRubro.forEach( function(convenio) {
                  convenio.classList.remove('d-none');
              });
          }
      });
  });
}