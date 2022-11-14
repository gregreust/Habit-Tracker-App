import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyGoals = () => {

    const [user, token] = useAuth();
    const [userHabits, setUserHabits] = useState([]);

    // useEffect load currently tracked habits. Catch if none exist yet
    useEffect(() => {
        fetchHabits();
    })

    const fetchHabits = async () => {
         try {
            let response = await axios.get(
                "http://127.0.0.1:8000/api/habits/",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUserHabits(response.data);
         } catch (error) {
            console.log(error);
         }
    }

    return ( 
        <div className="my-goals">
            <p>Try to commit to a minimum of 30 days before making adjustments!</p>
            <h4>Currently Tracking</h4>
            <ul>
                {userHabits&&userHabits.map((habit, index) => {
                    return (
                        <li key={index}>{habit.name}</li>
                    )
                })}
            </ul>
            <Link to="/goals2" state={userHabits}><button>Add or remove a habit to track</button></Link>

        </div>
        
     );
}
 
export default MyGoals;