if (process.env.NODE_ENV !== 'production') {
  const Promise = require('bluebird')
  const fs = require('fs')
  const User = require('../lib/models/User')
  
  const usersJSON = require('./users.json')
  console.log(typeof usersJSON)
} else {
  console.log('seed is production mode is forbidden')
}
