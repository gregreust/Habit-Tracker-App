import React, {useState} from 'react';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
import { MAGICBELL_API_KEY } from '../../localData';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Settings = () => {

    const [user, token] = useAuth();
    const [toastTime, setToastTime] = useState(user.reminder_time);

    async function handleSubmit (e) {
        e.preventDefault();
        console.log(user.reminder_time)
        console.log(toastTime);
        //put new time to user.reminder_time
        await axios.patch();
    }

    return ( 
        <div className="settings-page">
            <div className="magicbell-container">
                <p>MagicBell feature is not functional yet.</p>
                <MagicBell apiKey={MAGICBELL_API_KEY} 
                userEmail={`${user.email}`}
                defaultIsOpen={false}>
                </MagicBell>
            </div>
            <div className="toast-settings">
                {/* 1. Create form where user can select a time for daily notifications */}
                <form className="time-selector">
                    <label>Select a time for daily check-in reminder:</label>
                    <input type="time" value="time" defaultValue={user.reminder_time} 
                        onChange={(e) => {setToastTime(e.target.value)}}>
                    </input>
                    <button type="submit" onClick={(e) => handleSubmit(e)}></button>
                </form>
                {/* 2. Post the selected time to user.reminder_time just like posting to habits list */}
            </div>
        </div>
            
     );
}
 
export default Settings;