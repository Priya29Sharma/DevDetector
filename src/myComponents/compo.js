import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { FaLocationDot } from "react-icons/fa6";
import { FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './card.css';

const { Search } = Input;

const Component1 = () => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [myData, setMyData] = useState({}); // State to store fetched data
  const defaultUserId = "Priya29Sharma"; // Default GitHub user ID

  useEffect(() => {
    fetchData(`https://api.github.com/users/${defaultUserId}`); // Fetch data on component mount
  }, []);

  const fetchData = async (url) => {
    try {
      setIsLoading(true); // Set loading state to true before fetch
      const response = await fetch(url); // Fetch data from GitHub API
      const jsonData = await response.json(); // Parse JSON data
      console.log(jsonData); // Log data for debugging
      setIsLoading(false); // Set loading state to false after fetch
      setMyData(jsonData); // Store fetched data in state
    } catch (error) {
      console.log("Error fetching data:", error); // Log errors if fetch fails
      setIsLoading(false); // Set loading state to false if error occurs
    }
  };

  const devDetector = (val) => {
    if (val) {
      console.log(val); // Log input value
      let url = "https://api.github.com/users/";
      url = url + val; // Construct URL with input value
      fetchData(url); // Fetch data for new user
    } else {
      console.log("Input required"); // Log message if input is empty
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // Create date object from timestamp
    const options = { day: "numeric", month: "short", year: "numeric" }; // Date format options
    return `Joined ${date.toLocaleDateString('en-US', options)}`; // Format date
  };

  return (
    <div className='center'>
      <div className="main-page">
        <h1>Dev Detective</h1>
        <div>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading={isLoading} // Show loading state
            onSearch={devDetector} // Call devDetector on search
            style={{ width: 780 }}
            required
          />
        </div>
        <div className='card'>
          <div className='left-container'>
            {isLoading && <p>Loading...</p>} {/* Show loading message */}
            <img className='Avtaar' src={myData.avatar_url} alt="Avatar" /> {/* Display user avatar */}
          </div>
          <div className='right-container'>
            <div className='box1'>
              <div className='userName'><h3>{myData.name || 'Name not available'}</h3></div> {/* Display user name */}
              <div className='joined-date'><p>{myData.created_at ? formatDate(myData.created_at) : 'Join date not available'}</p></div> {/* Display join date */}
            </div>
            <div className='id-link'>
              <a href={myData.html_url} style={{ color: 'yellow' }}>{myData.login || 'Username not available'}</a> {/* Display GitHub username */}
            </div>
            <div className='bio'>
              <p>{myData.bio ? myData.bio : 'This profile has no bio'}</p> {/* Display user bio */}
            </div>
            <div className='numbers'>
              <div className='repo'>
                <h4>Repo</h4>
                <p>{myData.public_repos !== undefined ? myData.public_repos : 'N/A'}</p> {/* Display public repos */}
              </div>
              <div className='followers'>
                <h4>Followers</h4>
                <p>{myData.followers !== undefined ? myData.followers : 'N/A'}</p> {/* Display followers */}
              </div>
              <div className='followings'>
                <h4>Followings</h4>
                <p>{myData.following !== undefined ? myData.following : 'N/A'}</p> {/* Display followings */}
              </div>
            </div>
            <div className='box2'>
              <div className='box21'>
                <div className='twitter-link'>
                  <p>
                    <FaTwitter /> {myData.twitter_username ? <a href={`https://twitter.com/${myData.twitter_username}`} target="_blank" rel="noopener noreferrer">@{myData.twitter_username}</a> : 'Not available'} {/* Display Twitter link */}
                  </p>
                </div>
                <div className='location-link'>
                  <p><FaLocationDot /> {myData.location ? myData.location : 'Not available'}</p> {/* Display location */}
                </div>
              </div>
              <div className='box22'>
                <div className='linkden-link'>
                  <p>
                    <FaLinkedin /> {myData.html_url ? <a href={`https://www.linkedin.com/in/${myData.html_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>{myData.html_url}</a> : 'Not available'} {/* Display LinkedIn link */}
                  </p>
                </div>
                <div className='email'>
                  <p><MdEmail /> {myData.email ? <a href={`mailto:${myData.email}`} target="_blank" rel="noopener noreferrer">{myData.email}</a> : 'Not available'}</p> {/* Display email */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;









