import React, {useState} from 'react';
import ProgressChart from '../../components/ProgressChart.jsx/ProgressChart';


const MyProgress = () => {

    const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
    const [selectedHabits, setSelectedHabits] = useState([]);
    const [selectedCheckQuestion, setSelectedCheckQuestion] = useState([]);

    

    return ( 
        <div className="my-progress-page">
            <h4>Track progress</h4>
            {/* Chart will show a line for habit consistency and a line for check-in averages
            User has option to choose which habit is displayed, or which check-in question is displayed */}
            <ProgressChart selectedHabits={selectedHabits} 
                selectedCheckQuestion={selectedCheckQuestion}/>

        </div>

    );
}
 
export default MyProgress;