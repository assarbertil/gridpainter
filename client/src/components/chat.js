import React, { useState, useEffect } from "react"
import { socket } from "../lib/socket.js"

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
      <div>Chat</div>
      <ul className="chatOutput">
        {chatOutput.map(({ username, message }, index) => (
          <li key={index}>
            {username}: {message}
          </li>
        ))}
      </ul>

      <input value={inputChat} onChange={saveChat} placeholder="chat" />
      <button type="submit" onClick={chatSubmit}>
        SKICKA　
      </button>
    </>
  )
}
