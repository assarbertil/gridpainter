import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../context/UserDetailsContext.js";
import { socket } from "../lib/socket.js";
import { useSocket } from "../hooks/useSocket.js";

export function Login() {
  const [DisabledBtn, setDisabledBtn] = useState(true);
  const [InputUsername, setInputUsername] = useState("");
  const [InputTeam, setInputTeam] = useState("");
  const [userDetails, setUserDetails] = useUserDetails();

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
  const sendUserInfo = (e) => {
    e.preventDefault();

    socket.connect();

    socket.emit("join", InputTeam, InputUsername);
  };

  useSocket("blockJoin", (isBlocked) => {
    console.log(isBlocked);
    if (!isBlocked) {
      setUserDetails({
        username: InputUsername,
        team: InputTeam,
      });

      console.log("Ska skickas vidare");
      navigate("/main");
    } else {
      console.log("Ska inte skickas vidare");
      alert("Rummet är redan fullt");
    }
  });


  useEffect(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  }, []);

  const savedGamesBtn = () => {
    navigate("/savedgames")
  }


  return (
    <div className="flex items-center justify-center h-screen gap-x-16">
      <form className="flex flex-col items-center pt-10 pb-24 border shadow-md rounded-xl bg-sky-50 px-14 border-sky-300 gap-y-5">
        <h3 className="flex font-medium">Logga in</h3>

        <div className="flex flex-col gap-y-2 ">
          <label htmlFor="asdasdasd">Användarnamn:</label>
          <input
            value={InputUsername}
            onChange={saveUsername}
            className="px-4 border rounded h-11 border-sky-300"
          />
        </div>

        <div className="flex flex-col gap-y-2 ">
          <label>Lagnamn:</label>
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
        <h2 className="mb-5 text-xl font-bold">Välkommen till Gridpainter</h2>
        <h3 className="mb-3 font-medium">Så här spelar du: </h3>
        <ul className="ml-5 text-sm list-disc">
          <li>Välj ett användarnamn och lag.</li>
          <li>Du skickas vidare till spelet där du blir tilldelad en färg.</li>
          <li>När 4 spelare är inne i spelet tryck på start.</li>
          <li>Dags att måla, försök göra så likt facit som möjligt.</li>
          <li>När ni är klara tryck på klar och se hur likt facit det blev.</li>
        </ul>
        <div className="flex items-center justify-center mt-6">
        <button onClick={savedGamesBtn} className="w-40 rounded h-11 bg-sky-300">Tidigare spel</button>
        </div>
      </div>
    </div>
  );
}
