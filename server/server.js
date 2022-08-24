const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://gridpainter.vercel.app"],
    credentials: true,
  },
});

const port = 3001;

app.use("/", express.static("./client"));

io.on("connection", (socket) => {
  console.log("socket is connected");

  socket.on("join", (team, userName) => {
    // socket.emit(socket.id);
    console.log(team, userName);
    socket.join(team);
  });

  // socket.on("userInfo", (userName, team) => {
  //   console.log(x, y);
  // });

  socket.on("addColor", (x, y) => {
    console.log(x, y);
  });

  socket.on("message", (inputChat, inputUsername, inputTeam) => {
    console.log(
      "Spelare:",
      inputUsername,
      " skrev:",
      inputChat,
      " till lag:",
      inputTeam
    );
    io.in(inputTeam).emit("message", inputChat, inputUsername);
  });

  socket.to("others").emit("an event", { some: "data" });

  socket.on("disconnect", () => {
    console.log("socket has disconnected..");
  });
});

http.listen(port, () => {
  console.log("Server is runnig on port " + port);
});
