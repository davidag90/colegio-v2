function crearCheckbox(value, legend, label) {
    let legendProc = legend.toLowerCase().replace(/ /g, '-');
    let formCheck = document.createElement('div');
    let formCheckInput = document.createElement('input');
    let formCheckLabel = document.createElement('label');

    formCheck.classList.add('form-check');
    formCheckInput.classList.add('form-check-input', `check-${legendProc}`);
    formCheckLabel.classList.add('form-check-label');

    formCheckInput.setAttribute('type', 'checkbox');
    formCheckInput.setAttribute('value', value);
    formCheckInput.setAttribute('id', `${legendProc}-${value}`);

    formCheckLabel.setAttribute('for', `${legendProc}-${value}`);
    formCheckLabel.textContent = label;

    formCheck.append(formCheckInput, formCheckLabel);

    return formCheck;
}

async function setCiudades(url) {
    try {
        const data = await fetch(url);
        const result = await data.json();
        const dropdownCiudades = document.getElementById('lista-ciudades');
        
        result.forEach( element => {
            let option = document.createElement('option');
            
            option.value = element.IdCiudad;
            option.innerText = element.Ciudad;
            
            dropdownCiudades.append(option);
        });
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

setCiudades('https://www.indexweb.com.ar/matriculas/bolsaofer.ashx?Ciudades=SI');

async function setEspecialidades(url) {
  try {
    const data = await fetch(url);
    const result = await data.json();
    const listaEspecLeg = document.querySelector('#lista-especialidades > legend');
    const listaEspecDest = document.querySelector('#lista-especialidades > .col-form-checks');
            
    result.forEach(element => {
        let checkbox = crearCheckbox(element.Id, listaEspecLeg.innerText, element.Especialidad)

        listaEspecDest.append(checkbox);
    });

    crearRefEspec(result);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

function crearRefEspec(data) {
    data.forEach( element => {
        let especialidad = {
            [element.Id] : element.Especialidad
        }

        refEspec.push(especialidad);
    }); 
}

const refEspec = [];

setEspecialidades('https://www.indexweb.com.ar/matriculas/bolsaofer.ashx?ListaEspecialidades=SI');


async function setExp(url) {
  try {
    const data = await fetch(url);
    const result = await data.json();
    const listaExpLeg = document.querySelector('#lista-experiencia > legend');
    const listaExpDest = document.querySelector('#lista-experiencia > .col-form-checks');
            
    result.forEach(element => {
        let checkbox = crearCheckbox(element.Id, listaExpLeg.innerText, element.Experiencia);

        listaExpDest.append(checkbox);
    });
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

setExp('https://www.indexweb.com.ar/matriculas/bolsaofer.ashx?Experiencia=SI');

function procesarEspec(refEspec, arrEspec) {
    const especProc = [];

    // Iterar sobre el segundo array
    arrEspec.forEach(element => {
        // Verificar si el elemento coincide con alguna clave en el primer array
        refEspec.forEach(objeto => {
            const clave = Object.keys(objeto)[0]; // Obtener la clave del objeto
            
            if (element === clave) {
                // Si hay coincidencia, agregar el valor al nuevo array
                especProc.push(objeto[clave]);
            }
        });
    });

    return especProc;
}

async function setAnuncios(url) {
    try {
        const data = await fetch(url);
        const result = await data.json();

        result.forEach( element => {
            const arrEspec = element["Especialidades"].split("");
            const nuevoAnuncio = {
                ...element,
                Especialidades : arrEspec,
                EspecDet : procesarEspec(refEspec, arrEspec)
            }

            anuncios.push(nuevoAnuncio);
        });
    } catch(error) {
        console.log(`ERROR: ${error}`);
    }
}


const anuncios = [];
setAnuncios('https://indexweb.com.ar/matriculas/bolsaofer.ashx?anuncios=SI');


function filtrarEspec(especAnuncio, especBuscadas) {
    let check = false;
  
    especAnuncio.forEach(element => {
      if (especBuscadas.includes(element)) {
        check = true;
      }
    });
  
    return check;
}

function filtrarExp(expAnuncio, expBuscadas) {
    let check = false;

    expBuscadas.forEach(element => {
        if(element == expAnuncio) {
            check = true;
        }
    });

    return check;
}

function filtrarAnuncios() {
    containerAnuncios.innerHTML = '';

    let ciudad = document.getElementById('lista-ciudades').value;
    
    const especBoxes = document.querySelectorAll('.check-especialidad:checked');
    const especialidades = [];
    
    if(especBoxes.length > 0) {
        especBoxes.forEach(element => {
            especialidades.push(element.value)
        });
    }

    const expBoxes = document.querySelectorAll('.check-experiencia:checked');
    const experiencia = [];
    
    if(expBoxes.length > 0) {
        expBoxes.forEach(element => {
            experiencia.push(element.value)
        });
    }
    
    anuncios.forEach(element => {
        let verifyCiudad = true;
        let verifyEspec = true;
        let verifyExp = true;

        if(ciudad != '') {
            verifyCiudad = element.IdCiudad === ciudad;
        }

        if(especialidades.length > 0) {
            verifyEspec = filtrarEspec(element.Especialidades, especialidades);
        }

        if(experiencia.length > 0) {
            verifyExp = filtrarExp(element.IdExperiencia, experiencia);
        }

        if(verifyCiudad && verifyEspec && verifyExp) {
            let anuncio = document.createElement('div');
            let anuncioInner = document.createElement('div');
            
            anuncio.classList.add('anuncio', 'mb-4', 'card', 'text-bg-light');
            anuncioInner.classList.add('card-body');

            let anuncioContent = {
                'Profesional': element.Nombre,
                'Matricula': element.MP,
                'Domicilio': `${element.Direccion} (${element.Ciudad})`,
                'Teléfono': element.Celular,
                'Experiencia': element.Experiencia,
                'Especialidades': element.EspecDet.join(', '),
                'Carga Horaria': element.CargaHoraria,
                'Detalles': element.Anuncio
            };

            for (let propiedad in anuncioContent) {
                if(anuncioContent[propiedad] != '') {
                    anuncioInner.innerHTML += `<p><strong>${propiedad}:</strong> ${anuncioContent[propiedad]}</p>`
                }
            }
            
            anuncio.appendChild(anuncioInner);
            containerAnuncios.appendChild(anuncio);
        }
    });
}

const containerAnuncios = document.getElementById('anuncios');

const buscarAnuncios = document.getElementById('buscar-anuncios');
buscarAnuncios.addEventListener('click', filtrarAnuncios);