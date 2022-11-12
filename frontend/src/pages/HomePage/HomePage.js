import React from "react";
import { useEffect, useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

import HowTo from "../HowTo/HowTo";

import axios from "axios";

const HomePage = () => {
  
  // useEffect with a daily tip from the database here!!!
  const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={navigate=('/howto')}>Getting Started</button>
      <button onClick={navigate=('/checkin')}>Daily Check-in</button>
      <button onClick={navigate=('/myprogress')}>View Progress</button>
      <button onClick={navigate=('/community')}>Community Support</button>
      <button onClick={navigate=('/mygoals')}>My Goals</button>
      <button onClick={navigate=('/settings')}>Settings</button>
    </div>
  );
};

export default HomePage;
