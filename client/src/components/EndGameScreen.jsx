import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog } from "@headlessui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../hooks/useSocket.js"
import { socket } from "../lib/socket"
import { Button } from "./Button"
import { Grid } from "./Grid"

export const EndGameScreen = ({ pixels, answerPixels }) => {
  const [isOpen, setIsOpen] = useState(false) // Controls the modal open/close state
  const navigate = useNavigate() // Used to navigate back to the home page
  const [percentCorrect, setPercentCorrect] = useState({})
  const [countCorrect, setCountCorrect] = useState({})
  const [duration, setDuration] = useState(0) // Time in seconds the game took
  const [playerDisconnected, setPlayerDisconnected] = useState(false) // Tells if the game ended because a player disconnected

  useSocket("endGame", (percentCorrect, countCorrect, gameDuration) => {
    if (!percentCorrect || !countCorrect || !gameDuration) {
      setPlayerDisconnected(true)
    }

    setPercentCorrect(percentCorrect)
    setCountCorrect(countCorrect)
    setDuration(gameDuration)

    setIsOpen(true)
  })

  // Handles the save image button
  const saveImage = () => {
    socket.emit("saveImage")
    navigate("/savedgames")
  }

  // Handles go back to home button
  const startPage = () => {
    navigate("/")
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        navigate("/")
        socket.disconnect()
      }}
    >
      <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />

      <Dialog.Panel className="fixed flex-col inset-0 m-auto flex items-center justify-center p-4 w-[36rem] h-[36rem] border bg-sky-50 rounded-xl  z-50 border-sky-300">
        <Dialog.Title className="mb-4 text-lg font-semibold">
          Resultat:{" "}
          <div className="inline text-xl">
            {percentCorrect > 0 && (
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className="text-amber-500"
              />
            )}
            {percentCorrect >= 20 && (
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className="text-amber-500"
              />
            )}
            {percentCorrect >= 40 && (
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className="text-amber-500"
              />
            )}
            {percentCorrect >= 60 && (
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className="text-amber-500"
              />
            )}
            {percentCorrect >= 80 && (
              <FontAwesomeIcon
                icon="fa-solid fa-star"
                className="text-amber-500"
              />
            )}
          </div>
        </Dialog.Title>

        {!playerDisconnected && (
          <>
            <div>
              <span className="font-semibold">Procent rätt: </span>
              {percentCorrect}%
            </div>
            <div>
              <span className="font-semibold">Antal rätt: </span>
              {countCorrect}
            </div>
            <div>
              <span className="font-semibold">Tid: </span>
              {duration} sekunder
            </div>
          </>
        )}

        {playerDisconnected && <p>Spelet avslutades oväntat</p>}

        <div className="grid m-4 grid-cols-[repeat(2,_8rem)] h-32 gap-x-4">
          <Grid color={pixels} border={false} />
          <Grid color={answerPixels} border={false} />
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {!playerDisconnected && (
            <Button onClick={saveImage}>Spara resultat</Button>
          )}
          <Button onClick={startPage}>Till startsidan</Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
