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

  console.log(names)

  return (
    <div>
      <ul>
        {names?.users && names.users.map(user => <li>{user.username}</li>)}
      </ul>
    </div>
  )
}
