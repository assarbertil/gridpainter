import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "./Button"

export const EndGameScreen = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Öppna</Button>

      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <Dialog.Panel className="fixed flex-col inset-0 m-auto flex items-center justify-center p-4 w-[32rem] h-[32rem] border bg-sky-50 rounded-xl border-sky-300">
            <Dialog.Title>Resultat</Dialog.Title>

            <button onClick={() => ""}>Spara resultat</button>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  )
}
