import { useEffect, useState } from "react"
import { useStopwatch } from "react-timer-hook"
import { useUserDetails } from "../context/UserDetailsContext.js"
import { empty } from "../empty.js"
import { socket } from "../lib/socket.js"
import { Button } from "./button.js"
import { Chat } from "./chat"
import { Grid } from "./grid"
import { NameList } from "./nameList.js"

export function Main() {
  const [color, setColor] = useState(() => empty)
  const [userDetails, setUserDetails] = useUserDetails()
  const { seconds, minutes, hours, isRunning, start, reset } = useStopwatch({
    autoStart: false,
  })

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("addColor", (x, y, team) => {
      const newColor = [...color]
      newColor[y][x] = "#0f0"

      setColor(newColor)
    })

    return () => socket.off("addColor")
  }, [])

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("startGame", (x, y, team) => {
      reset()
      start()
    })

    return () => socket.off("startGame")
  }, [])

  function handleClick(x, y) {
    console.log(x, y)
    socket.emit("addColor", x, y, userDetails.team)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-between items-center w-[32rem]">
        <div className="mb-3 text-xl font-medium">Gridpainter</div>
        {/* Change button */}
        <div className="text-xs font-medium">
          {minutes > 0 && <>{minutes} minuter</>}
          {seconds} sekunder <Button>Klar</Button>
        </div>
      </div>
      <div className="grid grid-cols-[16rem_32rem_16rem] grid-rows-2 gap-12">
        <div className="bg-white row-span-2 w-64 h-[32rem] rounded-xl border border-sky-300 shadow-md">
          <Chat
            inputUsername={userDetails.username}
            inputTeam={userDetails.team}
          ></Chat>
        </div>
        <div className="bg-white row-span-2 h-[32rem] w-[32rem] rounded-xl border border-sky-300 shadow-md">
          <Grid color={color} onClick={handleClick}></Grid>
        </div>
        <div className="w-64 bg-white border shadow-md rounded-xl border-sky-300">
          Results
        </div>
        <div className="w-64 bg-white border shadow-md rounded-xl border-sky-300">
          <NameList />
        </div>
      </div>
    </div>
  )
}
