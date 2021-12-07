import UserHome from "./components/User/UserHome";
import HostHome from "./components/Host/HostHome";
import ViewDetails from "./components/Host/ViewDetails";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import AddEvent from "./components/Host/AddEvent";
import React from "react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [host, setHost] = useState("");
  const [evid, setEvid] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home user={user} setUser={setUser} host={host} setHost={setHost} />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/user"
          element={<UserHome user={user} setUser={setUser} />}
        />
        <Route
          path="/host"
          element={<HostHome host={host} setHost={setHost} setEvid={setEvid} />}
        />
        <Route path="/addevent" element={<AddEvent host={host} />} />
        <Route
          path="/viewdetails"
          element={<ViewDetails host={host} evid={evid} />}
        />
      </Routes>
    </div>
  );
}

export default App;
