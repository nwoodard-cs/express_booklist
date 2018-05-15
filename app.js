const express = require('express')
const chalk = require('chalk') // Colored logging statements
const debug = require('debug')('app') // Advanced debug loggin to terminal
const morgan = require('morgan') // Print HTTP requests
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('tiny')) // Display succint http requests
app.use(express.static(path.join(__dirname, '/public/'))) // Tell express where static files are
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')))

app.set('views', './src/views')
app.set('view engine', 'ejs')

const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' }
]

const bookRouter = require('./src/routes/bookRoutes')(nav)

app.use('/books', bookRouter)
app.get('/', (req, res) => {
    res.render(
        'index',
        {
            nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
            pageTitle: 'My Special Hell'
        }
    )
})

app.listen(port, () => {
    debug(`Server running on ${chalk.green(port)}`)
})
