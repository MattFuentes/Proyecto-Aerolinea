const fs = require('fs');
const axios = require('axios');


class Search {
    history = [];
    dbPath = './db/database.json'
    constructor() {
        this.readDB();
    }

    get paramsMapbox() {
        return {
            'language':'es',
            'limit': 2,
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get historyUpperCase() {
        return this.history.map( place => {
            let word = place.split(' ');
            word = word.map( w => w[0].toUpperCase() + w.substring(1));
            return word.join(' ')
        })
    }
    async city(place = ''){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });
            const res = await instance.get();
            return res.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
            
        } catch (error) {
            console.log('error jeje')
            return [];
        }
    }

    addHistory( place = ''){
        if ( this.history.includes(place.toLocaleLowerCase())){
            return;
        }
        this.history =  this.history.splice(0,3);
        this.history.push( place.toLocaleLowerCase() );
        this.saveDB()
    }
    saveDB(){
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB(){
        if ( !fs.existsSync(this.dbPath) ) return;
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.history = data.history
    }
}

module.exports = Search