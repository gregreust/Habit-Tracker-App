import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ConsistencyTable = () => {

    const [daysOutOf40, setDaysOutOf40] = useState([]);
    //NEED TO GET ENTRIES LESS THAN 40 DAYS OLD FROM BACKEND
    //THEN I NEED TO COUNT THE YES'S FOR EACH CHECK IN QUESTION

    const todayDate = new Date().toISOString().split('T')[0];
    // useEffect = (() => {

    // }, []);

    return ( 

        <div className="consistency-table">
            
        </div>

    );
}
 
export default ConsistencyTable;
