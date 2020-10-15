const { Router } = require('express')
const router = new Router()

const cars = require('../sample.json')

//retrieve all cars
router.get('/', (req, res) => res.json(cars))

module.exports = router