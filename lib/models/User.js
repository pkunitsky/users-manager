const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  
  img: {
    data: Buffer,
    contentType: String,
  },
  pdf: {
    data: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model('User', UserSchema)
