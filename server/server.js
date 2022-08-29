import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { Teams } from "./classes/Teams.js"
import {empty} from "./empty.js"
import { handleJoin } from "./controllers/handleJoin.js"
import { handleStart } from "./controllers/handleStart.js"

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

io.on("connection", socket => {
  handleJoin(socket, io, t)
  handleStart(socket, io, t)
 


  // When a player adds a color, send it to the other players in the room
  socket.on("addPixel", (x, y, color) => {
    console.log("skickar färgen till hela teamet" ,color)
    const team = t.player.getTeam(socket.id)

    if (t.player.getTeam(socket.id)?.state === "inGame") {
      console.log("Lag", team.name, "har ritat i:", { x, y })

      io.in(team.name).emit("addPixel", x, y, color)
    }
  })

  // Handles chat messages
  socket.on("message", (inputChat, inputUsername, inputTeam) => {
    console.log(`Chat: [${inputTeam}] ${inputUsername}: ${inputChat}`)

    io.in(inputTeam).emit("message", inputChat, inputUsername)
  })

  // Handles player disconnection
  socket.on("disconnect", reason => {
    // Get the player object of the disconnected player
    const player = t.player.findBySid(socket.id)
    // Get the team the player was in before leaving
    const team = t.player.getTeam(socket.id)

    if (!player || !team) {
      console.log("en spelare lämnade")
      return
    }

    console.log(`${player.name} disconnected from ${team.name}`)

    // Remove player from room variable
    t.team.removePlayer(socket.id, team.name)

    // Send endGame event if the game had started
    if (team.state === "inGame") {
      t.team.changeState(team.name, "endGame")
    }

    // Send updated room data to all players in the room
    io.to(team).emit("roomData", {
      users: t.team.getPlayers(team.name),
    })

    // Send a chat message when a user disconnects
    io.to(team.name).emit(
      "message",
      `${player.name} lämnade spelet.`,
      "Server"
    )
  })
})

httpServer.listen(port, () => {
  console.log("Server is runnig on port " + port)
})
