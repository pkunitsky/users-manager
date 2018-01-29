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
  img: {
    type: Buffer,
    contentType: String,
    required: true
  },

  pdf: {
    type: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model('User', UserSchema)
