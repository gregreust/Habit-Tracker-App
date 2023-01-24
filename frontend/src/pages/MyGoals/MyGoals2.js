import React, {useState, useEffect, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyGoals2 = () => {

    const navigate = useNavigate();
    const [user, token] = useAuth();
    const [allHabits, setAllHabits] = useState([]);
    const userHabits = useLocation();
    const [isChecked, setisChecked] = useState([]);
    const [newHabit, setNewHabit] = useState([]);

    
    useEffect (() => {
        const fetchAllHabits = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/habits/all/');
                setAllHabits(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllHabits()
    }, [])


    const handleCheck = (event) => {
        let value = event.target.value;
        let checked = event.target.checked;
        if (checked) {
            //add checked habit object to list
            setisChecked(prev => [...prev, value]);
        } else {
            //remove unchecked habit from list
            setisChecked(prev => prev.filter(x => x !== value))
        }
        console.log(isChecked);
    }

    const handleHabitSubmit = () => {
        addOrRemoveUserHabit().then( navigate('/mygoals'));
    }

    const addOrRemoveUserHabit = async () => {
        //if habit in isChecked and not in userHabits, put to userHabits
        for (let key in isChecked){
            if (!userHabits.includes(isChecked[key])){
                try {
                    await axios.put(`http://127.0.0.1:8000/api/habits/${isChecked[key].id}/`);
                    console.log(`Added ${isChecked[key]} to ${user.username} list`);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        //if habit not in isChecked AND IN userHabits, delete from userHabits
        for (let key in userHabits){
            if (!isChecked.includes(userHabits[key])){
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/habits/${userHabits[key].id}/`);
                    console.log(`Removed ${isChecked[key]} from ${user.username} list`);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const handleAddNewHabit = async (event) => {
        event.preventDefault();
        let newHabitObject = {
            name: newHabit
        }
        await axios.post('http://127.0.0.1:8000/api/habits/', newHabitObject)
    }

    return ( 
        <div className="my-goals-2">
            <h4>Choose habits to track (3 or less is recommended to start)</h4>
            <form className="habit-checklist" onSubmit={(event) => handleHabitSubmit(event)}>
                <div className="habit-names">
                    {allHabits.map((habit) => 
                        <label key={habit.id}>
                            <input
                                type="checkbox"
                                value={habit}
                                onChange={handleCheck}
                            />
                            {habit.name}
                        </label>
                    )}
                </div>
                <button className="checklist-submit-button" type="submit">Submit</button>
            </form>
            <div className="add-custom-habit">
            <h4>Add a custom habit to the list</h4>
            <form>
                <input type="text" value={newHabit} onChange={(event) => setNewHabit(event.target.value)}/>
                <button type="submit" onClick={(event) => handleAddNewHabit(event)}>Add habit</button>
            </form>
            </div>
        </div>
    );
}
 
export default MyGoals2;