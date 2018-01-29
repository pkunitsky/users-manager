const {
  getAll,
  postOne,
  getOne,
  putOne,
  deleteOne
} = require('./controllers/users-controller')

module.exports = app => {
  app.route('/api/users')
    .get(getAll)
    .post(postOne)

  app.route('/api/users/:userID')
    .get(getOne)
    .put(putOne)
    .delete(deleteOne)

  app.get('*', (req, res) => {
    res.sendFile('index.html')
  })
}


// myReadStream.pipe(res)
// const base64Prefix = 'data:image/png;base64,'
// const myReadStream = fs.createReadStream('./read/read.png', 'base64')
// const imgPlaceholder = 'http://www.planystech.com/wp-content/uploads/2017/03/profile-placeholder.jpg'
