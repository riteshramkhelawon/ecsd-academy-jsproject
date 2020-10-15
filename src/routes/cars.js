const { Router } = require('express')
const router = new Router()

const cars = require('../sample.json')

//retrieve all cars
router.get('/', (req, res) => res.json(cars))

//retrieve a specific car entry
router.get('/:id', (req, res) => {
    const { id } = req.params;
    let isFound = false;

    cars.forEach(car => {
        if(car.id === id){
            res.json(car);
            isFound = true;
        }
    });

    if(!isFound) res.status(404).json({ error: `car with id '${id} not found`});
});

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
        res.status(500).json({ error: 'Error adding this car' });
    }
});

//remove a car
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    cars.forEach((car, index) => {
        if (car.id === id) {
            cars.splice(index, 1);
            res.json(cars);
        }
    });
});

//update a car entry
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { make, model, colour, year } = req.body;

    if(id && make && model && colour && year){
        cars.forEach(car => {
            if(car.id === id){
                car.make = make;
                car.model = model;
                car.colour = colour;
                car.year = year;
            }
        });
        res.json({ id, make, model, colour, year });
    } else {
        res.status(500).json({ error: 'Error updating this car'});
    }
})

module.exports = router