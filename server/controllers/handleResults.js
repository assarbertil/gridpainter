import { Image } from "../models/imageModel.js"
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

    const facit = await Facit.findById(team.facitId).exec()
    const { percent, count } = getResult(team, facit)

    team.endTime = Date.now()

    console.log({
      start: team.startTime,
      end: team.endTime,
      facitId: team.facitId,
    })

    io.to(team.name).emit("endGame", percent, count, Math.ceil((team.endTime - team.startTime) / 1000))
  })
}
