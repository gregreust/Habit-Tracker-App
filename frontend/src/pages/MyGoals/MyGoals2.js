import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { InvalidTokenError } from 'jwt-decode';

const MyGoals2 = () => {

    const preselectedHabits = useLocation();
    const [user, token] = useAuth();
    const [allHabits, setAllHabits] = useState([]);
    const [checkedState, setCheckedState] = useState(
        new Array(allHabits.length).fill(false)
    );

    
    useEffect (() => {
        fetchAllHabits();
    })

    const fetchAllHabits = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/habits/all/');
            setAllHabits(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateUserHabits = async (habit_id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/habits/${habit_id}/`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (position) => {
        const updatedCheckedState = checkedState.map((item,index) => 
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState); 
        updateUserHabits(position);
    }

    return ( 
        <div className="my-goals-2">
            <ul className="habits-checklist">
                {allHabits.map((habit) => {
                    return (
                        <li key={habit.id}>
                            <div className="habit-list-item">
                                <input
                                    type="checkbox"
                                    id={`custom-checkbox-${habit.id}`}
                                    name={habit.name}
                                    value={habit.name}
                                    checked={checkedState[habit.id]}
                                    onChange={() => handleClick(habit.id)}/>
                                <label htmlFor={`custom-checkbox-${habit.id}`}>{habit.name}</label>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
 
export default MyGoals2;