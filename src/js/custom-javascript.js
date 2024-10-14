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
