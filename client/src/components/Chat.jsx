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
    socket.on("message", (message, username, team) => {
      setChatOutput((current) => [...current, { username, message }])
      console.log(`[${team}] ${username}: ${message}`)
    })

    return () => socket.off("message")
  }, [])

  const messagesEndRef = useRef(null)

  // Scroll when chat updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatOutput])

  return (
    <section className="flex h-full flex-col justify-between bg-sky-50 border border-sky-300 rounded-lg">
      <ul id="chat-area" className="overflow-y-auto h-full px-2">
        {chatOutput.map(({ username, message }, index) => (
          <li key={index}>
            <span className="text-gray-400">{username}: </span>
            <span className="break-words">{message}</span>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <form
        onSubmit={chatSubmit}
        className="border-t-2 border-sky-300 h-12 flex-none px-2 py-3 bg-sky-100 flex rounded-b-lg items-center"
      >
        <input
          className="bg-sky-100 outline-none flex-grow flex-1 w-3 break-words"
          value={inputChat}
          onChange={saveChat}
          placeholder="chat..."
        />
        <button
          className="ml-4 bg-blue-400 hover:bg-sky-300 rounded-full h-9 w-9 flex-none"
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
