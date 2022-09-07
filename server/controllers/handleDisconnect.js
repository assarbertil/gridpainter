// Handles player disconnection
export const handleDisconnect = (socket, io, t) => {
  socket.on("disconnect", (reason) => {
    const player = t.player.findBySid(socket.id) // Get the player object of the disconnected player
    const team = t.player.getTeam(socket.id) // Get the team the player was in before leaving

    // This is a failsafe for when a player leaves after the server has restarted
    if (!player || !team) {
      return
    }

    // Remove player from room variable
    t.team.removePlayer(socket.id, team.name)

    // Send endGame event if the game had started
    if (team.state === "inGame") {
      t.team.changeState(team.name, "endGame")

      // Sets end time timestamp to team object
      team.endTime = Date.now()
    }

    if (team.state === "preGame") {
      // Send updated room data to all players in the room
      // This is done to update the player list and remove the player that left
      io.to(team.name).emit("roomData", {
        players: t.team.getPlayers(team.name),
      })
    } else {
      // End game if it was running
      io.to(team.name).emit("endGame")

      t.team.delete(team.name)
    }

    // Send a chat message when a user disconnects
    io.to(team.name).emit("message", `${player.name} lämnade spelet.`, "Server")
  })
}
