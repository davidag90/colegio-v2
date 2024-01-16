let botonesFiltro = document.querySelectorAll('.boton-filtro');

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