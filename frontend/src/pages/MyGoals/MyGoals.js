import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyGoals = () => {

    const [user, token] = useAuth();
    const [userHabits, setUserHabits] = useState([]);
    const navigate = useNavigate();

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

    const navigateToMyGoals2 = () => {
        navigate('/goals2');
    }

    return ( 
        <div className="my-goals">
            <p>Try to commit to a minimum of 30 days before making adjustments!</p>
            <h4>Currently Tracking</h4>
            <ul>
                {/* Display if no habits have been added yet */}
                {userHabits.length === 0 &&
                <li>No habits added yet</li>}
                {userHabits.map((habit, index) => {
                    return (
                        <li key={index}>{habit.name}</li>
                    )
                })}
            </ul>
            <button onClick={navigateToMyGoals2}>Add or remove a habit to track</button>

        </div>
        
     );
}
 
export default MyGoals;