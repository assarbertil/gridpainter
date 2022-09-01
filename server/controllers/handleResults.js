import { Image } from "../models/imageModel.js"
import { image } from "../image.js"

// Handles rättning
export const handleResults = (socket, io, t) => {
  socket.on("rätta", async () => {
    // Get the team the player was in
    const team = t.player.getTeam(socket.id)
    if (!team) {
      return
    }

    const reference = image.pixelData
    const teamImage = team.pixelData

    let count = 0

    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        const isEqual = reference[x][y] === teamImage[x][y]

        if (isEqual) {
          count++
        }
      }
    }

    const percent = (Math.round((count / 225) * 10_000) / 100).toFixed(2)

    console.log("####################")
    console.log("Procent rätt:", percent)
    console.log("Antal rätt:", count)
    console.log("####################")

    socket.emit("endGame", percent, count)
  })
}
