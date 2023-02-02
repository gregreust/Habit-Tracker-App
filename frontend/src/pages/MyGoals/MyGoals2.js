import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import {toast} from 'react-toastify';

const MyGoals2 = () => {

    const navigate = useNavigate();
    const [user, token] = useAuth();
    const [habitsList, setHabitsList] = useState();
    //isChecked is just an array of names
    const [isChecked, setisChecked] = useState([]);
    const [newHabit, setNewHabit] = useState([]);

    
    useEffect (() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/habits/',
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setHabitsList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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

    const handleHabitSubmit = (event) => {
        event.preventDefault();
        removeUserHabit();
        toast.error(`Deleted`, {
            position: "top-center",
            autoClose: 4000,
            theme: "colored",
          });
    }

    const removeUserHabit = async () => {
        for (let key in isChecked){
            //grabs habit object (OR multiple if they have the same name) from isChecked name
            let habitObjects = habitsList.filter(x => x.name === isChecked[key]);
            console.log(habitObjects);
            try {
                for (let key in habitObjects){
                    await axios.delete(`http://127.0.0.1:8000/api/habits/delete/${habitObjects[key].id}/`,
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    );
                    console.log(`Removed ${habitObjects[key].name} from list`);
                    setHabitsList(habitsList.filter(x => x.name !== habitObjects[key].name));
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleAddNewHabit = async (event) => {
        event.preventDefault();
        let newHabitObject = {
            name: newHabit,
        };
        await axios.post('http://127.0.0.1:8000/api/habits/', newHabitObject,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        setHabitsList([...habitsList, newHabitObject]);
    }

    function goBack () {
        navigate('/');
    }

    return ( 
        <div className="my-goals-2">
            <div className="add-custom-habit">
                <h4>Add a new habit to track</h4>
                <form className="add-habit-form">
                    <input type="text" value={newHabit} onChange={(event) => setNewHabit(event.target.value)}/>
                    <button className="add-habit-button" type="submit" onClick={(event) => handleAddNewHabit(event)}>Add habit</button>
                </form>
            </div>
            {/* THIS WILL ONLY RENDER IF USER HAS ALREADY ADDED HABITS */}
            {habitsList && 
                <div className="delete-form">
                    <h4>Select a habit to delete</h4>
                    <form className="habit-checklist" onSubmit={(event) => handleHabitSubmit(event)}>
                        <div className="habit-names">
                            {habitsList.map((habit) => 
                                <label key={habit.id}>
                                    <input
                                        type="checkbox"
                                        value={habit.name}
                                        onChange={(event) => handleCheck(event)}
                                    />
                                    {habit.name}
                                </label>
                            )}
                        </div>
                        <button className="checklist-submit-button" type="submit">Delete</button>
                    </form>
                </div>
            }
            <Link to="/">
                <div className="go-back-button">Back to Menu</div>
            </Link>
        </div>
    );
}
 
export default MyGoals2;