import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyGoals2 = ({setUserHabits}) => {

    const navigate = useNavigate();
    const [user, token] = useAuth();
    const [allHabits, setAllHabits] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    
    useEffect (() => {
        fetchAllHabits().then(() => {
            // Program must wait for the habit array
            let false_array = new Array(allHabits.length).fill(false);
            setCheckedState(false_array);
        })
    }, [])

    const fetchAllHabits = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/habits/all/');
            setAllHabits(response.data);
            console.log(allHabits);
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
    }

    const handleSubmit = () => {
        for (let i=0; i<checkedState.length; i++){
            if (checkedState[i]){
                updateUserHabits(i+1);
            }
        }
        navigate('/mygoals');
    }


    return ( 
        <div className="my-goals-2">
            <ul className="habits-checklist">
                {allHabits.map((habit, index) => {
                    return (
                        <li key={index}>
                            <div className="habit-list-item">
                                <input
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`}
                                    name={habit.name}
                                    value={habit.name}
                                    checked={checkedState[index]}
                                    onChange={() => handleClick(index)}/>
                                <label htmlFor={`custom-checkbox-${index}`}>{habit.name}</label>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
 
export default MyGoals2;