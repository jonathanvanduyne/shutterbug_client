import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";


export const PostEdit = () => {
    const [newPost, setPost] = useState({});
    const [categories, setCategories] = useState([])
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
            });
    }, []);

    useEffect(() => {
        // Fetch comment data when the component mounts
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                data.category= data.category.id
                setPost(data); 
                // Update the state with the fetched comment data
            });
    }, []);

    const changePostState = (domEvent) => {
        // Update the specific field in the newPost state
        const updatedPost = { ...newPost };
        updatedPost[domEvent.target.name] = domEvent.target.value;
        setPost(updatedPost);
    }

    return (
        <form className="postForm column">
            <h2 className="postFormHeader title">Edit a Post</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers" className="subtitle">Title: </label>
                    <input type="text" name="title" required className="form-control input"
                        value={newPost.title}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers" className="subtitle">Content: </label>
                    <input type="text" name="content" required className="form-control input"
                        value={newPost.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="subtitle">Category:</label>
                    <select
                        className="select"
                        value={newPost?.category}
                        onChange={(event) => {
                            const updatedCategory = parseInt(event.target.value);
                            changePostState({ target: { name: "category", value: updatedCategory } });
                        }}
                        name="category"
                    >
                        <option value="0">Select Your Category</option>
                        {categories.map((category) => (
                            <option
                                key={`categoryType--${category.id}`}
                                value={category.id}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers" className="subtitle">Image: </label>
                    <input type="text" name="image_url" required className="form-control input"
                        value={newPost.image_url}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const newestPost = {
                        user: newPost?.user?.id, // Use the correct property from the state
                        category: parseInt(newPost?.category), // Use the correct property from the state
                        title: newPost.title,
                        image_url: newPost.image_url,
                        content: newPost.content,
                        approved: newPost.approved,
                        publication_date: newPost.publication_date
                    };
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/posts/${newPost.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(newestPost)
                    })
                        .then(() => navigate(`/my-posts`)); // Navigate after successful update
                }}
                className="btn btn-primary"
            >
                Save
            </button>
            <button onClick={() => navigate(`/my-posts}`)}> Cancel </button>
        </form>
    );
};
