import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import axios from "axios";
import dotenv from "dotenv";
import Pusher from "pusher-js";

dotenv.config();

const pusher = new Pusher("20680d91c406ecf001bd", {
  cluster: "ap2",
});

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const getConversation = (selectChannelId) => {
    if (channelId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/get/conversation?id=${channelId}`
        )
        .then((res) => {
          setMessages(res.data[0].conversation);
        });
    }
  };

  //getConversation(channelId);

  useEffect(() => {
    getConversation(channelId);

    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
      getConversation(channelId);
    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/new/message?id=${channelId}`,
      {
        message: input,
        timestamp: Date.now(),
        user: user,
      }
    );
    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            key={message._id}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message # ${channelName}`}
          />
          <button
            onClick={sendMessage}
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
