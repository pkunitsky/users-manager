const Promise = require('bluebird')
const fs = require('fs')
const express = require('express')
const app = Promise.promisifyAll(express())
const mongoose = require('mongoose')
const config = require('./config')

require('./models')
require('./middlewares')(app)
require('./routes')(app)


mongoose.Promise = Promise
mongoose
  .connect(config.mongoURI)
  .then(_ => app.listenAsync(config.port))
  .then(_ => console.log(`server is serving on port ${config.port}`))
