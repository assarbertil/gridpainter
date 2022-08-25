import { useEffect, useState } from "react"
import { socket } from "../lib/socket"

export const NameList = () => {
  const [names, setNames] = useState([])

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("roomData", users => {
      setNames(users)
    })

    return () => socket.off("roomData")
  }, [])

  return (
    <div>
      <ul>
        {names?.users &&
          names.users.map((user, index) => (
            <li key={`${index}:${user.username}`}>{user.username}</li>
          ))}
      </ul>
    </div>
  )
}
