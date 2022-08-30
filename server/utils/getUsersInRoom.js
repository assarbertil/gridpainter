const getUsersInRoom = (room, user) => {
  return users.filter(user => user.room === room)
}

module.exports = getUsersInRoom
