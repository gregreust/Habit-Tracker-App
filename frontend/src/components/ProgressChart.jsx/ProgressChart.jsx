import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Chart } from "react-google-charts";

const ProgressChart = () => {
    
    const [user, token] = useAuth();
    const [dataBoolean, setDataBoolean] = useState(true);
    
    const [userCheckInData, setUserCheckInData] = useState([]);

    //useEffect: check for props. Create data to graph habit frequency and daily checkin by date. 

    useEffect (() => {
        fetchUserCheckInData();
    }, [])

    // const fetchUserHabitFreq = async () => {
    //     //backend is filtering this to get records associated with the user
    //     try {
    //         let response = await axios.get('http://127.0.0.1:8000/api/habitfreq/user/',
    //             {
    //                 headers: {
    //                     Authorization: "Bearer " + token,
    //                 },
    //             }
    //         );
    //         setUserHabitFreq(response.data);
    //     } catch (error){
    //          //IMPORTANT if no data yet, display "No data yet. Come back after completing a few daily check-ins"
    //         setDataBoolean(false);
    //         console.log(error);
    //     }
    // }

    const fetchUserCheckInData = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/checkin/user/',
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUserCheckInData(response.data);
            console.log(userCheckInData);
        } catch (error) {
            //displays message if no data available yet
            setDataBoolean(false);
            console.log(error);
        }
    }

    const createCheckChartData = () => {
        // let CHECK_IN_DATA = ["Date", "Energy", "Stress", "Body Pain", "Sleep Quality", "Life Satisfaction", "Balance", "Purpose",];
        // for (let key in userCheckInData) {
        //     CHECK_IN_DATA += [
        //         userCheckInData[key].date, //convert datetime str to int?????
        //         userCheckInData[key].check_in_1,
        //         userCheckInData[key].check_in_2,
        //         userCheckInData[key].check_in_3,
        //         userCheckInData[key].check_in_4,
        //         userCheckInData[key].check_in_5,
        //         userCheckInData[key].check_in_6,
        //         userCheckInData[key].check_in_7,
        //     ]
        // };

        let CHECK_IN_DATA = [];
        CHECK_IN_DATA.concat(["Date", "Energy", "Stress", "Body Pain", "Sleep Quality", "Life Satisfaction", "Balance", "Purpose"])
        
        let chart_values = userCheckInData.map(x => 
            //NEED TO RETURN DATE AND INTEGERS, NOT first 2 OBJECT VALUES
            Object.values(x).splice(0, 2)
            );
        CHECK_IN_DATA.concat(chart_values);
        console.log(CHECK_IN_DATA);
        return CHECK_IN_DATA;

    }

    // const createHabitChartData = () => {
    //     //filter by first habit name, then check array for more habit names
    //     for (let key in userHabitFreq){
            
    //     }
    // }

    if (!dataBoolean) {
        return(
            <div className="no-data-message">
                <p>No data to display yet.</p>
            </div>
        );
    } else {
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
    }
}
 
export default ProgressChart;

