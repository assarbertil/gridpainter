import {useEffect} from "react"
import {socket } from "../lib/socket"

export const useSocket = ( eventName, callback) => {
  useEffect(() => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    }
  } , [callback]);
}

