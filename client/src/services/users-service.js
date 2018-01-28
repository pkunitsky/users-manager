import API from './api'

export default {
  getAll: _ => API.get('/users'),
  postOne: user => API.post('/users', {user}),
  getOne: userID => API.get(`/users/${userID}`),
  putOne: (userID, user) => API.put(`/users/${userID}`, user),
  deleteOne: userID => API.delete(`/users/${userID}`)
}
