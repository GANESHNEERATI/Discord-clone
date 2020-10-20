import React, { useEffect } from "react";

import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Chat from "./Components/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./Components/Login/Login";
import { login, logout } from "./features/userSlice";

import { auth } from "./firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user loged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            disPlayName: authUser.displayName,
          })
        );
      } else {
        //user logedout
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <React.Fragment>
          <Sidebar />
          <Chat />
        </React.Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
