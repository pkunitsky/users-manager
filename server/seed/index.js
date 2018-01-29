/**
 * 1. drops users collection
 * 2. fills database with users.json data
 */
function seed () {
  const Promise = require('bluebird')
  const fs = require('fs')
  const mongoose = require('mongoose')
  const User = require('../lib/models/User')
  const config = require('../lib/config')
  const users = require('./users.json')

  mongoose.Promise = Promise
  mongoose
    .connect(config.mongoURI)
    .then(_ => User.collection.drop())
    .then(_ => 
      Promise.all(
        users.map(user => new User(user).save())
      )
    )
    .then(_ => {
      mongoose.connection.close()
      console.log('database was successfully cleaned and filled with new data')
    })
}

process.env.NODE_ENV !== 'production'
  ? seed()
  : console.log('seed in production mode is forbidden')
