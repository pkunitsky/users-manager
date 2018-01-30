/**
 * 1. rename ".env.example" file to ".env"
 * 2. change .env variables for your needs (see all posible options at "./src/config/prod.js")
 */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  const path = require('path')
  const dotEnvPath = path.join(__dirname, './.env')
  
  dotenv.config({ path: dotEnvPath })
  console.log(`using .env configuration \nmode: ${process.env.NODE_ENV} \nmongoURI: ${process.env.MONGO_URI}`)
  require('../../app.js')
}
