import React from 'react';
import ProgressChart from '../../components/ProgressChart';
import ConsistencyTable from '../../components/ConsistencyTable';


const MyProgress = () => {

    return ( 
        <div className="my-progress-page">
            <h4>Track progress</h4>
            <ProgressChart />
            <ConsistencyTable />

        </div>

    );
}
 
export default MyProgress;