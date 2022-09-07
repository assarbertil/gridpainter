import { useState } from "react"
import { useSocket } from "../hooks/useSocket"

export const NameList = ({ colors }) => {
  const [players, setPlayers] = useState([])
  const [teamName, setTeamName] = useState("")

  // Receives players and set them to state
  useSocket("roomData", ({ teamName, players }) => {
    setPlayers(players)

    setTeamName(teamName)
  })

  return (
    <div>
      <h2 className="pb-[1rem] font-medium">Lag: {teamName}</h2>
      <ul>
        {players &&
          players.map((player, index) => (
            <li
              key={`${index}:${player.name}`}
              className="flex flex-row justify-between pb-1 font-medium"
            >
              <div className="flex flex-row items-center">
                <div
                  style={{
                    backgroundColor: colors.length > 0 && colors[index].color,
                  }}
                  className={" h-[1rem] w-[1rem] rounded-full mr-[1rem]"}
                ></div>
                {player.name}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
