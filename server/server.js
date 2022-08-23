const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
        credentials: true
    }
});

const port = 3001;

app.use("/", express.static("./client"));

io.on("connection", (socket) => {
  console.log("socket is connected");

  socket.on("join", (team, userName) => {
    console.log(team, userName);
    socket.join(team);
  });
  socket.on("disconnect", () => {
    console.log("socket has disconnected..");
  });
});

http.listen(port, () => {
  console.log("Server is runnig on port " + port);
});
