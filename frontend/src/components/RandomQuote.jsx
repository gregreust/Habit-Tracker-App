import React, {useEffect, useState} from 'react';
import axios from 'axios';

const RandomQuote = () => {

    const [quote, setQuote] = useState();

    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = async () => {
        try {
            let response = await axios.get('https://zenquotes.io/api/random/');
            setQuote(response.data);
            console.log(response.data);
        }
        catch (error){
            console.log(error);
        }
       
    };

    return ( 
        <div>{quote}</div>
     );
}
 
export default RandomQuote;