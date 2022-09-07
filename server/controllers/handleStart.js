import { Facit } from "../models/facitModel.js"

// Handles when a player starts the game
export const handleStart = (socket, io, t) => {
  // Receive the startGame event from a player
  socket.on("startGame", async () => {
    const team = t.player.getTeam(socket.id)

    if (team.players.length !== 4 || team.state !== "preGame") {
      return
    }

    // Send individual colors to players
    const players = t.team.getPlayers(team.name)

    // Get all facits from the database
    const facits = await Facit.find().exec()

    // This selects a random facit
    const facit = facits[Math.floor(Math.random() * facits.length)]

    team.facitId = facit._id // Save the facit id to the team object
    team.startTime = Date.now() // Mark start time timestamp

    // Get the colors from the facit
    const colors = players.map((player, index) => ({
      sid: player.sid,
      color: facit.colors[index],
    }))

    // Change team state in teams list to inGame
    t.team.changeState(team.name, "inGame")

    // Broadcast the startGame event from the server and send the colors
    io.to(team.name).emit("startGame", colors, facit.pixelData)
  })
}
