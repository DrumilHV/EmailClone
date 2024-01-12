// Mail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

const Mail = () => {
  const { id } = useParams();
  const [mailDetails, setMailDetails] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  console.log(`${BACKEND_URL}/mail/${id}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/mail/${id}`);
        console.log("Mail details response:", response.data);
        setMailDetails(response.data[0]);
        // Handle the response data here
      } catch (error) {
        console.error("Error fetching mail details:", error);
      }
    };

    fetchData(); // Call the async function
  }, [id]);

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* {console.log(mailDetails)} */}
      <Typography variant="h4">Mail Details</Typography>
      {mailDetails ? (
        <div>
          <Typography variant="body1">
            Received Time: {mailDetails[2]}
          </Typography>
          <Typography variant="body1">Content : {mailDetails[3]}</Typography>
          {/* Add other mail details as needed */}
        </div>
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default Mail;
