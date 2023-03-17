import {useState, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Post from '../../components/Post';

const CommunitySupport = () => {


    const [user, token] = useAuth();
    const [allPosts, setAllPosts] = useState();
    const [postText, setPostText] = useState();

    useEffect (() => {
        fetchPosts();
    }, [])

    async function fetchPosts(){
        let response = await axios.get("http://127.0.0.1:8000/api/posts/",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
        setAllPosts(response.data);
    }

    async function handlePost(e){
        e.preventDefault();
        let newPost = {
            text: postText
        }

        await axios.post("http://127.0.0.1:8000/api/posts/", newPost, 
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(setAllPosts());
    }

    return ( 
        <div className="community-feed">
            <div className="create-post-container">
                <form>
                    <input type="textarea" onChange={(e) => setPostText(e)} placeholder="Write a new post"/>
                    <button type="submit" onClick={(e) => handlePost(e)}>Post</button>
                </form>
            </div>
            <ul className="post-feed">
                {allPosts&&allPosts.map((post, index) => {
                    return (<li className="one-post" key={index}>
                        <Post postObject={post}/>
                    </li>
                    )})}
            </ul>
        </div>
     );

}
 
export default CommunitySupport;