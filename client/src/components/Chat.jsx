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
      <div className="relative h-[32rem] bg-sky-50 pl-2">
        <p>Chat</p>
        <ul className="overflow-auto h-[28rem] max-w-md mx-auto ... ">
          {chatOutput.map(({ username, message }, index) => (
            <li key={index}>
             <span className="text-gray-500">{username}: </span> {message}
            </li>
          ))}
        </ul>

        {/* chatText.scrollTo(0, chatText.scrollHeight) */}

        {/*TODO: Remove borders from input fields and increase plane font size */}
        <div className="absolute inset-x-0 bottom-0  border-t border-b px-2 py-3 bg-sky-100" >
          <input className="bg-sky-100 outline-none" value={inputChat} onChange={saveChat} placeholder="chat..." />
          <button className="ml-4 bg-blue-400 rounded-full h-9 w-9" type="submit" onClick={chatSubmit}>
          <FontAwesomeIcon icon="fa-regular fa-paper-plane" className="text-xl"/>
          </button>
          
        </div>
      </div>
    </>
  )
}
