import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3001");
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
    <div>
      <div>
        <h3>Logga in</h3>
        <label>
          Användarnamn :
          <input value={InputUsername} onChange={saveUsername} />
        </label>
        <label>
          Lagnamn :
          <input value={InputTeam} onChange={saveTeam} />
        </label>
        <button disabled={DisabledBtn} onClick={sendUserInfo}>
          Spela
        </button>
      </div>
      <div>
        <h2>Välkommen till Gridpainter</h2>
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
