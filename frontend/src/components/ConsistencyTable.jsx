import React, {useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const ConsistencyTable = () => {

    // const [last40Days, setLast40Days] = useState([]);
    const [user, token] = useAuth();
    const [dataBoolean, setDataBoolean] = useState(false);
    const [habitCount, setHabitCount] = useState({});
    //ADD ALL habit names to a list

    const todayDate = new Date().toISOString().split('T')[0];

    async function fetchData(e) {
        e.preventDefault();
        //gets all entries less than 40 days old
        let response = await axios.get(`http://127.0.0.1:8000/api/habitfreq/user/?date=${todayDate}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        console.log(response.data);
        setDataBoolean(true);
        setHabitCount(() => countHabitNames(response.data));
    }

    //last40Days is the response from axios fetchData
    function countHabitNames (last40Days) {
        let habitCount = {};
        for (let key in last40Days) {
            let name = last40Days[key].habit_name;
            if (last40Days[key].yes_or_no) {
                if (!name in habitCount) {
                    //adds name of habit: 1 to habitCount
                    habitCount = {...habitCount, [name]: 1};
                }
                else {
                    habitCount[name]++;
                }
            }
        }
        console.log(habitCount);
        return habitCount;
    }

    if (!dataBoolean){
        return ( 

            <div className="consistency-fetch">
                <button onClick={(e) => fetchData(e)}>View Habit Consistency</button>
            </div>
        );
    }
    else {
        return (
            <div className="consistency-table">
                {/* <ul>
                    {habitCount&&habitCount.map((x, index) => {
                        return (
                            <li key={index}>{x}</li>
                        )
                    })}
                </ul>
     */}
            </div>
        );
    }
}
 
export default ConsistencyTable;
