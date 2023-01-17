import React from 'react';
import ProgressChart from '../../components/ProgressChart/ProgressChart';
import ConsistencyTable from '../../components/ConsistencyTable';


const MyProgress = () => {

    return ( 
        <div className="my-progress-page">
            <h4>Track progress</h4>
            {/* Chart will show a line for habit consistency and a line for check-in averages
            User has option to choose which habit is displayed, or which check-in question is displayed */}
            <ProgressChart />
            <ConsistencyTable />

        </div>

    );
}
 
export default MyProgress;