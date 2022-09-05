import { Image } from "../models/imageModel.js"
import { image as referenceImage } from "../image.js"
import { getResult } from "../utils/getResult.js"


// Handles player disconnection
export const handleSaveImage = (socket, io, t) => {
  socket.on("saveImage", async () => {
    // Get the team the player was in
    const team = t.player.getTeam(socket.id)

    if (!team) {
      console.log("en spelare lämnade")
      return
    }

    console.log(team)

    const image = await Image.findOne({ teamId: team.id }).exec()

    if (!image) {
      console.log("Ska spara bild")

      const {percent} = getResult(team, referenceImage)

      Image.create({
        teamId: team.id,
        teamName: team.name,
        percentCorrect: percent,
        pixelData: team.pixelData,
      })
     

      console.log("Bild sparad")
    } else {
      console.log("Bilden finns redan")
    }
  })
}
