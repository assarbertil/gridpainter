import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function SavedGames() {
    const navigate = useNavigate()

    const backBtn = () => {
        navigate("/")
      }

  return (
    <div>
      <button onClick={backBtn}><FontAwesomeIcon icon="fa-solid fa-angle-left" /> Tillbaka</button>
    </div>
  )
}
