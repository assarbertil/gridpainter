export const handleJoin = (socket, io, t) => {
  socket.on("join", async (teamName, username) => {
    // Create a room if it doesn't exist
    if (t.team.findByName(teamName) === undefined) {
      t.team.create(teamName)
    }

    // Check if player can join a team
    if (t.team.findByName(teamName).players.length < 4) {
      await socket.join(teamName)

      // Add player to team object
      t.team.addPlayer(teamName, {
        sid: socket.id,
        name: username,
      })

      // Broadcast join message in chat
      io.to(teamName).emit(
        "message",
        `${username} gick med i spelet.`,
        "Server"
      )

      // Send back ok status to join room
      socket.emit("blockJoin", false)
    } else {
      socket.emit("blockJoin", true)
    }

    // Send user list when someone joins
    // Delayed to ensure we pick it up on the front end
    setTimeout(() => {
      io.to(teamName).emit("roomData", {
        teamName,
        players: t.team.getPlayers(teamName),
      })
    }, 100)
  })
}
