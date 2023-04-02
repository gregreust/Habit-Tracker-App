import React, {useState, useEffect} from "react";
import axios from "axios";
import Heart from "react-heart";
import useAuth from "../hooks/useAuth";

const Post = ({postObject}) => {

    const [user, token] = useAuth();
    const [time, setTime] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState();

    
    useEffect(() => {
        findTime(postObject.timestamp);
        findLikeCount();
    }, [])

    function findTime (timestamp) {

        //if post is less than 24 hrs old, show hrs
        //if post is more than 24 hrs old, show date 

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
      
    async function findLikeCount () {
        let response = await axios.get(`http://127.0.0.1:8000/api/posts/likes/${postObject.id}/`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        setLikeCount(response.data);
    }

    async function handleLike () {
        if (isLiked === true) {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            await axios.patch(`http://127.0.0.1:8000/api/posts/${postObject.id}/`, 
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
    }

    if (time) {
        return ( 
            <div className='post'>
                <div className="post-top">
                    <div>{postObject.user.username}</div>
                    <div>{time}</div>
                </div>
                <div className="post-body">{postObject.text}</div>
                <div className="post-bottom">
                    {likeCount}
                        <Heart isActive={isLiked}
                            style={{ width: "1.5rem" }}
                            activeColor = "red" 
                            inactiveColor = "grey" 
                            animationTrigger = "hover" 
                            animationScale = {1.5}
                            onClick={() => handleLike()}/>
                </div>
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