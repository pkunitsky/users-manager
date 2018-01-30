const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = app => {
  app.use(cors())
  app.use(morgan('tiny'))
  app.use(bodyParser.json())
  // app.use(express.static(path.join(__dirname, '../../client/dist')))
}
