import React, {useState} from 'react';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
import { MAGICBELL_API_KEY } from '../../localData';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Settings = () => {

    const [user, token] = useAuth();
    const [toastTime, setToastTime] = useState();

    async function handleSubmit (e) {
        e.preventDefault();
        //put new time to user.reminder_time
        let newTime = {"notification_time": [toastTime]};
        await axios.patch(`http://127.0.0.1:8000/api/auth/reminder/`, newTime,
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        console.log(newTime);
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
                    <select value={toastTime} defaultValue={user.reminder_time} 
                        onChange={(e) => {setToastTime(e.target.value)}}>
                            <option>0000</option>
                            <option>0030</option>
                            <option>0100</option>
                            <option>0130</option>
                            <option>0200</option>
                            <option>0230</option>
                            <option>0300</option>
                            <option>0330</option>
                            <option>0400</option>
                            <option>0430</option>
                            <option>0500</option>
                            <option>0530</option>
                            <option>0600</option>
                            <option>0630</option>
                            <option>0700</option>
                            <option>0730</option>
                            <option>0800</option>
                            <option>0830</option>
                            <option>0900</option>
                            <option>0930</option>
                            <option>1000</option>
                            <option>1030</option>
                            <option>1100</option>
                            <option>1130</option>
                            <option>1200</option>
                            <option>1230</option>
                            <option>1300</option>
                            <option>1330</option>
                            <option>1400</option>
                            <option>1430</option>
                            <option>1500</option>
                            <option>1530</option>
                            <option>1600</option>
                            <option>1630</option>
                            <option>1700</option>
                            <option>1730</option>
                            <option>1800</option>
                            <option>1830</option>
                            <option>1900</option>
                            <option>1930</option>
                            <option>2000</option>
                            <option>2030</option>
                            <option>2100</option>
                            <option>2130</option>
                            <option>2200</option>
                            <option>2230</option>
                            <option>2300</option>
                            <option>2330</option>
                    </select>
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Set Reminder Time</button>
                </form>
            </div>
        </div>
            
     );
}
 
export default Settings;