import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import './CheckIn.css';

const CheckIn1 = () => {

    const [user, token] = useAuth();
    const [userHabits, setUserHabits] = useState([]);
    const [isChecked, setisChecked] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //Load the user's currently tracked habits
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
        fetchHabits();
    }, [])

    const handleCheck = event => {
        //value here is the habit name str
        let value = event.target.value;
        let checked = event.target.checked;
        if (checked) {
            //push checked habit to list
            setisChecked(prev => [...prev, value]);
        } else {
            //remove unchecked value 
            setisChecked(prev => prev.filter(x => x !== value))
        }
        console.log(isChecked);
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        for (let key in userHabits){
            let new_record = {}
            if (isChecked.includes(userHabits[key].name)){
                new_record = {
                    habit_name: userHabits[key].name,
                    yes_or_no: true
                }
            } else {
                new_record = {
                    habit_name: userHabits[key].name,
                    yes_or_no: false
                }
            }
            await axios.post('http://127.0.0.1:8000/api/habitfreq/', new_record,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
        }
        navigate('/checkin2');
    }

    return ( 
        // IF USER ALREADY CHECKED IN TODAY, THEN DISPLAY SOME OTHER MESSAGE INSTEAD
        <div className="check-in-screen-1">
            <h3>Did you do this today?</h3>
            <form>
                {userHabits&&userHabits.map(habit =>
                <div className="checklist" key={habit.id}>
                    <label>
                        <input type="checkbox" 
                        value={habit.name}
                        onChange={handleCheck}
                        />
                        {habit.name}
                    </label>
                </div>
                
                    )}
            </form>
            <button onClick={(event) => handleSubmit(event)}>Next</button>
        </div>
     );
}
 
export default CheckIn1;