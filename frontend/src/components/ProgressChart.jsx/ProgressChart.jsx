import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Chart } from "react-google-charts";

const ProgressChart = ({selectedHabits}, {selectedCheckQuestion}) => {
    
    const [user, token] = useAuth();
    const [dataBoolean, setDataBoolean] = useState(true);
    //holds all data for user
    const [userHabitFreq, setUserHabitFreq] = useState([]);
    //holds filtered list from props 
    const [filteredHabitFreq, setFilteredHabitFreq] = useState([]);
    //holds all data for user
    const [userCheckInData, setUserCheckInData] = useState([]);
    //holds filtered list from props
    const [filteredCheckInData, setFilteredCheckInData] = useState([]);

    //useEffect: check for props. Create data to graph habit frequency and daily checkin by date. 
    //HOW DO I GET FROM DJANGO DATE TO PROPER DATE TO GRAPH???

    useEffect(() => {
        fetchUserHabitFreq();
        fetchUserCheckInData();
    },[]) 

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

    const createCheckChartData = () => {
        let checkInData = new google.visualization.DataTable();
        checkInData.addColumn
        [
            ['Date', 'Energy', 'Stress', 'Pain', 'Sleep', 'Quality of life', 'Balance', 'Purpose']
        ]
        for (let key in userCheckInData) {
            checkInData += [
                userCheckInData[key].date.getTime(), //converts datetime str to int 
                userCheckInData[key].check_in_1,
                userCheckInData[key].check_in_2,
                userCheckInData[key].check_in_3,
                userCheckInData[key].check_in_4,
                userCheckInData[key].check_in_5,
                userCheckInData[key].check_in_6,
                userCheckInData[key].check_in_7
            ]
        }
        return checkInData;

    }

    const createHabitChartData = () => {
        //filter by first habit name, then check array for more habit names
        for (let key in userHabitFreq){
            
        }
    }

    // if (!dataBoolean) {
    //     return(
    //         <div className="no-data-message">
    //             <p>No data to display. Please return to the main menu and fill out your daily check-in.</p>
    //         </div>
    //     );
    // } else {
        return ( 
            <div className="progress-chart">
                {/* Chart will show a line for habit consistency and a line for check-in averages
                User has option to choose which habit is displayed, or which check-in question is displayed */}
                <Chart
                    chartType="LineChart"
                    data={createCheckChartData()} 
                />
            </div>
        );
    // }
}
 
export default ProgressChart;

