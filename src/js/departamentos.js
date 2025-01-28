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