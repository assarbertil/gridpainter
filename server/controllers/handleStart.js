import { empty } from "../empty.js"
import { image } from "../image.js"

export const handleStart = (socket, io, t) => {
  // Receive the startGame event from a player
  socket.on("startGame", async () => {
    const team = t.player.getTeam(socket.id)

    if (team.players.length === 4 && team.state === "preGame") {
      // Send individual colors to players
      const players = t.team.getPlayers(team.name)
      const colors = players.map((player, index) => ({
        sid: player.sid,
        color: image.colors[index],
      }))

      // Change team state in teams list
      t.team.changeState(team.name, "inGame")

      // Broadcast the startGame event from the server
      // And send event containing all colors
      console.log("Borde skicka bildens färger", colors)
      io.to(team.name).emit("startGame", colors, image.pixelData)
      
    }
  })
}
