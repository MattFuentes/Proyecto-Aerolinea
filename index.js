require('dotenv').config();
// TODO: Reserva en un array y poder seleccionarlo
const { inquirerMenu, pausa, listPlaces, readInput, readInputNumber } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async() => {
    
    const search = new Search();
    let ans;

    // Do While para el menu 
    do {
        ans = await inquirerMenu()
        
        switch( ans ){
            case 1:
            // Mostrar MSG
            const termSearch = await readInput('Ciudad: ');
            // Buscar lugar
            const places = await search.city( termSearch );
            // Seleccionar Lugar
            const selectId = await listPlaces(places);
            if ( selectId === '0' ) continue
            const selectPlace = places.find( p => p.id === selectId)
            // Guardar DB
            search.addHistory( 'Origen: '.cyan + selectPlace.name)
            // Mostrar resultados
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad:'.green, selectPlace.name);
            console.log('Lat:', selectPlace.lat);
            console.log('Long:', selectPlace.lng);
            break;
            case 2:
            const termSearchDest = await readInput('Ciudad: ');
            const placesDest = await search.city( termSearchDest );
            const selectIdDest = await listPlaces(placesDest);
            if ( selectIdDest === '0' ) continue
            const selectPlaceDest = placesDest.find( p => p.id === selectIdDest)
            search.addHistory( 'Destino: '.cyan + selectPlaceDest.name)
            console.log('\nInformacion de la ciudad\n'.green);
            console.log('Ciudad:'.green, selectPlaceDest.name);
            console.log('Latitud:', selectPlaceDest.lat);
            console.log('Longitud:', selectPlaceDest.lng);
            break;
            case 3:
                const typeBag = await readInput('Tipo de equipaje: ');
                search.addHistory( 'Tipo de equipaje: '.cyan + typeBag )
            break;
            case 4:
                const amountDay = await readInputNumber('Cantidad de dias: ');
                search.addHistory( 'Cantidad de dias: '.cyan + amountDay )
            break;
            case 5:
                search.historyUpperCase.forEach( (place) => {
                    console.log(' ' + place)
                })
            break;
        }


        if ( ans !== 0) await pausa();
    } while ( ans !== 0) //Mientras sea distinto de 0, sino cierra app.



}

main();