export default {
  init: (state, users) => state.users = users,
  addOne: (state, user) => state.users = [...state.users, user],
  removeOne: (state, user) => state.users = state.users.filter(
    u => u.id !== user.id
  ),
  updateOne: (state, user) => state.users.map(
    u => u.id === user.id
      ? user
      : u
  )
}
