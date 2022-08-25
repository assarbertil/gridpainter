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
    if (rooms[team] !== undefined) {
      rooms[team].push({ sid: socket.id, username })
    } else {
      rooms[team] = []
      rooms[team].push({ sid: socket.id, username })
    }

    // socket.emit(socket.id);
    console.log(team, username)
    socket.join(team)

    io.to(team).emit("roomData", {
      users: rooms[team],
    })
  })

  // socket.on("userInfo", (userName, team) => {
  //   console.log(x, y);
  // });

  socket.on("addColor", (x, y, team) => {
    console.log(x, y, team)
    io.in(team).emit("addColor", x, y)
  })

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

  socket.on("disconnect", reason => {
    console.log("socket has disconnected..")
  })
})

http.listen(port, () => {
  console.log("Server is runnig on port " + port)
})
