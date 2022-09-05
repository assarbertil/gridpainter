import cors from "cors"
import "dotenv/config"
import express from "express"
import { createServer } from "http"
import mongoose from "mongoose"
import { Server } from "socket.io"
import { Teams } from "./classes/Teams.js"
import { handleAddPixel } from "./controllers/handleAddPixel.js"
import { handleChatMessage } from "./controllers/handleChatMessage.js"
import { handleDisconnect } from "./controllers/handleDisconnect.js"
import { handleJoin } from "./controllers/handleJoin.js"
import { handleResults } from "./controllers/handleResults.js"
import { handleSaveImage } from "./controllers/handleSaveImage.js"
import { handleStart } from "./controllers/handleStart.js"
import { Facit } from "./models/facitModel.js"
import { Image } from "./models/imageModel.js"

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.once("open", () => {
  console.log("Database connected")
})

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
    credentials: true,
  },
})
const port = 3001
const t = new Teams()

app.use("/", express.static("./client"))
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
    credentials: true,
  })
)

io.on("connection", (socket) => {
  handleJoin(socket, io, t)
  handleStart(socket, io, t)
  handleChatMessage(socket, io, t)
  handleDisconnect(socket, io, t)
  handleAddPixel(socket, io, t)
  handleSaveImage(socket, io, t)
  handleResults(socket, io, t)
})

//GET IMAGES
app.get("/api", async (req, res) => {
  try {
    const image = await Image.find()

    // console.log(image)

    res.json(image)
  } catch (err) {
    console.log(err)
    res.json(err.message)
  }
})

// GET FACIT
app.get("/api/facit", async (req, res) => {
  try {
    const facit = await Facit.find()

    res.json(facit)
  } catch (err) {
    res.json(err.message)
  }
})

//DELETE IMAGES
app.delete("/api/delete/:id", async (req, res) => {
  console.log("should delete image")

  const id = req.params.id

  console.log(id)

  Image.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      console.log("Deleted:", id)
      res.json({ msg: `Deleted: ${id}` })
    }
  })
})

httpServer.listen(port, () => {
  console.log("Server is running on port " + port)
})
