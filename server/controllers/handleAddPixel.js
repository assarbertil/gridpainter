export const handleAddPixel = (socket, io, t) => {
  // When a player adds a color, send it to the other players in the room
  socket.on("addPixel", (x, y, color) => {
    console.log("skickar färgen till hela teamet", color)
    const team = t.player.getTeam(socket.id)

    if (t.player.getTeam(socket.id)?.state === "inGame") {
      console.log("Lag", team.name, "har ritat i:", { x, y })

      io.in(team.name).emit("addPixel", x, y, color)

      t.team.addPixel(team.name, x, y, color)
    }
  })
}
