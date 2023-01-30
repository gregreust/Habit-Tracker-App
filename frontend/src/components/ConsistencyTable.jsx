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
        setHabitCount(() => countHabitNames(response.data));
        setDataBoolean(true);
        console.log(habitCount);
    }

    //last40Days is the response from axios fetchData
    function countHabitNames (last40Days) {
        let filteredData = last40Days.filter(x => x.yes_or_no === true);
        let names = [];
        for (let key in filteredData) {
            if (!names.includes(filteredData[key].habit_name)) {
                names.push(filteredData[key].habit_name);
            }
        }
        //Counts the number of each habit name 
        let habitCount = {};
        for (let key in names) {
            let n = filteredData.filter(x => x.habit_name === names[key]);
            habitCount[names[key]] = n.length;
        }
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
               <ul>
                    {habitCount&&Object.keys(habitCount).map((keyName, i) => {
                        return(<li key={i}>{keyName + ": " + habitCount[keyName]}</li>);
                    })}
               </ul>
            </div>
        );
    }
}
 
export default ConsistencyTable;
