// Handles player disconnection
export const handleDisconnect = (socket, io, t) => {
  socket.on("disconnect", (reason) => {
    // Get the player object of the disconnected player
    const player = t.player.findBySid(socket.id)
    // Get the team the player was in before leaving
    const team = t.player.getTeam(socket.id)

    if (!player || !team) {
      console.log("en spelare lämnade")
      return
    }

    console.log(`${player.name} disconnected from ${team.name}`)

    // Remove player from room variable
    t.team.removePlayer(socket.id, team.name)

    // Send endGame event if the game had started
    if (team.state === "inGame") {
      t.team.changeState(team.name, "endGame")
    }

    // Send updated room data to all players in the room
    if (team.state === "preGame") {
      io.to(team.name).emit("roomData", {
        players: t.team.getPlayers(team.name),
      })
    } else {
      // TODO

      io.to(team.name).emit("endGame")
    }

    // Send a chat message when a user disconnects
    io.to(team.name).emit("message", `${player.name} lämnade spelet.`, "Server")
  })
}
