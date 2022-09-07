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

// Establish mongoose connection
mongoose.connect(process.env.DATABASE_URL)

// Mongoose object
const db = mongoose.connection
db.once("open", () => {
  console.log("Database connected")
})

// Shared cors config
const corsConfig = {
  origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
  credentials: true,
}

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: corsConfig })
const port = 3001
const t = new Teams()

app.use(cors(corsConfig))

// All controllers
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

httpServer.listen(port, () => {
  console.log("Server is running on port " + port)
})
