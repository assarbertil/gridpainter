import React, { useState, useEffect, useRef } from "react"
import { socket } from "../lib/socket.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function Chat({ inputUsername, inputTeam }) {
  const [inputChat, setInputChat] = useState("")
  const [chatOutput, setChatOutput] = useState([])

  //save input chat message
  const saveChat = (e) => {
    setInputChat(e.target.value)
  }

  //click chat button
  const chatSubmit = (e) => {
    e.preventDefault()
    if (inputChat.length > 0) {
      socket.emit("message", inputChat, inputUsername, inputTeam)
      setInputChat("")
    }
  }

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("message", (message, username, socketId) => {
      setChatOutput((current) => [...current, { username, message, socketId }])
      console.log(`${username}: ${message}`)
      console.log({socketId, sid: socket.id})
    })

    return () => socket.off("message")
  }, [])

  const messagesEndRef = useRef(null)

  // Scroll when chat updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatOutput])

  return (
    <section className="flex flex-col justify-between h-full border rounded-lg bg-sky-50 border-sky-300">
      <ul id="chat-area" className="h-full px-2 overflow-y-auto">
        {chatOutput.map(({ username, message, socketId }, index) => (
          <li key={index}>
            {username !== "Server" && <span className={`text-gray-400 ${socketId === socket.id ? "text-sky-600":""}`}>{username}: </span>}
            <span className={`break-words $ ${username === "Server" ? "text-red-600": ""}`}>{message}</span>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <form
        onSubmit={chatSubmit}
        className="flex items-center flex-none h-12 px-2 py-3 border-t-2 rounded-b-lg border-sky-300 bg-sky-100"
      >
        <input
          className="flex-1 flex-grow w-3 break-words outline-none bg-sky-100"
          value={inputChat}
          onChange={saveChat}
          placeholder="chat..."
        />
        <button
          className="flex-none ml-4 bg-blue-400 rounded-full hover:bg-sky-300 h-9 w-9"
          type="submit"
        >
          <FontAwesomeIcon
            icon="fa-regular fa-paper-plane"
            className="text-xl"
          />
        </button>
      </form>
    </section>
  )
}
