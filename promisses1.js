const CarroDB = require('./model/CarroDB');

function teste() {

    CarroDB.getCarros(function(error, carros) {

        console.log(JSON.stringify(carros));
        
    });

}

teste();