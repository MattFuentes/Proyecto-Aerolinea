/* Clase vuelos en el cual agrega pais destino, pais origen, duracion, equipaje */

/* Variables */
const newDestiny = document.querySelector('#newDestiny'),
      selectContinents = document.querySelector('#selectContinents'),
      selectBaggage = document.querySelector('#selectBaggage'),
      selectType = document.querySelector('#selectType'),
      valueUS = document.querySelector('#selectValueUSD'),
      valueAR = document.querySelector('#selectValueARS'),
      newDestinys = [],
      flys = [],
      countries = [];

/* Clase vuelos para el inicio de la reserva */
class Fly {
    constructor(originFly, destinyFly, travelTime, baggage, type){
        this.originFly = originFly.toUpperCase();
        this.destinyFly = destinyFly.toUpperCase();
        this.travelTime = parseFloat(travelTime);
        this.baggage = baggage.toUpperCase();
        this.type = type;
    }
}
/* Clase Paises para tabla con JSON*/
class Country {
    constructor(id, continent, country, price){
        this.id = id;
        this.continent = continent;
        this.country = country;
        this.price = parseFloat(price)
    }
}

/* Eventos - Carga Boton y Seleccion */
const loader = () => {
    newDestiny.addEventListener('submit', getDestiny, false);
}

window.onload = loader;

/* Funcion de lectura de datos y push en el array */ 
const getDestiny = (event) =>{
    event.preventDefault();
    const countryOrigin = document.querySelector('#originFly').value,
          countryDestiny = document.querySelector('#destinyFly').value,
          travelTimeEnter = document.querySelector('#travelTime').value,
          container = document.querySelector('#outCome');
    if (countryDestiny == '' || countryOrigin == '' || travelTimeEnter == '' || selectBaggage.value == ''){
        Swal.fire({
            title: 'Atención!',
            text: 'Debes de rellenar todos los campos',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })      
        document.querySelector('#originFly').focus();
        container.classList.remove('outCome');
        container.innerHTML = '';
    } else if(countryDestiny == countryOrigin) {
        Swal.fire({
            title: 'Atención!',
            text: 'No puedes utilizar el mismo origen y destino, alguno debe de ser distinto',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })        
        document.querySelector('#destinyFly').focus();
        container.classList.remove('outCome');
        container.innerHTML = '';
    } else {
            if((countries.find( e => e == destinyFlight.value.toUpperCase())) && (countries.find( e => e == originFlight.value.toUpperCase()))){
                    newDestinys.push(new Fly(countryOrigin, countryDestiny, travelTimeEnter, selectBaggage.value, selectType.value ));
                    for (const newDestiny of newDestinys){
                        Swal.fire({
                            title: 'Reserva realizada!',
                            text: 'Se ha realizado la reserva!',
                            icon: 'success',
                            confirmButtonText: 'Continuar'
                    })
                    container.classList.add('outCome');
                    container.innerHTML = `<pre><h4>Origen: ${newDestiny.originFly} >> Destino: ${newDestiny.destinyFly} - Duracion: ${newDestiny.travelTime} dias - Tipo de Equipaje: ${newDestiny.baggage} - Tipo de vuelo: ${newDestiny.type}</h4></pre>`
                    }    
            } else {
                container.classList.remove('outCome');
                container.innerHTML = '';
                    Swal.fire({
                        title: 'Atención!',
                        text: 'El pais esta mal escrito',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    })      
                }
            }
        }


/* SESSIONSTORAGE SOBRE SELECCION DIVISA */
const prices = sessionStorage.getItem('typePrices');
prices == null 
    ?(valueUS.addEventListener('click', valuesUS = () => {
        valueUS.value == 'USD' && sessionStorage.setItem('typePrices', 'USD')
        location.reload()
    }),
    valueAR.addEventListener('click', valuesAR = () => {
        valueAR.value == 'ARS' && sessionStorage.setItem('typePrices', 'ARS')
        location.reload()
    })) : document.querySelector('#divisaSelector').innerHTML=''
const divInner = document.querySelector('#divInner');
divInner.innerHTML += `<h4 style='color:green'>Divisa: ${prices}</h4>`;

/* TABLA DE CONTINENTES */
const tableContinents = document.querySelector('#listaContinentes tbody');
const loadCountry = () => {
    fetch('https://raw.githubusercontent.com/MattFuentes/CursoJS/main/paises.json')
    .then(res => res.json())
    .then(paises => {
        paises.forEach(pais => {
            const table = document.createElement('tr');
            table.classList.add('table-complete');
            table.innerHTML += `
            <td>${pais.continent}</td>
            <td>${pais.country}</td>
            `
            prices == 'USD' ? (table.innerHTML += `<td>USD ${pais.price}</td>`) : (table.innerHTML += `<td>ARS ${pais.price * 318}</td>`);
            tableContinents.appendChild(table);
            flys.push(new Country(pais.id, pais.continent, pais.country, pais.price));
        });
        for(let j = 0; j < flys.length; j++){
            countries.push(flys[j].country);
        }
    })
}
loadCountry();

/* BUSCADOR PARA LA TABLA */
document.addEventListener('keyup', e=> {
    /* Call #Buscador v */ 
    if(e.target.matches('#buscador')) {
        /* Escape = Borrar */
         if (e.key ==='Escape')e.target.value = ''
        /* Buscador v */
        document.querySelectorAll('.table-complete').forEach(element =>{
            element.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?element.classList.remove('filtro-table')
            :element.classList.add('filtro-table')
        });
    }
}) 

/* Equipaje Select */
const baggage = ['Bolso', 'Equipaje Mediano', 'Equipaje Grande'];
baggage.forEach(function(equip){
    const equipaj = document.createElement('option');
    equipaj.text = equip;
    equipaj.value = equip;
    selectBaggage.appendChild(equipaj);
})

/* Tipo vuelo Select */
const typeFly = ['Solo Ida', 'Ida y Vuelta'];
typeFly.forEach(function(typeF){
    const typeFlight = document.createElement('option');
    typeFlight.text = typeF;
    typeFlight.value = typeF;
    selectType.appendChild(typeFlight);
})

/* Origen Autocomplete */
const sortedCountries = countries.sort();
const originFlight = document.querySelector('#originFly');
originFlight.addEventListener('keyup', (e) => {
    removeElements();
        for(let i of sortedCountries){
            console.log(i)
            if(i.toLowerCase().startsWith(originFlight.value.toLowerCase()) && originFlight.value != ''){
            const listItemOr = document.createElement('li');
            listItemOr.classList.add('list-items');
            listItemOr.style.cursor = 'pointer';
            listItemOr.setAttribute('onclick', "displayOrigin('"+i+"')");
            let word = '<b>' + i.substr(0,originFlight.value.length) + '</b>';
            word += i.substr(originFlight.value.length);
            listItemOr.innerHTML = word;
            document.querySelector('.listOr').appendChild(listItemOr);
            }
        }
});
const displayOrigin = (value) => {
    originFlight.value = value;
    removeElements();
}
/* Destino Autocomplete */
const destinyFlight = document.querySelector('#destinyFly');
destinyFlight.addEventListener('keyup', (e) => {
    removeElements();
        for(let i of sortedCountries){
            if(i.toLowerCase().startsWith(destinyFlight.value.toLowerCase()) && destinyFlight.value != ''){
            const listItemDest = document.createElement('li');
            listItemDest.classList.add('list-items');
            listItemDest.style.cursor = 'pointer';
            listItemDest.setAttribute('onclick', "displayDestiny('"+i+"')");
            let word = '<b>' + i.substr(0,destinyFlight.value.length) + '</b>';
            word += i.substr(destinyFlight.value.length);
            listItemDest.innerHTML = word;
            document.querySelector('.listDest').appendChild(listItemDest);
            }
        }
});
const displayDestiny = (value) => {
    destinyFlight.value = value;
    removeElements();
}
/* Eliminar items del autocomplete */
const removeElements = () => {
    let items = document.querySelectorAll('.list-items');
    items.forEach((item) => {
        item.remove();
    })
}