// General Imports
import { Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [user, token] = useAuth();
  const [display, setDisplay] = useState();
  const nowDate = new Date();

  useEffect(() => {
    fetchReminderTime().then(response => handleResponse(response))
      .catch(error => {console.log(error)});
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

  function handleResponse(reminderTimeResponse) {
    let reminderTime = reminderTimeResponse.toString();
    //finds difference bewteen reminder time and now
    let timeDiff = findTimeDifference(reminderTime);
    //sets timer for above difference, then displays toast 
    toastTimer(timeDiff);
  }

  function findTimeDifference(reminderTime) {
    let reminderTimeMin = "";
    let reminderTimeHour = reminderTime.slice(0, -2);
    if (reminderTime.length == 4){
      reminderTimeMin = reminderTime.slice(2);
    } else {
      reminderTimeMin = reminderTime.slice(1);
    }
    //get difference from current time to reminder time in minutes
    let timeDiff = Math.abs((parseInt(reminderTimeHour) - nowDate.getHours()))*60 + Math.abs(parseInt(reminderTimeMin) - nowDate.getMinutes());
    return timeDiff;
  }

  function toastTimer(timeDiffMinutes) {
    let timeDiffMillisecs = timeDiffMinutes * 60000;
    setTimeout(function () {
        //Display toast notification when time runs out
        toast.info("Time to fill out your daily check in!", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          progress: undefined,
          theme: "colored",
        });
    }, timeDiffMillisecs);
}


  return (
    <div>
      <Navbar />
      <ToastContainer 
          position="top-center"
          autoClose={false}
          theme="colored"      
      />
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
