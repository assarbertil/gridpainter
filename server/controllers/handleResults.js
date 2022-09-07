import { Facit } from "../models/facitModel.js"
import { getResult } from "../utils/getResult.js"

// Handles rättning
export const handleResults = (socket, io, t) => {
  socket.on("rätta", async () => {
    // Get the team the player was in
    const team = t.player.getTeam(socket.id)
    if (!team) {
      return
    }

    const facit = await Facit.findById(team.facitId).exec() // Find the facit in the database
    const { percent, count } = getResult(team, facit) // This calculates the result

    // Mark end time timestamp
    team.endTime = Date.now()

    // Send endGame event to the team
    io.to(team.name).emit(
      "endGame",
      percent,
      count,
      Math.ceil((team.endTime - team.startTime) / 1000)
    )
  })
}
