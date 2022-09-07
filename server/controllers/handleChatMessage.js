// Handles chat messages
export const handleChatMessage = (socket, io, t) => {
  socket.on("message", (inputChat, inputUsername, inputTeam) => {
    io.in(inputTeam).emit("message", inputChat, inputUsername, socket.id)
  })
}
