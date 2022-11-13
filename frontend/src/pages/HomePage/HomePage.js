import React from "react";
import { useEffect, useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
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
  const navigate = useNavigate();

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
      <div className="container">
        <button onClick={() => navigate('/howto')}>Getting Started</button>
        <button onClick={() => navigate('/checkin')}>Daily Check-in</button>
        <button onClick={() => navigate('/myprogress')}>View Progress</button>
        <button onClick={() => navigate('/community')}>Community Support</button>
        <button onClick={() => navigate('/mygoals')}>My Goals</button>
        <button onClick={() => navigate('/settings')}>Settings</button>
        </div>
        </div>
    
  );
};

export default HomePage;
