import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button, Typography, CircularProgress } from "@mui/material";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Mails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState();
  const [emails, setEmails] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Decode the JWT token to get user details
    const token = localStorage.getItem("token");
    const decodedUser = jwtDecode(token);

    setUserDetails(decodedUser.user);
    console.log(decodedUser.user);

    // Parse the page number from the URL query parameter
    const page = new URLSearchParams(location.search).get("page") || 1;

    setCurrentPage(Number(page));

    // Fetch user emails from the backend based on the page number
    fetchUserEmails(userDetails, page);
  }, [location.search]);

  const fetchUserEmails = async (userId, page) => {
    try {
      // Use userId and page number to fetch emails from the backend
      const userData = {
        mail: userDetails,
        page: page, // Fix: Subtract 1 to correct page number
      };
      console.log(userData);
      const response = await axios.post(`${BACKEND_URL}/mails`, userData);
      console.log("this is data", response.data);
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the sign-in page
    navigate("/signin");
  };
  const handleSend = () => {
    navigate("/send");
  };
  const handlePageChange = (newPage) => {
    // Update the URL query parameter with the new page number
    setCurrentPage(newPage);
    navigate(`?page=${newPage - 1}`);
  };

  return (
    <div>
      <div>
        <p>User ID: {userDetails}</p>
        {/* Add other user details as needed */}
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleSend}>Send Mail</Button>
      </div>
      {emails ? (
        <div>
          {/* Display user emails */}
          <h2>Your Emails</h2>
          <ul>
            {emails.map((email) => (
              <React.Fragment key={email[4]}>
                <Button>
                  <Link to={`/mail/${email[4]}`}>
                    <Typography>{email[3]}</Typography>
                  </Link>
                </Button>
                <br />
              </React.Fragment>
              // Add other email details as needed
            ))}
          </ul>
        </div>
      ) : (
        <CircularProgress />
      )}
      {/* Pagination controls */}
      <div style={{ position: "absolute", bottom: "30px" }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous Page
        </Button>
        <span> Page {currentPage} </span>
        <Button onClick={() => handlePageChange(currentPage + 1)}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Mails;
