import {Facit} from "../models/facitModel.js"

export const handleStart = (socket, io, t) => {
  // Receive the startGame event from a player
  socket.on("startGame", async () => {
    const team = t.player.getTeam(socket.id)

    if (team.players.length === 4 && team.state === "preGame") {
      // Send individual colors to players
      const players = t.team.getPlayers(team.name)

      const facits = await Facit.find().exec()

      const facit = facits[Math.floor(Math.random() * facits.length)]

      team.facitId = facit._id
      team.startTime = Date.now()

      const colors = players.map((player, index) => ({
        sid: player.sid,
        color: facit.colors[index],
      }))

      // Change team state in teams list
      t.team.changeState(team.name, "inGame")

      // Broadcast the startGame event from the server
      // And send event containing all colors
      console.log("Borde skicka bildens färger", colors)
      io.to(team.name).emit("startGame", colors, facit.pixelData)
      
      console.log({
        start: team.startTime,
        facitId: team.facitId
      })

      const asd = await Facit.findById(team.facitId).exec()
      console.log(facit.colors)
      console.log(facit.pixelData)
    }
  })
}
