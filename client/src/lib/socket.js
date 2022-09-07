import { io } from "socket.io-client"

// Shared socket instance
export const socket = io(
  process.env.NODE_ENV === "development"
    ? "ws://localhost:3001"
    : "wss://gridpainter.onrender.com",
  { autoConnect: false }
)

if (process.env.NODE_ENV === "development") {
  socket.onAny((event, ...args) => {
    console.log(`Tog emot event ${event}`, args)
  })
}
