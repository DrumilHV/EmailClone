import React from "react";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import Mails from "./components/Mails";
import Mail from "./components/Mail";
import Send from "./components/Send";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

const isAuthenticated = () => {
  // Check if a token is stored in localStorage
  const storedToken = localStorage.getItem("token");
  return !!storedToken; // Returns true if a token exists, false otherwise
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/mails"
              element={
                isAuthenticated() ? <Mails /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/mail/:id"
              element={isAuthenticated() ? <Mail /> : <Navigate to="/signin" />}
            />
            <Route path="/send" element={<Send />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
