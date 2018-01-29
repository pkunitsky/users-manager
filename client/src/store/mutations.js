export default {
  setUsers: (state, users) => state.users = users,
  addUser: (state, user) => state.users = [...state.users, user],
  removeUser: (state, user) => state.users = state.users.filter(
    u => u.id !== user.id
  ),
  updateUser: (state, user) => state.users.map(
    u => u.id === user.id
      ? user
      : u
  )
}
