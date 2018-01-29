module.exports = {
  postUser (req, res, next) {
    if (!req.body.file) {
      res.status(417).send({
        error: "Server didn't receive file"
      })
      return
    }

    next()
  }
}
