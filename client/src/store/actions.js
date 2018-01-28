import axios from 'axios'

export default {
  async add ({ commit }, user) {
    const res = await axios.post('https://user-api-pyskotofsb.now.sh/users', {
      user,
      completed: false
    })
    commit('add', res.data)
  },
  async remove ({ commit }, user) {
    await axios.delete(`https://user-api-pyskotofsb.now.sh/user/${user.id}`)
    commit('remove', user)
  },
  async update ({ commit }, user) {
    const res = await axios.patch(`https://user-api-pyskotofsb.now.sh/user/${user.id}`, {
      completed: !user.completed
    })
    commit('toggle', res.data)
  }
}
