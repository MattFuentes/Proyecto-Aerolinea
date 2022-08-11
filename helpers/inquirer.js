const inquirer = require('inquirer');
require('colors');

const answer = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Origen`
            },
            {
                value: 2,
                name: `${'2.'.green} Destino`
            },
            {
                value: 3,
                name: `${'3.'.green} Tipo de Equipaje`
            },
            {
                value: 4,
                name: `${'4.'.green} Cantidad Dias`
            },
            {
                value: 5,
                name: `${'5.'.green} Reserva`
            },
            {
                value: 0,
                name: `${'0.'.green} Cerrar`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log('===============================\n'.cyan);
    console.log('        Aerolineas  MATT');
    console.log('        '+' Reservar Vuelo '.bgWhite.black);
    console.log('\n==============================='.cyan);

    const {opcion} = await inquirer.prompt(answer)
    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.red} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question)
    return desc;
}

const readInputNumber = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0/*  || typeof value === 'string' */) {
                    console.log({value}, typeof value)
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question)
    return desc;
}

const listPlaces = async(places = []) => {
    const choices = places.map( (place, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.red + ' CANCELAR'
    })
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione el lugar: ',
            choices
        }
    ]
    const {id} = await inquirer.prompt(question);
    return id
}

module.exports = {
    inquirerMenu,
    pausa,
    readInput,
    listPlaces,
    readInputNumber
}