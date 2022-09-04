import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import axios from "axios"
import { Grid } from "./Grid"

export function SavedGames() {
  const navigate = useNavigate()
  const backBtn = () => {
    navigate("/")
  }

  //fetch images to render
  const [imageData, setImageData] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/api")
      .then((response) => {
        // console.log(response.data)
        setImageData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  //TODO: render images + teamname + results
  console.log(imageData)

  return (
    <div className="flex flex-col m-20 justify-center">
      <button onClick={backBtn} className="m-2 self-start">
        <FontAwesomeIcon icon="fa-solid fa-angle-left" /> Tillbaka
      </button>

      <div className="flex flex-wrap gap-5 m-auto">
        {imageData &&
          imageData.map((image) => (
            <div>
              <div
                className="border rounded-xl overflow-clip bg-white w-36 h-36"
                key={image._id}
              >
                <Grid color={image.pixelData} border={false} />
              </div>
              <h2 className="text-sm font-medium">Lag: {image.teamName}</h2>
              <p className="text-sm">Procent rätt: {image.percentCorrect}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
