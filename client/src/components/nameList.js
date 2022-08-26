import { useEffect, useState } from "react"
import { socket } from "../lib/socket"

export const NameList = () => {
  const [players, setPlayers] = useState([])

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("roomData", ({ players }) => {
      setPlayers(players)
      console.log(players)
    })

    return () => socket.off("roomData")
  }, [])

  return (
    <div>
      <ul>
        {players &&
          players.map((user, index) => (
            <li key={`${index}:${user.name}`}>{user.name}</li>
          ))}
      </ul>
    </div>
  )
}
