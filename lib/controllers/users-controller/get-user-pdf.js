const mongoose = require('mongoose')
const User = mongoose.model('User')

function sendPdfBinary (res, {contentType, data}) {
  res.writeHead(200, {
    'Content-Type': contentType
  })
  res.end(data, 'binary')
}

function sendError (res) {
  res.status(404).send({
    error: 'Cannot find pdf data'
  })
}

module.exports = (req, res) => {
  const {userID} = req.params

  User
    .findById(userID)
    .select({
      pdf: true
    })
    .then(user => {
      if (!user.pdf) {
        sendError(res)
        return
      }

      const {contentType, data} = user.pdf
      sendPdfBinary(res, { contentType, data })
    })
    .catch(err => {
      sendError(res)
    })
}

// myReadStream.pipe(res)
