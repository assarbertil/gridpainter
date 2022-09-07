import { useEffect } from "react"
import { socket } from "../lib/socket"

// Adds socket eventlistener on mount and removes it on unmount
// Takes a socket event string and a callback function as arguments
export const useSocket = (eventName, callback) => {
  useEffect(() => {
    // This adds the event listener
    socket.on(eventName, callback)

    // This removes the event listener
    return () => {
      socket.off(eventName, callback)
    }
  }, [callback])
}
