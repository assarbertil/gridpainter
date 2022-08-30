import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Button } from "./Button"
import { useSocket } from "../hooks/useSocket.js"
import { useNavigate } from "react-router-dom"

export const EndGameScreen = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useSocket("endGame", () => setIsOpen(true))

  return (
    <Dialog open={isOpen} onClose={() => navigate("/")}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <Dialog.Panel className="fixed flex-col inset-0 m-auto flex items-center justify-center p-4 w-[32rem] h-[32rem] border bg-sky-50 rounded-xl border-sky-300">
        <Dialog.Title>Resultat</Dialog.Title>

        {/* Stjärnor
          procent rätt
          2bilder */}

        <Button>Spara resultat</Button>
      </Dialog.Panel>
    </Dialog>
  )
}
