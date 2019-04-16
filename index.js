const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const connectionString = process.env.DATABASE_URL
const sequelize = new Sequelize(connectionString, {desfine: { timestamps: false }})
const app = express()

const Customer = sequelize.define('customer', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.TEXT,
    bio: Sequelize.TEXT,
    address_line_1: Sequelize.TEXT,
    address_line_2: Sequelize.TEXT,
    city: Sequelize.TEXT
}, {
    tableName: 'customers'
})

Customer.sync()

const port = process.env.port
app.listen(port, () => `Listening on port ${port}`)

app.use(bodyParser.json())

app.get('/customers', function(req, res, next) {
    Customer.findAll().then(customers => {
        res.json({customers})
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })
})