import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditComment = () => {
    const [newComment, setComment] = useState({
        post: 0,
        author: 0,
        content: ""
    });

    const { commentId, postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch comment data when the component mounts
        fetch(`http://localhost:8000/comments/${commentId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setComment(data); // Update the state with the fetched comment data
        });
    }, []);

    const changeCommentState = (domEvent) => {
        // Update the specific field in the newComment state
        const updatedComment = { ...newComment };
        updatedComment[domEvent.target.name] = domEvent.target.value;
        setComment(updatedComment);
    }

    return (
        <form className="CommentForm">
            <h2 className="commentForm__title">Post Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="comment">Content: </label>
                    {/* Use the correct 'name' attribute and value from the state */}
                    <input
                        type="text"
                        name="content" // Use the correct name to match the state property
                        required
                        autoFocus
                        className="form-control"
                        value={newComment.content} // Bind the value from the state
                        onChange={changeCommentState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const newestComment = {
                        post: newComment?.post?.id, // Use the correct property from the state
                        author: newComment?.author?.id, // Use the correct property from the state
                        content: newComment.content
                    };
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/comments/${commentId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(newestComment)
                    })
                    .then(() => navigate(`/comments/${newComment?.post?.id}`)); // Navigate after successful update
                }}
                className="btn btn-primary"
            >
                Save
            </button> 
            <button onClick={()=>navigate(`/comments/${newComment?.post?.id}`)}> Cancel </button>
        </form>
    );
};

