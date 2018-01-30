export default {
  setUsers: (state, users) => state.users = users,
  addUser: (state, user) => state.users = [...state.users, user],
  deleteUser: (state, userID) => {
    const {users} = state
    const i = users.findIndex(u => u._id === userID)
    users.splice(i, 1)
  },
  updateUser: (state, user) => state.users = state.users.map(
    u => u._id === user._id
      ? user
      : u
  )
}
