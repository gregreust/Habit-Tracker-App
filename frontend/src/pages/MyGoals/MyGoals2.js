import React, {useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyGoals2 = () => {

    const navigate = useNavigate();
    const [user, token] = useAuth();
    const [allHabits, setAllHabits] = useState([]);
    const {userHabits} = useContext(AuthContext);
    const [checkedState, setCheckedState] = useState([]);
    const [checkedHabits, setCheckedHabits] = useState([]);

    
    useEffect (() => {
        const fetchAllHabits = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/habits/all/');
                setAllHabits(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllHabits().then(() => {
            // Program must wait for the habit array
            let false_array = new Array(allHabits.length).fill(false);
            //loop through, if user habits.includes, then set checked 
            setCheckedState(false_array);
        })
    }, [])


    const updateUserHabits = async (habit_id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/habits/${habit_id}/`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        //update useContext user habits???
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

    const handleHabitSubmit = () => {
        
        for (let i=0; i<checkedState.length; i++){
            if (checkedState[i]){
                updateUserHabits(i+1);
            }
        }
        navigate('/mygoals');
    }


    return ( 
        <div className="my-goals-2">
            <h4>Select habits to track (3 or less is recommended to start)</h4>
            <ul className="habits-checklist">
                {allHabits.map((habit, index) => (
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
                )}
            </ul>
            <button onClick={handleHabitSubmit}>Submit</button>
            <div className="add-custom-habit">
            <h4>Add a custom habit to the list</h4>
            <form>
                <input type="text"/>
            </form>
            </div>
        </div>
    );
}
 
export default MyGoals2;