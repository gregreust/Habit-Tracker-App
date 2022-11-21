import React from 'react';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
import { MAGICBELL_API_KEY } from '../../localData';
import useAuth from '../../hooks/useAuth';

const Settings = () => {

    const [user, token] = useAuth();

    return ( 
        <div className="settings-page">
            <p>Enable browser notifications and set your preferred time to be reminded about your daily check-in.</p>
            <MagicBell apiKey={MAGICBELL_API_KEY} 
            userEmail={`${user.email}`}
            defaultIsOpen={true}>
            {(props) => <FloatingNotificationInbox height={300} {...props} />}
            </MagicBell>,
        </div>
            
     );
}
 
export default Settings;