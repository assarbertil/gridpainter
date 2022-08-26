import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { Teams } from "./classes/Teams.js"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
    credentials: true,
  },
})

const port = 3001

const { player, team } = new Teams()

app.use("/", express.static("./client"))

io.on("connection", socket => {
  socket.on("join", (teamName, username) => {
    console.log(username, "joined", teamName)

    // Create a room if it doesn't exist
    // Join a room if it exists

    if (team.findByName(teamName) === undefined) {
      team.create(teamName)
    }
    team.addPlayer(teamName, {
      sid: socket.id,
      name: username,
    })

    // socket.emit(socket.id);
    socket.join(teamName)

    // Send room data with user list when someone joins
    io.to(teamName).emit("roomData", {
      players: team.getPlayers(teamName),
    })

    // Start the game when four players are in the room
    if (team.getPlayers(teamName).length === 4) {
      team.changeState(teamName, "inGame")
      io.to(teamName).emit("startGame", ["#f00", "#0f0", "#00f", "#ff0"])
    }
  })

  // socket.on("userInfo", (userName, team) => {
  //   console.log(x, y);
  // });

  // When a player adds a color, send it to the other players in the room
  socket.on("addColor", (x, y, team) => {
    console.log("Lag", team, "har ritat i:", { x, y })
    io.in(team).emit("addColor", x, y)
  })

  // Handles chat messages
  socket.on("message", (inputChat, inputUsername, inputTeam) => {
    console.log(`Chat: [${inputTeam}] ${inputUsername}: ${inputChat}`)

    io.in(inputTeam).emit("message", inputChat, inputUsername)
  })

  // Handles player disconnection
  socket.on("disconnect", reason => {
    // Get the player object of the disconnected player
    const thePlayer = player.findBySid(socket.id)
    const theTeam = player.getTeam(socket.id)

    if (!thePlayer || !theTeam) {
      return
    }

    console.log(`${thePlayer.name} disconnected from ${theTeam.name}`)

    // Remove player from room variable
    team.removePlayer(socket.id, theTeam.name)

    // Send endGame event if the game had started
    if (theTeam.state === "inGame") {
      team.changeState(theTeam.name, "endGame")
    }

    // Send updated room data to all players in the room
    io.to(theTeam).emit("roomData", {
      users: team.getPlayers(theTeam.name),
    })

    // Send a chat message when a user disconnects
    io.to(theTeam.name).emit(
      "message",
      `${thePlayer.name} lämnade spelet.`,
      "Server"
    )
  })
})

httpServer.listen(port, () => {
  console.log("Server is runnig on port " + port)
})
