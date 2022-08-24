import { Grid } from "./grid";
import { Chat } from "./chat";
import { useState } from "react";
import { empty } from "../empty.js";
import { socket } from "../lib/socket.js";

function handleClick(x, y) {
  console.log(x, y);
  socket.emit("addColor", x, y);
}

export function Main() {
  const [color, setColor] = useState(() => empty);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-between items-center w-[32rem]">
        <div className="mb-3 text-xl font-medium">Gridpainter</div>
        {/* Change button */}
        <div className="text-xs font-medium">
          59 sekunder <button className="disabled:bg-red-500">Klar</button>
        </div>
      </div>
      <div className="grid grid-cols-[16rem_32rem_16rem] grid-rows-2 gap-12">
        <div className="bg-white row-span-2 w-64 h-[32rem] rounded-xl border border-sky-300 shadow-md">
          <Chat inputUsername="Steve" inputTeam="1"></Chat>
        </div>
        <div className="bg-white row-span-2 h-[32rem] w-[32rem] rounded-xl border border-sky-300 shadow-md">
          <Grid color={color} onClick={handleClick}></Grid>
        </div>
        <div className="bg-white w-64 rounded-xl border border-sky-300 shadow-md">
          Results
        </div>
        <div className="bg-white w-64 rounded-xl border border-sky-300 shadow-md">
          Names
        </div>
      </div>
    </div>
  );
}
