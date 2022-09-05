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
  const [facitData, setFacitData] = useState([])

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/facit")
      .then((response) => {
        // console.log(response.data)
        setFacitData(response.data)
      })
      .catch((error)=> {
        console.log(error)
      })
  }, [])


  return (
    <div className="flex flex-col m-20 justify-center container mx-auto">
      <button onClick={backBtn} className="m-2 self-start">
        <FontAwesomeIcon icon="fa-solid fa-angle-left" /> Tillbaka
      </button>

      <h1 className="text-center font-medium text-xl py-8">Facit</h1>
      <div className="flex flex-wrap gap-5 m-auto">
        {facitData &&
          facitData.map((facit) => (
            <div key={facit._id}>
              <div
                className="border rounded-xl overflow-clip bg-white w-36 h-36"
                
              >
                <Grid color={facit.pixelData} border={false} />
              </div>
            </div>
          ))}
      </div>


      <h1 className="text-center font-medium text-xl py-8">Bilder</h1>
      <div className="flex flex-wrap gap-5 m-auto">
        {imageData &&
          imageData.map((image) => (
            <div key={image._id}>
              <div
                className="border rounded-xl overflow-clip bg-white w-36 h-36"
                
              >
                <Grid color={image.pixelData} border={false} />
              </div>
              <h2 className="text-sm font-medium">Lag: {image.teamName}</h2>
              <p className="text-sm">{image.percentCorrect} % rätt</p>
              <p className="text-sm">{image.duration} sekunder</p>
            </div>
          ))}
      </div>
    </div>
  )
}
