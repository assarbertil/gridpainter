import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Button } from "./Button"
import { useSocket } from "../hooks/useSocket.js"
import { useNavigate } from "react-router-dom"
import { socket } from "../lib/socket"
import { Grid } from "./Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const EndGameScreen = ({ pixels, answerPixels }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [percentCorrect, setPercentCorrect] = useState({})
  const [countCorrect, setCountCorrect] = useState({})
  const [duration, setDuration] = useState(0)
  const [playerDisconnected, setPlayerDisconnected] = useState(false)

  useSocket("endGame", (percentCorrect, countCorrect, gameDuration) => {
    console.log(percentCorrect, countCorrect, gameDuration)

    if (!percentCorrect || !countCorrect || !gameDuration) {
      setPlayerDisconnected(true)
    }


    setPercentCorrect(percentCorrect)
    setCountCorrect(countCorrect)
    setDuration(gameDuration)

    setIsOpen(true)
  })

  const saveImage = () => {
    socket.emit("saveImage")
    navigate("/savedgames")
    console.log("Save image")

    
  }
  const  startPage = () => {
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

      <Dialog.Panel className="fixed flex-col inset-0 m-auto flex items-center justify-center p-4 w-[32rem] h-[32rem] border bg-sky-50 rounded-xl  z-50 border-sky-300">
        <Dialog.Title className="mb-4 text-lg font-semibold">Resultat: <div className="inline text-xl">
              {percentCorrect > 0 && <FontAwesomeIcon icon="fa-solid fa-star" className="text-amber-500" />}
              {percentCorrect >= 20 && <FontAwesomeIcon icon="fa-solid fa-star" className="text-amber-500" />}
              {percentCorrect >= 40 && <FontAwesomeIcon icon="fa-solid fa-star" className="text-amber-500" />}
              {percentCorrect >= 60 && <FontAwesomeIcon icon="fa-solid fa-star" className="text-amber-500" />}
              {percentCorrect >= 80 && <FontAwesomeIcon icon="fa-solid fa-star" className="text-amber-500" />}
            </div></Dialog.Title>

        {!playerDisconnected && (
          <>
            
            <div><span className="font-semibold">Procent rätt: </span>{percentCorrect}%</div>
            <div><span className="font-semibold">Antal rätt: </span>{countCorrect}</div>
            <div><span className="font-semibold">Tid: </span>{duration} sekunder</div>
          </>
          )
        }

        {playerDisconnected && (<p>Spelet avslutades oväntat</p>)}

        <div className="grid m-4 grid-cols-[repeat(2,_8rem)] h-32 gap-x-4">
          <Grid color={pixels} border={false} />
          <Grid color={answerPixels} border={false} />
        </div>

        <div className="flex flex-col gap-2 mt-1">
        {!playerDisconnected && <Button onClick={saveImage}>Spara resultat</Button>}
        <Button onClick={startPage}>Till startsidan</Button>
        </div>
       
      </Dialog.Panel>
    </Dialog>
  )
}
