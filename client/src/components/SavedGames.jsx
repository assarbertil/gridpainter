import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"
import axios from "axios"
import { Grid } from "./Grid"

const siteUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://gridpainter.onrender.com"

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
      .get(`${siteUrl}/api`)
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
      .get(`${siteUrl}/api/facit`)
      .then((response) => {
        // console.log(response.data)
        setFacitData(response.data)
      })
      .catch((error)=> {
        console.log(error)
      })
  }, [])


  return (
    <div className="container flex flex-col justify-center m-20 mx-auto">
      <button onClick={backBtn} className="self-start m-2">
        <FontAwesomeIcon icon="fa-solid fa-angle-left" /> Tillbaka
      </button>

      <h1 className="py-8 text-xl font-medium text-center">Facit</h1>
      <div className="flex flex-wrap gap-5 m-auto">
        {facitData &&
          facitData.map((facit) => (
            <div key={facit._id}>
              <div
                className="bg-white border rounded-xl overflow-clip w-36 h-36"
                
              >
                <Grid color={facit.pixelData} border={false} />
              </div>
            </div>
          ))}
      </div>


      <h1 className="py-8 text-xl font-medium text-center">Bilder</h1>
      <div className="flex flex-wrap gap-5 m-auto">
        {imageData &&
          imageData.map((image) => (
            <div key={image._id}>
              <div
                className="bg-white border rounded-xl overflow-clip w-36 h-36"
                
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
