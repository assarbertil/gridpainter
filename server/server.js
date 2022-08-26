import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { Teams } from "./classes/Teams.js"
import {empty} from "./empty.js"

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
  socket.on("join", (teamName, username) => {
    console.log(username, "joined", teamName)

    // Create a room if it doesn't exist
    // Join a room if it exists
    
    if (t.team.findByName(teamName) === undefined) {
      t.team.create(teamName)
    }


 
    // Check if player can join a team
    if (t.team.findByName(teamName).players.length < 4) {
      socket.join(teamName)

      t.team.addPlayer(teamName, {
        sid: socket.id,
        name: username,
      })

      // Broadcast join message in chat
      io.to(teamName).emit(
        "message",
        `${username} gick med i spelet.`,
        "Server"
      )

      socket.emit("blockJoin", false)
    } else {
      console.log("Laget är fullt")
      socket.emit("blockJoin", true)
    }

    // Send room data with user list when someone joins
    io.to(teamName).emit("roomData", {
      players: t.team.getPlayers(teamName),
    })

    // Start the game when four players are in the room
    if (t.team.getPlayers(teamName).length === 4) {
      t.team.changeState(teamName, "inGame")


      // Send individual colors to players
      console.log("Should send colors")

      const players = t.team.getPlayers(teamName)
      const colors = players.map((player,index)=> ({
        sid: player.sid,
        color: empty.colors[index]
      }))
      
      socket.to(teamName).emit("playerColors", colors)
      
      io.to(teamName).emit("startGame")
    }


  })


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
