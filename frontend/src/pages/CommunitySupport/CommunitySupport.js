import {useState} from 'react';

const CommunitySupport = () => {

    const [allPosts, setAllPosts] = useState();
    const [postText, setPostText] = useState();

    async function fetchPosts(){
        let response = await axios.get("http://127.0.0.1:8000/api/posts/");
        setAllPosts(response.data);
    }

    async function handlePost(e){
        
        let newPost = {
            text: postText
        }

        await axios.post("http://127.0.0.1:8000/api/posts/", newPost)
    }

    return ( 
        <div className="community-feed">
            <div className="create-post-container">
                <form onSubmit={(e) => handlePost(e)}>
                    <input type="textarea" onChange={(e) => setPostText(e)} placeholder="Write a new post"/>
                    <button type="submit">Post</button>
                </form>
            </div>
            <div className="post-feed">
                {allPosts&&allPosts.map((post, index) => {
                    return (<li className="one-post">
                        {post.user.username}
                        {post.text}
                        {post.likes}
                        {post.timestamp}
                    </li>
                    )})}
            </div>
        </div>
     );

}
 
export default CommunitySupport;