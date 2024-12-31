import { useEffect, useState } from "react";
import "./Chat.css";
import { FaUserCircle } from "react-icons/fa";

const ChatPage = ({ socket, room, userName }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageContent = {
      userName: userName,
      message: message,
      room: room,
      date:
        new Date(Date.now()).getHours() +
        " : " +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);

    setMessage("");
  };

  console.log(messageList, "mesajlar");

  return (
    <section className="chat">
      <div className="head">
        <div className="image">
          <FaUserCircle />
        </div>
        <h2>User</h2>
      </div>
      <div className="container">
        <div className="chatting">
          {messageList &&
            messageList.map((user, i) => (
              <div
                key={i}
                className={` ${
                  userName === user.userName ? " me " : " other "
                } message `}
              >
                {user.message}
                <div>{user.userName} : {user.date}</div>
              </div>
            ))}
        </div>
        <form className="formSend">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="enter message"
          />
          <button onClick={sendMessage}>Send</button>
        </form>
      </div>
    </section>
  );
};

export default ChatPage;
