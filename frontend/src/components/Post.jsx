import React, {useState, useEffect} from "react";

const Post = ({postObject}) => {

    const [time, setTime] = useState("");

    // const date = postObject.timestamp.substring(0,10);
    // const time = postObject.timestamp.substring(11,16);

    //if post is less than 24 hrs old, show hrs
    //elif post is more than 24 hrs old, show date 
    useEffect(() => {
        findTime(postObject.timestamp);
    }, [])

    function findTime (timestamp) {

        const datetime = new Date(timestamp); // convert datetime string to a Date object
        const now = new Date(); // get the current datetime
        const timeDiff = now.getTime() - datetime.getTime(); // get the time difference in milliseconds
        const hoursDiff = timeDiff / (1000 * 60 * 60); // convert milliseconds to hours

        if (hoursDiff < 24) {
            let roundedTime = Math.floor(hoursDiff);
            if (roundedTime > 1) {
                setTime(roundedTime + " hrs");
            } else {
                setTime(roundedTime + " hr");
            }
        }
        else {
            setTime(formatDate(datetime));
        }
    }
    
    function formatDate(datetime) {
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
          'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const monthName = monthNames[datetime.getMonth()];
        const day = datetime.getDate();
        const suffix = getDaySuffix(day);
      
        return `${monthName} ${day}${suffix}`;
    }
      
    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
      
    
    if (time) {
        return ( 
            <div className='post'>
                {postObject.user.username}
                {postObject.text}
                {postObject.likes}
                {time}
            </div>
        )}
    else {
        return (
            <div className="loading-message">
                <div>Loading posts...</div>
            </div>
        )
    }
}
 
export default Post;