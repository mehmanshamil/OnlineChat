import "./Home.css";

const Home = ({ userName, setUsername, room, setRoom, setScreen, socket }) => {
  const sendRoom = () => {
    if (userName.length == 0 || room.length == 0) {
      alert("zehmet olmasa melumatlari doldurun");
      return;
    }
    socket.emit("room", room)
    setScreen(true)
  };

  return (
    <section className="roomWelcome">
      <h1>Welcome Chatting ...</h1>

      <form action="#">
        <h2>Please enter Information</h2>
        <input
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          required
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          type="text"
          placeholder="Room ID"
          required
        />
        <button onClick={sendRoom}>CHAT !!!</button>
      </form>
    </section>
  );
};

export default Home;
