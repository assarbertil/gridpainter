import { Image } from "../models/imageModel.js"
import { image } from "../image.js"
import { getResult } from "../utils/getResult.js"

// Handles rättning
export const handleResults = (socket, io, t) => {
  socket.on("rätta", async () => {
    // Get the team the player was in
    const team = t.player.getTeam(socket.id)
    if (!team) {
      return
    }

    const { percent, count } = getResult(team, image)



    io.to(team.name).emit("endGame", percent, count)
  })
}
