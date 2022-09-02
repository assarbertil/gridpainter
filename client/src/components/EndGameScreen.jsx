import React, { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Button } from "./Button"
import { useSocket } from "../hooks/useSocket.js"
import { useNavigate } from "react-router-dom"
import { socket } from "../lib/socket"
import { Grid } from "./Grid"

export const EndGameScreen = ({ pixels, answerPixels }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [percentCorrect, setPercentCorrect] = useState({})
  const [countCorrect, setCountCorrect] = useState({})

  useSocket("endGame", (percentCorrect, countCorrect) => {
    setPercentCorrect(percentCorrect)
    setCountCorrect(countCorrect)

    setIsOpen(true)
  })

  const saveImage = () => {
    console.log("Save image")

    socket.emit("saveImage")
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        navigate("/")
        socket.disconnect()
      }}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <Dialog.Panel className="fixed flex-col inset-0 m-auto flex items-center justify-center p-4 w-[32rem] h-[32rem] border bg-sky-50 rounded-xl border-sky-300">
        <Dialog.Title>Resultat</Dialog.Title>
        <div>* * * *</div>
        <div>Procent rätt: {percentCorrect}%</div>
        <div>Antal rätt: {countCorrect}</div>
        <div className="grid m-4 grid-cols-[repeat(2,_8rem)] h-32 gap-x-4">
          <Grid color={pixels} border={false} />
          <Grid color={answerPixels} border={false} />
        </div>

        <Button onClick={saveImage}>Spara resultat</Button>
        {/* knapp startsidan */}
      </Dialog.Panel>
    </Dialog>
  )
}
