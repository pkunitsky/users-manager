export default {
  setUsers: (state, users) => state.users = users,
  addUser: (state, user) => state.users = [...state.users, user],
  deleteUser: (state, userID) => state.users = state.users.filter(
    u => u._id !== userID
  ),
  updateUser: (state, user) => state.users.map(
    u => u.id === user.id
      ? user
      : u
  )
}
