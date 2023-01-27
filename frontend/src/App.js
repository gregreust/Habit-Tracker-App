// General Imports
import { Routes, Route } from "react-router-dom";
import React, {useEffect} from "react";
import "./App.css";
import useAuth from "./hooks/useAuth";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HowTo from "./pages/HowTo/HowTo";
import CheckIn1 from "./pages/CheckIn/CheckIn1";
import CheckIn2 from "./pages/CheckIn/CheckIn2";
import MyProgress from "./pages/MyProgress/MyProgress";
import CommunitySupport from "./pages/CommunitySupport/CommunitySupport";
import MyGoals from "./pages/MyGoals/MyGoals";
import MyGoals2 from "./pages/MyGoals/MyGoals2";
import Settings from "./pages/Settings/Settings";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";

function App() {

  const [user, token] = useAuth();
  const nowDate = new Date();

  useEffect(() => {
    let reminderTime = fetchReminderTime().toString();
    //finds difference bewteen reminder time and now
    let timeDiff = findTimeDifference(reminderTime);
    //sets timer for above difference, then displays toast 
    toastTimer(timeDiff);
  }, []);

  async function fetchReminderTime() {
    let response = await axios.get('http://127.0.0.1:8000/api/auth/reminder/',
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
    return response.data;

  }

  function findTimeDifference(reminderTime) {
    let reminderTimeMin = "";
    let reminderTimeHour = reminderTime.toString().slice(-2);
    if (reminderTime.length() == 4){
      reminderTimeMin = reminderTime.toString().slice(2);
    } else {
      reminderTimeMin = reminderTime.toString().slice(1);
    }
    //get difference from current time to reminder time in minutes
    let timeDiff = Math.abs((parseInt(reminderTimeHour) - nowDate.getHours()))*60 + Math.abs(parseInt(reminderTimeMin) - nowDate.getMinutes());
    return timeDiff;
  }

  function toastTimer(timeDiffMinutes) {
    let timeDiffMillisecs = timeDiffMinutes * 10000;
    setTimeout(function () {
        //Display toast notification when time runs out
        
    }, timeDiffMillisecs);
}


  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/howto" element={<HowTo/>}></Route>
        <Route path="/checkin" element={<CheckIn1/>}></Route>
        <Route path="/checkin2" element={<CheckIn2/>}></Route>
        <Route path="/myprogress" element={<MyProgress/>}></Route>
        <Route path="/community" element={<CommunitySupport/>}></Route>
        <Route path="/mygoals" element={<MyGoals/>}></Route>
        <Route path="/goals2" element={<MyGoals2/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
