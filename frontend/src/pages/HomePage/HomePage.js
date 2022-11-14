import React from "react";
import { useEffect, useState } from "react";
import {Route, Routes, Link} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

// import app pages
import HowTo from "../HowTo/HowTo";
import CheckIn1 from "../CheckIn/CheckIn1";
import MyProgress from "../MyProgress/MyProgress";
import CommunitySupport from "../CommunitySupport/CommunitySupport";
import MyGoals from "../MyGoals/MyGoals";
import Settings from "../Settings/Settings";

import axios from "axios";

const HomePage = () => {
  
  // useEffect with a daily tip from the database here!!!


  return (
    <div className="home-page">
      <Routes>
        <Route path="/howto" element={<HowTo/>}></Route>
        <Route path="/checkin" element={<CheckIn1/>}></Route>
        <Route path="/myprogress" element={<MyProgress/>}></Route>
        <Route path="/community" element={<CommunitySupport/>}></Route>
        <Route path="/mygoals" element={<MyGoals/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
      </Routes>
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
