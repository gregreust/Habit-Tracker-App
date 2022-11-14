import React from "react";
import {Link} from 'react-router-dom';

const HomePage = () => {
  
  // useEffect with a daily tip from the database here!!!


  return (
    <div className="home-page">
      <Link to="/howto">Getting Started</Link>
      <Link to="/checkin">Daily Check-in</Link>
      <Link to="/myprogress">View Progress</Link>
      <Link to="/community">Community Support</Link>
      <Link to="/mygoals">My Goals</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default HomePage;
