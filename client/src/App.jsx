import React, { useState } from "react";
import Home from "./Components/Home/Home";
import ChatPage from "./Components/Chat-Page/ChatPage";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [userName, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [screen, setScreen] = useState(false);

  return (
    <>
      {!screen ? (
        <Home
          userName={userName}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          screen={screen}
          setScreen={setScreen}
          socket={socket}
        />
      ) : (
        <ChatPage socket={socket} userName={userName}  room={room}  />
      )}
    </>
  );
};

export default App;
