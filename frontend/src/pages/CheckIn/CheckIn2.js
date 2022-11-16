import React, {useState} from 'react';

const CheckIn2 = () => {

    const [response1, setResponse1] = useState(1);
    const [response2, setResponse2] = useState(1);
    const [response3, setResponse3] = useState(1);
    const [response4, setResponse4] = useState(1);
    const [response5, setResponse5] = useState(1);
    const [response6, setResponse6] = useState(1);
    const [response7, setResponse7] = useState(1);

    const handleResponseSubmit = async () => {
        return;
    }

    return ( 
        <div className="check-in-screen-2">
            {/* HOW TO MAKE A RANGE COMPONENT TO RECYCLE??? */}
            <h4>How are you doing today?</h4>
            <div className="range-1">
                <label>My energy level throughout the day
                    <input type="range" 
                    min={1} max={5} 
                    value={response1} 
                    onChange={(e) => setResponse1(e.target.value)}/>
                </label>
            </div>
            <div className="range-2">
                <label>I feel stressed or anxious
                    <input type="range" 
                    min={1} max={5} 
                    value={response2} 
                    onChange={(e) => setResponse2(e.target.value)}/>
                </label>
            </div>
            <div className="range-3">
                <label>Body scan - am I experiencing pain or discomfort? (also pay attention to acne, excema, etc.)
                    <input type="range" 
                    min={1} max={5} 
                    value={response3} 
                    onChange={(e) => setResponse3(e.target.value)}/>
                </label>
            </div>
            <div className="range-4">
                <label>Sleep quality last night?
                    <input type="range" 
                    min={1} max={5} 
                    value={response4} 
                    onChange={(e) => setResponse4(e.target.value)}/>
                </label>
            </div>
            <div className="range-5">
                <label>My life feels rewarding
                    <input type="range" 
                    min={1} max={5} 
                    value={response5} 
                    onChange={(e) => setResponse5(e.target.value)}/>
                </label>
            </div>
            <div className="range-6">
                <label>I have enough time to get things done
                    <input type="range" 
                    min={1} max={5} 
                    value={response6} 
                    onChange={(e) => setResponse6(e.target.value)}/>
                </label>
            </div>
            <div className="range-7">
                <label>I have a sense of purpose
                    <input type="range" 
                    min={1} max={5} 
                    value={response7} 
                    onChange={(e) => setResponse7(e.target.value)}/>
                </label>
            </div>
            
            <button onClick={handleResponseSubmit}>Next</button>
        </div>

     );
}
 
export default CheckIn2;