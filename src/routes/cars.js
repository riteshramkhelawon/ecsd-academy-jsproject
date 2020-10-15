const { Router } = require('express')
const router = new Router()

const movies = require('../sample.json')

router.get('/', (req, res) => res.json(movies))

router.post('/', (req, res) => {
    const movie = { id: (movies.length + 1).toString(), ...req.body }
    if (movie.id && movie.title && movie.rating) {
        movies.push(movie)
        res.json(movie)
    } else {
        res.status(500).json({error: 'There was an error.'})
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, director, year, rating } = req.body
    if (id && title && director && year && rating) {
        movies.forEach(movie => {
            if (movie.id === id) {
                movie.title = title
                movie.director = director
                movie.year = year
                movie.rating = rating
            }
        })
        res.json({ id, title, director, year, rating })
    } else {
        res.status(500).json({error: 'There was an error.'})
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    if (id) {
        movies.forEach((movie, index) => {
            if (movie.id == id) {
                movies.splice(index, 1)
            }
        })
        res.json(movies)
    }
})

module.exports = router