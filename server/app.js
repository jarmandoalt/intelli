const express = require ('express')
const cors = require ('cors')
const route = require ('./routes/routeAd')
const app = express()

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())


app.use('/v1', route)

module.exports = app