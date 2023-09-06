/* import { useEffect, useState } from "react";
import { getUserById } from "../../managers/users";

export const SubscribedUserPosts = ({token}) => {
    const [subscribedPosts, setSubscribedPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchSubscribedPosts();
    }, []);

    const fetchSubscribedPosts = async () => {
        const response = await fetch("http://localhost:8088/", {
            headers: {
                Authorization: localStorage.getItem("auth_token"),
            },
        });

        const data = await response.json();
        // Check if response is array
        if (Array.isArray(data)) {
            const notMyPosts = data.filter((post) => post.author_id !== parseInt(token));
            setSubscribedPosts(notMyPosts);
        }
        // Check if response is object with message
        if (data.message) {
            setSubscribedPosts(data)
        }
        
    }

    return (
        <>
            <h1>Welcome to Your Homepage!</h1>
            {subscribedPosts.length > 0 ? (
                <ul>
                    {subscribedPosts.map((post) => (
                        <li key={post.id}>
                            <div>===================================================</div>
                            <p>Author: {post.author_username}</p>
                            <img
                                className="author__postIMG"
                                src={post.image_url}
                            />
                            <p>Title: {post.title}</p>
                            <p>Category: {post.category_label}</p>
                            <p>Publication Date: {post.publication_date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{subscribedPosts?.message}</p>

            )}
            
        </>
    );
}; */