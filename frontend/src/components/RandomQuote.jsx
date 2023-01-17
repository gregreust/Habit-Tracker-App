import React, {useEffect, useState} from 'react';
import axios from 'axios';

const RandomQuote = () => {

    const [quote, setQuote] = useState();
    const [dataBoolean, setDataBoolean] = useState(false);

    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = async () => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/quotes/');
            setQuote(response.data);
            setDataBoolean(true);
            console.log(response.data);
        }
        catch (error){
            console.log(error);
        }
       
    };

    if (dataBoolean) {
        return ( 
        <div className='quote-container'>
            <div className="text">{quote.text}</div>
            <div className="author">- {quote.author}</div>
        </div>
        );
    } else {
        return (
            <div>Loading quote ... </div>
        )
    }
}
 
export default RandomQuote;