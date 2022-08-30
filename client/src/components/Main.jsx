import { useState } from "react"
import { useStopwatch } from "react-timer-hook"
import { useUserDetails } from "../context/UserDetailsContext.js"
import { empty } from "../empty.js"
import { useSocket } from "../hooks/useSocket"
import { socket } from "../lib/socket.js"
import { Button } from "./Button.jsx"
import { Chat } from "./Chat"
import { EndGameScreen } from "./EndGameScreen.jsx"
import { Grid } from "./Grid"
import { NameList } from "./NameList.jsx"

export function Main() {
  const [pixels, setPixels] = useState(() => empty.imageData)
  const [playerColor, setPlayerColor] = useState("")
  const [userDetails, setUserDetails] = useUserDetails()
  const { seconds, minutes, hours, isRunning, start, reset } = useStopwatch({
    autoStart: false,
  })
  const [btnText, setBtnText] = useState("Starta")
  const [answerPixels, setAnswerPixels] = useState(() => empty.imageData)

  // Add event listener on mount and remove it on unmount
  useSocket("addPixel", (x, y, color) => {
    const newColor = [...pixels]
    newColor[y][x] = color

    setPixels(newColor)
  })

  useSocket("startGame", (colors, pixelData) => {
    // Reset stopwatch
    reset()
    start()

    // Change button text
    setBtnText("Klar")

    // Receive colors here and set each players individual color
    const individualColor = colors.find(color => color.sid === socket.id)
    setPlayerColor(individualColor.color)

    setAnswerPixels(pixelData)
  })

  function handleClick(x, y) {
    console.log("Klick på:", { x, y })

    socket.emit("addPixel", x, y, playerColor)
  }

  function handleStart() {
    socket.emit("startGame")
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-between items-center w-[32rem]">
          <div className="mb-3 text-xl font-medium">Gridpainter</div>

          <div className="text-xs font-medium">
            {minutes > 0 && <>{minutes} minuter</>}
            {seconds} sekunder <Button onClick={handleStart}>{btnText}</Button>
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
            <Grid color={pixels} onClick={handleClick}></Grid>
          </div>
          <div className="flex items-center justify-center w-64 p-2 bg-white border shadow-md rounded-xl border-sky-300">
            <div className="w-[12rem] h-[12rem] border border-sky-900">
              <Grid color={answerPixels} border={false} />
            </div>
          </div>
          <div className="w-64 bg-white border shadow-md rounded-xl border-sky-300">
            <NameList />
          </div>
        </div>
      </div>

      <EndGameScreen />
    </>
  )
}
