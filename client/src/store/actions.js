import UsersService from '@/services/users-service'

export default {
  async add ({ commit }, user) {
    const res = await axios.post('https://user-api-pyskotofsb.now.sh/users', {
      user,
      completed: false
    })
    commit('add', res.data)
  },

  async getAll({ commit }) {
    UsersService
    .getAll()
    .then(users => {
      this.users = users.data
    })

    try {
      const res = await UsersService.getAll()
      const {users} = res.data
      commit('init', users)
    } catch (err) {
      console.log(err.toString())
    }
  }
}
