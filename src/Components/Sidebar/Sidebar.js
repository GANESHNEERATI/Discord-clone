import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltTwoToneIcon from "@material-ui/icons/SignalCellularAltTwoTone";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import Tooltip from "@material-ui/core/Tooltip";
import dotenv from "dotenv";
import axios from "axios";
import Pusher from "pusher-js";

const pusher = new Pusher("20680d91c406ecf001bd", {
  cluster: "ap2",
});

dotenv.config();
function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const getChannels = () => {
    // console.log(process.env.REACT_APP_SERVER_URL);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/get/channelList`)
      .then((res) => {
        setChannels(res.data);
        //  console.log(channels);
        //console.log(res.data);
      });
  };
  useEffect(() => {
    getChannels();
    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannels();
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("enter a  new Channel name");
    if (channelName) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/new/channel`, {
          channelName: channelName,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Chat Buddy</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelList">
          {channels.map((channel) => (
            <SidebarChannel
              key={channel.id}
              id={channel.id}
              channel={channel.name}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltTwoToneIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceinfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Tooltip title="logout">
          <Avatar
            onClick={() => auth.signOut()}
            src={user.photo}
            alt="Ganesh"
          />
        </Tooltip>
        <div className="sidebar__profileInfo">
          <h3>{user.disPlayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
