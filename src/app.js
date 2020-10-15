const express = require('express')
const app = express()

app.set('port', process.env.PORT || 4000)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/cars', require('./routes/cars'))

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}...`))
