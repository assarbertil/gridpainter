import { io } from "socket.io-client"

export const socket = io(
  process.env.NODE_ENV === "development"
    ? "ws://localhost:3001"
    : "wss://gridpainter.onrender.com",
  { autoConnect: false }
)

socket.onAny((event, ...args) => {
  console.log(`Tog emot event ${event}`, args)
})

socket.on("userInfo", (team, userName) => {
  console.log("Loggade in i lag:", team, " med användarnamn:", userName)
})

socket.on("roomData", users => {
  console.log(users)
})
