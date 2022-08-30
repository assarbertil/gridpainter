import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { Teams } from "./classes/Teams.js"
import { empty } from "./empty.js"
import { handleJoin } from "./controllers/handleJoin.js"
import { handleStart } from "./controllers/handleStart.js"
import { handleChatMessage } from "./controllers/handleChatMessage.js"
import { handleDisconnect } from "./controllers/handleDisconnect.js"
import { handleAddPixel } from "./controllers/handleAddPixel.js"
import mongoose from "mongoose"
import "dotenv/config"
import { Image } from "./models/imageModel.js"

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.once("open",()=>{
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

io.on("connection", (socket) => {
  handleJoin(socket, io, t)
  handleStart(socket, io, t)
  handleChatMessage(socket, io, t)
  handleDisconnect(socket, io, t)
  handleAddPixel(socket, io, t)
})

httpServer.listen(port, () => {
  console.log("Server is running on port " + port)
})