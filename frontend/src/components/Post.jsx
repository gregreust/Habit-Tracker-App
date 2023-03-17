import React from "react";

const Post = ({postObject}) => {

    const date = postObject.timestamp.substring(0,10);
    const time = postObject.timestamp.substring(11,16);

    //if post is less than 24 hrs old, show hrs
    //elif post is more than 24 hrs old, show date 

    if (date&&time) {
        return ( 
            <div className='post'>
                {postObject.user.username}
                {postObject.text}
                {postObject.likes}
                {date}
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