var DateTime = luxon.DateTime;

async function getData(url) {
    try {
        const data = await fetch(url);
        const result = await data.json();

        return result;
    } catch(error) {
        console.log(error);
    }
}

async function filterData() {
    const profesionales = document.getElementById('profesionales');
    profesionales.innerHTML = '';

    const data = await getData('https://indexweb.com.ar/matriculas/urgencias.ashx?Todos=Todos');
    
    const formattedData = data.map(element => {
        const objDia = DateTime.fromFormat(element.Dia.substr(0,10),'dd/LL/yyyy').toFormat('dd/LL/yyyy');

        return {
            ...element,
            Dia: objDia
        }
    });
    
    /* ---- SEGMENTO PREPARADO PARA FUTURA FUNCIONALIDAD ----- */
    /* ---- Potencial agregado de filtro por ciudad      ----- */
    /* ---- Reorganiza el JSON con un objeto por Ciudad  ----- */
    /* ---- y los profesionales de cada ciudad dentro de el --

    const arrCiudades = formattedData.reduce( (acc, objeto) => {
        var ciudadExistente = acc.find((ciudad) => {
            return ciudad.nombre === objeto.Ciudad;
        });

        if (ciudadExistente) {
            ciudadExistente.profesionales.push({
                Dia: objeto.Dia,
                MP: objeto.MP,
                Nombre: objeto.Nombre,
                Celular: objeto.Celular,
                Descripcion: objeto.Descripcion,
                Seccional: objeto.Seccional,
                IdSeccional: objeto.IdSeccional
            });
        } else {
            acc.push({
                nombre: objeto.Ciudad,
                profesionales: [{
                    Dia: objeto.Dia,
                    MP: objeto.MP,
                    Nombre: objeto.Nombre,
                    Celular: objeto.Celular,
                    Descripcion: objeto.Descripcion,
                    Seccional: objeto.Seccional,
                    IdSeccional: objeto.IdSeccional
                }],
            });
        }

        return acc;
    }, []);
    ----------------------------------------------------------- */

    const hoy = DateTime.now().toFormat('dd/LL/yyyy');

    const urgenciasHoy = formattedData.filter(element => {
        return element.Dia === hoy
    });

    if(urgenciasHoy.length > 0) {
        urgenciasHoy.forEach(element => {
            const profesional = document.createElement('div');
            const profesionalHeader = document.createElement('div');
            const profesionalBody = document.createElement('div');

            profesional.classList.add('card', 'mb-4', 'text-bg-light');
            profesionalHeader.classList.add('card-header');
            profesionalBody.classList.add('card-body');

            profesionalHeader.textContent = element.Ciudad;

            profesionalBody.innerHTML = `
            <h4 class="card-title"><strong>${element.Nombre}</strong></h5>
            <h5 class="card-subtitle mb-4">Matrícula Profesional ${element.MP}</h6>
            <p class="card-text mb-0"><strong>Teléfono:</strong> ${element.Celular}</p>
            <p class="card-text"><strong>Detalles: </strong>${element.Descripcion}</p>`;
            profesional.append(profesionalHeader, profesionalBody);

            profesionales.append(profesional);
        });
    } else {
        profesionales.innerHTML = `<h2>No se han encontrado profesionales</h2>
        <p>Ningún profesional en nuestros registros se encuentra atendiendo urgencias el día de hoy</p>`;
    }
}

filterData();