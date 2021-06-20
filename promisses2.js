const CarroDB = require('./model/CarroDB');

function teste() {

    let promisse = CarroDB.getCarros();

    promisse.then(function(carros) {

        console.log(JSON.stringify(carros))

    });

}

teste();