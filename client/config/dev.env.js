'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: "'window.location.origin'",
  API: "'http://localhost:8081/api'"
})
