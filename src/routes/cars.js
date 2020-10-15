const { Router } = require('express')
const router = new Router()

const cars = require('../sample.json')

//retrieve all cars
router.get('/', (req, res) => res.json(cars))

//add a new car
router.post('/', (req, res) => {
    const newCar = { id: (cars.length + 1).toString(), ...req.body }
    //check that the request body has all the required parameters
    let carHasAllProperties = (newCar.id && newCar.make && newCar.model && newCar.colour && newCar.year);
    //check if this car already exists in the json file
    let carExists = cars.some(car => 
        car.make === newCar.make && 
        car.model == newCar.model && 
        car.colour === newCar.colour && 
        car.year === newCar.year);

    if (carHasAllProperties && !carExists) {
        cars.push(newCar);
        res.json(newCar);
    } else {
        res.status(500).json({error: 'Error adding this car'});
    }
});

//remove a car
router.delete('/:id', (req,res) => {
    const { id } = req.params;
    
    cars.forEach((car, index) => {
        if(car.id === id){
            cars.splice(index, 1);
            res.json(cars);
        }
    });
});

module.exports = router