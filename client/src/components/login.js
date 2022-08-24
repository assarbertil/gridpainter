import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../lib/socket.js";

export function Login() {
  const [DisabledBtn, setDisabledBtn] = useState(true);
  const [InputUsername, setInputUsername] = useState("");
  const [InputTeam, setInputTeam] = useState("");

  const navigate = useNavigate();

  // making button enabled
  useEffect(() => {
    if (InputUsername !== "" && InputTeam !== "") {
      setDisabledBtn(false);
    } else if (InputUsername === "" && InputTeam === "") setDisabledBtn(true);
  }, [InputUsername && InputTeam]);

  // Save inputvalues
  const saveUsername = (e) => {
    setInputUsername(e.target.value);
  };
  const saveTeam = (e) => {
    setInputTeam(e.target.value);
  };

  // Sending info to socket
  const sendUserInfo = () => {
    socket.connect();
    socket.emit("join", { InputTeam }, { InputUsername });

    navigate("/main");
  };

  return (
    <div className="flex items-center justify-center h-screen gap-x-16">
      <form className="flex flex-col items-center pt-10 pb-24 border shadow-md rounded-xl bg-sky-50 px-14 border-sky-300 gap-y-5">
        <h3 className="flex font-medium">Logga in</h3>

        <div className="flex flex-col gap-y-2 ">
          <label htmlFor="asdasdasd">Användarnamn :</label>
          <input
            value={InputUsername}
            onChange={saveUsername}
            className="px-4 border rounded h-11 border-sky-300"
          />
        </div>

        <div className="flex flex-col gap-y-2 ">
          <label>Lagnamn :</label>
          <input
            value={InputTeam}
            onChange={saveTeam}
            className="px-4 border rounded h-11 border-sky-300"
          />
        </div>

        <button
          disabled={DisabledBtn}
          onClick={sendUserInfo}
          className="w-full rounded h-11 bg-sky-300"
        >
          Spela
        </button>
      </form>

      <div>
        <h2 className="mb-5 font-medium">Välkommen till Gridpainter</h2>
        <h3>Så här spelar du : </h3>
        <ul>
          <li>Välj ett användar namn och lag</li>
          <li>Du får en färg som du ska måla med genom att...</li>
          <li>Tänk på tiden, du får ...</li>
        </ul>
      </div>
    </div>
  );
}
