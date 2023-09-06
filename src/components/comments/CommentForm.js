import { useNavigate, useParams } from "react-router-dom";
import { postComment } from "../../managers/comments";
import { useEffect, useState } from "react";
import { getPostById } from "../../managers/posts";
import { getUserByToken } from "../../managers/tokens";

export const CommentForm = () => {
    const { postId } = useParams()
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()
    const [ comment, setComment ] = useState({
        post: 0,
        author: 0,
        content: ""
    })
    const [post, setPost] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getPostById(postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])

    useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])


    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const commentToSendToAPI = {
            post: post.id,
            author: currentUser.id,
            content: comment.content
        }
        postComment(commentToSendToAPI)
            .then(() => {
                navigate(`/posts/${postId}`);
            });
    };


    return (
        <form className="commentForm">
            <h2 className="commentFormHeader">Leave a comment for "{post.title}"</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="commentHTML" className="commentContent">Comment:</label>
                    <input
                        required autoFocus
                        style={{ width: "30rem", height: "3rem" }}
                        type="text"
                        className="form-control"
                        placeholder="Tell us what you really think"
                        value={comment.content}
                        onChange={(evt) => {
                            const copy = {...comment}
                            copy.content = evt.target.value
                            setComment(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary"
            >
                Submit
            </button>
        
        </form>
    )
}