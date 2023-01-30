import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Chart } from "react-google-charts";

const ProgressChart = () => {
    
    const [user, token] = useAuth();
    const [dataBoolean, setDataBoolean] = useState(false);
    const [userCheckInData, setUserCheckInData] = useState([]); 
    const todayDate = new Date().toISOString().split('T')[0];

    useEffect (() => {
        fetchUserCheckInData();
    }, [])

    const fetchUserCheckInData = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/checkin/user/?date=${todayDate}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUserCheckInData(response.data);
            console.log(response.data);
            setDataBoolean(true);
        } catch (error) {
            //displays message if no data available yet
            setDataBoolean(false);
            console.log(error);
        }
    }

    const createCheckChartData = () => {
        let CHART_DATA = [];
        CHART_DATA.push(["Date", "Energy", "Stress", "Body Pain", "Sleep Quality", "Life Satisfaction", "Balance", "Purpose"]);
        console.log(CHART_DATA);
        
        for (let key in userCheckInData) {
            let newArr = Object.values(userCheckInData[key]);
            //gets date and integers, NOT first 2 object values
            newArr.splice(0,2);
            //takes the unneeded info out of date
            newArr[0] = newArr[0].substring(5,10);
            CHART_DATA.push(...[newArr]);
        }

        console.log(CHART_DATA);
        return CHART_DATA;

    }

    if (!dataBoolean) {
        return(
            <div className="no-data-message">
                <p>No data to display yet.</p>
            </div>
        );
    } else {
        return ( 
            <div className="progress-chart">
                {/* ADD A WAY TO FILTER WHICH HABIT OR CHECKIN IS BEING DISPLAYED */}
                <Chart
                    chartType="LineChart"
                    data={createCheckChartData()} 
                />
            </div>
        );
    }
}
 
export default ProgressChart;

