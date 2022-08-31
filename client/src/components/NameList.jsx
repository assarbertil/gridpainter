import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export const NameList = ({ colors }) => {
  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [colorDiv, setColorDiv] = useState([]);
  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    socket.on("roomData", ({ teamName, players }) => {
      setPlayers(players);
      setTeamName(teamName);
      console.log(players);
    });

    return () => socket.off("roomData");
  }, []);

  console.log(colors);
  return (
    <div>
      <h2 className="pb-[1rem] font-medium">Lag: {teamName}</h2>
      <ul>
        {players &&
          players.map((player, index) => (
            <li
              key={`${index}:${player.name}`}
              className="flex flex-row justify-between font-medium pb-1"
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
              <div>res</div>
            </li>
          ))}
      </ul>
    </div>
  );
};
