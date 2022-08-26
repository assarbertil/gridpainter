import { io } from "socket.io-client"

export const socket = io("ws://localhost:3001", {
  autoConnect: false,
})

socket.onAny((event, ...args) => {
  console.log(`Tog emot event ${event}`, args)
})

socket.on("userInfo", (team, userName) => {
  console.log("Loggade in i lag:", team, " med användarnamn:", userName)
})

socket.on("roomData", users => {
  console.log(users)
})
