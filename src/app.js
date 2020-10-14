const express = require('express')
const app = express()

app.set('port', process.env.PORT || 4000)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/movies', require('./routes/movies'))

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`))
