import { useNavigate } from "react-router-dom"

export function SavedGames() {
    const navigate = useNavigate()

    const backBtn = () => {
        navigate("/")
      }

  return (
    <div>
      <button onClick={backBtn} className="w-40 rounded h-11 bg-sky-300">Tillbaka</button>
    </div>
  )
}
