import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Chart } from "react-google-charts";

const ProgressChart = ({selectedHabits}, {selectedCheckQuestion}) => {
    
    const [user, token] = useAuth();
    const [dataBoolean, setDataBoolean] = useState(true);
    const [userHabitFreq, setUserHabitFreq] = useState([]);
    const [userCheckInData, setUserCheckInData] = useState([]);

    const fetchUserHabitFreq = async () => {
        //backend is filtering this to get records associated with the user
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/habitfreq/user/');
            setUserHabitFreq(response);
        } catch (error){
             //IMPORTANT if no data yet, display "No data yet. Come back after completing a few daily check-ins"
            setDataBoolean(false);
            console.log(error);
        }
    }

    const fetchUserCheckInData = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/checkin/user/');
            setUserCheckInData(response);
        } catch (error) {
            //displays message if no data available yet
            setDataBoolean(false);
            console.log(error);
        }
    }

    if (!dataBoolean) {
        return(
            <div className="no-data-message">
                <p>No data to display. Please return to the main menu and fill out your daily check-in.</p>
            </div>
        );
    } else {
        return ( 
            {/* Chart will show a line for habit consistency and a line for check-in averages
            User has option to choose which habit is displayed, or which check-in question is displayed */}
            <
        );
    }
}
 
export default ProgressChart;

