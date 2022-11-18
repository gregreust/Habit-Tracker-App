import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const CheckIn2 = () => {

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [dataPosted, setDataPosted] = useState(false);
    const [response1, setResponse1] = useState(1);
    const [response2, setResponse2] = useState(1);
    const [response3, setResponse3] = useState(1);
    const [response4, setResponse4] = useState(1);
    const [response5, setResponse5] = useState(1);
    const [response6, setResponse6] = useState(1);
    const [response7, setResponse7] = useState(1);

    const handleResponseSubmit = async () => {
        let new_check_in = {
            check_in_1: response1,
            check_in_2: response1,
            check_in_3: response1,
            check_in_4: response1,
            check_in_5: response1,
            check_in_6: response1,
            check_in_7: response1,
        }
        postData(new_check_in).then(setDataPosted(true));
    }

    const postData = async (new_check_in) => {
        await axios.post('http://127.0.0.1:8000/api/checkin/', new_check_in,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
    }

    if (!dataPosted){
        return ( 
            <div className="check-in-screen-2">
                {/* HOW TO MAKE A RANGE COMPONENT TO RECYCLE??? */}
                <h4>How are you doing today?</h4>
                <div className="range-1">
                    <div className="left1">Low</div>
                    <label>My energy level throughout the day
                        <input type="range" 
                        min={1} max={5} 
                        value={response1} 
                        onChange={(e) => setResponse1(e.target.value)}/>
                    </label>
                    <div className="right1">High</div>
                </div>
                <div className="range-2">
                    <div className="left2">Not often</div>
                    <label>I feel stressed or anxious
                        <input type="range" 
                        min={1} max={5} 
                        value={response2} 
                        onChange={(e) => setResponse2(e.target.value)}/>
                    </label>
                    <div className="right2">Constantly</div>
                </div>
                <div className="range-3">
                    <div className="left3">Body feels great</div>
                    <label>Body scan - am I experiencing pain or discomfort? (also pay attention to acne, excema, etc.)
                        <input type="range" 
                        min={1} max={5} 
                        value={response3} 
                        onChange={(e) => setResponse3(e.target.value)}/>
                    </label>
                    <div className="right3">Body feels terrible</div>
                </div>
                <div className="range-4">
                    <div className="left4">Awful</div>
                    <label>Sleep quality last night?
                        <input type="range" 
                        min={1} max={5} 
                        value={response4} 
                        onChange={(e) => setResponse4(e.target.value)}/>
                    </label>
                    <div className="right4">Well rested!</div>
                </div>
                <div className="range-5">
                    <div className="left5">Strongly disagree</div>
                    <label>My life feels rewarding
                        <input type="range" 
                        min={1} max={5} 
                        value={response5} 
                        onChange={(e) => setResponse5(e.target.value)}/>
                    </label>
                    <div className="right5">Strongly agree</div>
                </div>
                <div className="range-6">
                    <div className="left6">Strongly disagree</div>
                    <label>I have enough time to get things done
                        <input type="range" 
                        min={1} max={5} 
                        value={response6} 
                        onChange={(e) => setResponse6(e.target.value)}/>
                    </label>
                    <div className="right6">Strongly agree</div>
                </div>
                <div className="range-7">
                    <div className="left7">Strongly disagree</div>
                    <label>I have a sense of purpose
                        <input type="range" 
                        min={1} max={5} 
                        value={response7} 
                        onChange={(e) => setResponse7(e.target.value)}/>
                    </label>
                    <div className="right7">Strongly agree</div>
                </div>
                
                <button onClick={handleResponseSubmit}>Next</button>
            </div>
        );
    } else {
        return (
            <div className="check-in-confirm">
                <h3>Submitted!</h3>
                <button onClick={() => navigate('/')}>Return to menu</button>
            </div>
        );
    }
}
 
export default CheckIn2;