import React from 'react';

const MyGoals = () => {

    // useEffect load currently tracked habits. Catch if none exist yet

    return ( 
        <div className="my-goals">
            <p>Try to commit to a minimum of 30 days before making adjustments!</p>
            <h4>Currently Tracking</h4>
            <ul>
                {/* map through habits assigned to user */}
            </ul>
        </div>
        
     );
}
 
export default MyGoals;