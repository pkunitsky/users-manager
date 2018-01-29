import API from './api'

export default {
  getUser: userID => API.get(`/users/${userID}`),
  getUsers: _ => API.get('/users'),
  putUser: (userID, user) => API.put(`/users/${userID}`, {user}),
  deleteUser: userID => API.delete(`/users/${userID}`)
}
