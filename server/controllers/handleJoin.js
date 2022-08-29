import { empty } from "../empty.js"

export const handleJoin = (socket, io, t) => {
  socket.on("join", async (teamName, username) => {
    console.log(username, "joined", teamName)

    // Create a room if it doesn't exist
    // Join a room if it exists
    
    if (t.team.findByName(teamName) === undefined) {
      t.team.create(teamName)
    }


 
    // Check if player can join a team
    if (t.team.findByName(teamName).players.length < 4) {
      await socket.join(teamName)

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
  })
}