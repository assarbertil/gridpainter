import React, { useState, useEffect, useRef} from "react"
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
    setInputChat("")
  }

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("message", (message, username, team) => {
      setChatOutput((current) => [...current, { username, message }])
      console.log(`[${team}] ${username}: ${message}`)
    });

      //Try1: scroll to the end of the chat. but doesn't work. tomorrow.
      // let chatArea = document.getElementById('chat-area'),
      // chatAreaHeight = chatArea.scrollHeight;
      // //chatArea.scrollTop = chatAreaHeight;
      // chatArea.scrollTop(0, chatArea.scrollHeight)

      return () => socket.off("message");

      // //Try2: scroll to the end of the chat. but doesn't work. tomorrow.
      // const messagesEndRef = useRef(null)
      // const scrollToBottom = () => {
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      //}
 
  }, [])

  // useEffect(scrollToBottom, [chatOutput]);

  {/* chatText.scrollTo(0, chatText.scrollHeight) */}

  return (
    <>
      <section className="relative h-[32rem] bg-sky-50 pl-2 border border-sky-300 rounded-lg">
        <div>
          <p>Chat</p>
          <ul id="chat-area" className="overflow-y-auto h-[24rem] max-w-md">
            {chatOutput.map(({ username, message }, index) => (
              <li key={index} >
                <span className="text-gray-400 ">{username}: </span> 
                <span >{message}</span>
              </li>
           ))}
          </ul>
          {/* <div ref={messagesEndRef} /> */}
        </div>
        
        <div className="absolute inset-x-0 bottom-0  border-t-2 border-sky-300  px-2 py-3 bg-sky-100 inline-flex " >
            <input className="bg-sky-100 outline-none flex-grow flex-1 w-3" value={inputChat} onChange={saveChat} placeholder="chat..." />
            <button className="ml-4 bg-blue-400 hover:bg-sky-300 rounded-full h-9 w-9 flex-none flex-1 " type="submit" onClick={chatSubmit}>
            <FontAwesomeIcon icon="fa-regular fa-paper-plane" className="text-xl"/>
            </button>
        </div>
      </section> 
    </>
  );
}
