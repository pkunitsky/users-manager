const UsersController = require('./controllers/users-controller')
const UsersControllerPolicy = require('./policies/users-controller-policy')

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

  app.route('/api/users/:userID/pdf')
    .get(UsersController.getUserPdf)

  app.get('*', (req, res) => {
    res.sendFile('index.html')
  })
}
