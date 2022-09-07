// When a player adds a color, send it to the other players in the room
export const handleAddPixel = (socket, io, t) => {
  socket.on("addPixel", (x, y, color) => {
    // Get the team the player is in
    const team = t.player.getTeam(socket.id)

    // If the team is currently in a game, add the pixel to the team
    if (t.player.getTeam(socket.id)?.state === "inGame") {
      // Send `addPixel` to the team.
      // Contains position and color
      io.in(team.name).emit("addPixel", x, y, color)

      // Add the pixel to the team object for keeping track of the score
      t.team.addPixel(team.name, x, y, color)
    }
  })
}
