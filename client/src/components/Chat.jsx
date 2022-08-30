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
      <div className="relative h-[32rem]">Chat
        <ul className="overflow-auto h-[28rem]  ">
          {chatOutput.map(({ username, message }, index) => (
            <li key={index}>
              {username}: {message}
            </li>
          ))}
        </ul>

          {/*TODO: Remove borders from input fields and increase plane font size */}
        <div className="absolute inset-x-0 bottom-0 bg-blue-100 border-t border-b px-2 py-3 bg-sky-50" >
          <input className="bg-blue-100 border-none" value={inputChat} onChange={saveChat} placeholder="chat" />
          <button className="pl-4" type="submit" onClick={chatSubmit}>
          <FontAwesomeIcon icon="fa-regular fa-paper-plane" />
          </button>
        </div>
      </div>
    </>
  )
}
