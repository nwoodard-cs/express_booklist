const express = require('express')

const chalk = require('chalk')
const debug = require('debug')('app') // Advanced debug loggin to terminal
const morgan = require('morgan') // Print HTTP requests

const path = require('path')

const port = process.env.PORT || 3000
const app = express()
app.use(morgan('tiny')) // Display succint http requrests
app.use(express.static(path.join(__dirname, '/public/'))) // Tell express where static files are

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.listen(port, () => {
    debug(`Server running on ${chalk.green(port)}`)
})
