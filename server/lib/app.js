const fs = require('fs')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')

require('./models')
require('./middlewares')
require('./routes')

app.listen(config.port, _ => console.log(`server is serving on port ${config.port}`))
