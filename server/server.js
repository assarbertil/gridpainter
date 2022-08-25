const express = require("express")
const getUsersInRoom = require("./utils/getUsersInRoom")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
    credentials: true,
  },
})

const port = 3001

const rooms = {}

app.use("/", express.static("./client"))

io.on("connection", socket => {
  console.log("socket is connected")

  socket.on("join", (team, username) => {
    // Create a room if it doesn't exist
    // Join a room if it exists
    if (rooms[team] === undefined) {
      rooms[team] = {
        status: "preGame",
        players: [],
      }
      rooms[team].players.push({ sid: socket.id, username })
    } else {
      rooms[team].players.push({ sid: socket.id, username })
    }

    // socket.emit(socket.id);
    console.log(team, username)
    socket.join(team)

    // Send room data with user list when someone joins
    io.to(team).emit("roomData", {
      users: rooms[team].players,
    })

    // Start the game when four players are in the room
    if (rooms[team].players.length === 4) {
      rooms[team].status = "inGame"
      io.to(team).emit("startGame", ["#f00", "#0f0", "#00f", "#ff0"])
    }
  })

  // socket.on("userInfo", (userName, team) => {
  //   console.log(x, y);
  // });

  // When a player adds a color, send it to the other players in the room
  socket.on("addColor", (x, y, team) => {
    console.log(x, y, team)
    io.in(team).emit("addColor", x, y)
  })

  // Handles chat messages
  socket.on("message", (inputChat, inputUsername, inputTeam) => {
    console.log(
      "Spelare:",
      inputUsername,
      " skrev:",
      inputChat,
      " till lag:",
      inputTeam
    )

    io.in(inputTeam).emit("message", inputChat, inputUsername)
  })

  // Handles player disconnection
  socket.on("disconnect", reason => {
    console.log("socket has disconnected..")

    // Remove player from room variable
    Object.entries(rooms).forEach(([teamName, teamData]) => {
      const newRoom = teamData.players.filter(user => user.sid !== socket.id)

      rooms[teamName] = {
        // Set status to endGame only if the room is currently in a game
        status:
          rooms[teamName].status === "inGame"
            ? "endGame"
            : rooms[teamName].status,
        players: newRoom,
      }

      io.to(teamName).emit("roomData", {
        users: rooms[teamName].players,
      })

      // Send a chat message when a player disconnects
      const user = teamData.players.find(user => user.sid === socket.id)
      if (user) {
        io.to(teamName).emit(
          "message",
          `${user.username} lämnade spelet.`,
          "Server"
        )
      }
    })

    // If a player leaves a team with status inGame, stop the game
    const team = Object.entries(rooms).find(([teamName, teamData]) => {
      console.log([teamName, teamData])
      return teamData.players.some(user => {
        console.log(user)
        return user.sid === socket.id
      })
    })
    console.log(team)
    // const [teamName, teamData] = team

    // if (team.status == "inGame") {
    //   io.to(teamName).emit("stopGame")
    // }
  })
})

http.listen(port, () => {
  console.log("Server is runnig on port " + port)
})
