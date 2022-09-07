export const handleChatMessage = (socket, io, t) => {
  // Handles chat messages
  socket.on("message", (inputChat, inputUsername, inputTeam) => {
    console.log(`Chat: [${inputTeam}] ${inputUsername}: ${inputChat}`)

    io.in(inputTeam).emit("message", inputChat, inputUsername, socket.id)
  })
}
