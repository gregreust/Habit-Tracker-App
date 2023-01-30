import React from 'react';
import ProgressChart from '../../components/ProgressChart';
import ConsistencyTable from '../../components/ConsistencyTable';
import './MyProgress.css';


const MyProgress = () => {

    return ( 
        <div className="my-progress-page">
            <h3>Track progress from the last 40 days</h3>
            <ProgressChart />
            <ConsistencyTable />
        </div>

    );
}
 
export default MyProgress;