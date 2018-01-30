const UsersController = require('./controllers/users-controller')
const UsersControllerPolicy = require('./policies/users-controller-policy')

const path = require('path')

module.exports = app => {
  app.route('/api/users')
    .get(UsersController.getUsers)
    .post(
      UsersControllerPolicy.postUser,
      UsersController.postUser
    )

  app.route('/api/users/:userID')
    .get(UsersController.getUser)
    .put(UsersController.putUser)
    .delete(UsersController.deleteUser)

  app.get('/api/users/:userID/pdf', UsersController.getUserPdf)
  app.get('/api/users/:userID/img', UsersController.getUserImg)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
  })
}
