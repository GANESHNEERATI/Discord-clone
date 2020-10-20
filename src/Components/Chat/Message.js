import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ message, timestamp, user }) {
  return (
    <div className="message">
      <Avatar src={user.photo} alt="GA" />
      <div className="message__info">
        <h4>
          {user.disPlayName}
          <span className="message__timestamp">
            {new Date(parseInt(timestamp)).toDateString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
