import React from "react";
import {Link} from 'react-router-dom';
import './HomePage.css';
import RandomQuote from '../../components/RandomQuote';

const HomePage = () => {
  
  // useEffect with a daily tip from the database here!!!


  return (
    <div className="home-page">
      <div className="home-page-menu">
        <div className="left1">
          <Link to="/howto">
            <div className="menu-button">Getting Started</div>
          </Link>
        </div>
        <div className="left2">
          <Link to="/checkin">
            <div className="menu-button">Daily Check-in</div>
          </Link>
        </div>
        <div className="left3">
          <Link to="/myprogress">
            <div className="menu-button">View Progress</div>
          </Link>
        </div>
        <div className="right1">
          <Link to="/mygoals">
            <div className="menu-button">My Goals</div>
          </Link>
        </div>
        <div className="right2">
          <Link to="/community">
            <div className="menu-button">Community Support</div>
          </Link>
        </div>
        <div className="right3">
          <Link to="/settings">
            <div className="menu-button">Settings</div>
          </Link>
        </div>
      </div>
      <div className="quote"><RandomQuote/></div>
      <div className="zenquote-note">Inspirational quotes provided by 
        <a href="https://zenquotes.io/" target="_blank"> ZenQuotes API</a>
      </div>
    </div>
  );
};

export default HomePage;
