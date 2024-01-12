import React, { useState } from "react";
import { Typography, FormControl, Button } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const formStyle = {
  minWidth: "100%",
  border: "2px solid balck",
  borderRadius: "10px",
  fontSize: "20px",
  fontFamily: "initial",
};

const Send = () => {
  const [dest, setDest] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const decodedUser = jwtDecode(token);
  const origin = decodedUser.user;
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  if (!origin) {
    alert("please Sign in !");
    navigate("/signin");
  }
  const handleSubmit = () => {
    const emialData = {
      origin: origin,
      to: dest,
      content: content,
    };
    const response = axios.post(`${BACKEND_URL}/send`, emialData);
    console.log(`${BACKEND_URL}/send`, response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography fontWeight={"bold"}>To:</Typography>
      <textarea
        style={formStyle}
        defaultValue={dest}
        onChange={(e) => setDest(e.target.value)}
        rows={1}
      />
      <Typography fontWeight={"bold"}>Content:</Typography>
      <textarea
        style={formStyle}
        defaultValue={content}
        onChange={(e) => setDest(e.target.value)}
        rows={4}
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default Send;
