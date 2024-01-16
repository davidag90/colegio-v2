const listaDepartamentos = document.getElementById('lista-departamentos');
const contentBlocks = document.querySelectorAll('.content-departamento');

listaDepartamentos.addEventListener('change', (evt) => {
    let departamentoSelected = evt.target.value;

    contentBlocks.forEach( element => {
        if(element.id === departamentoSelected) {
            element.classList.remove('d-none');
            element.classList.add('d-block');
        } else {
            element.classList.add('d-none');
            element.classList.remove('d-block');
        }
    });
});