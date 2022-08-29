import React, { useState, useEffect} from "react"
import { socket } from "../lib/socket.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Chat({ inputUsername, inputTeam }) {
  const [inputChat, setInputChat] = useState("")
  const [chatOutput, setChatOutput] = useState([])

  //save input chat message
  const saveChat = (e) => {
    setInputChat(e.target.value)
  }

  //click chat button
  const chatSubmit = () => {
    socket.emit("message", inputChat, inputUsername, inputTeam)
    // console.log(inputChat, inputUsername, inputTeam);
    setInputChat("")
  }

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("message", (message, username, team) => {
      setChatOutput((current) => [...current, { username, message }])

      console.log(`[${team}] ${username}: ${message}`)
    })

    return () => socket.off("message")
  }, [])

  return (
    <>
      <div className="relative h-[32rem]  bg-red-400">Chat
        <ul className="overflow-auto h-[28rem]  ">
          {chatOutput.map(({ username, message }, index) => (
            <li key={index}>
              {username}: {message}
            </li>
          ))}
        </ul>

        <div className="absolute inset-x-0 bottom-0 h-8 bg-green-700" >
          <input value={inputChat} onChange={saveChat} placeholder="chat" />
          <button type="submit" onClick={chatSubmit}>
          <FontAwesomeIcon icon="fa-solid fa-paper-plane bg-sky-50 border-sky-300" />
          </button>
        </div>
      </div>
    </>
  )
}
