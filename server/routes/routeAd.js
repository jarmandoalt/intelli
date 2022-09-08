const express = require ('express')
const { sendAd } = require ('../puppeteer/index')
const api = express.Router()

api.post('/sendAd', sendAd)

module.exports = api

