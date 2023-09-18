import { useNavigate, useParams } from "react-router-dom";
import { getPostById, deletePost, flagPost } from "../../managers/posts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./postDetails.css";
import { deleteComment, getAllComments, postComment } from "../../managers/comments.js";
import { getCurrentUser } from "../../managers/users.js";

export const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [reactions, setReactions] = useState([]);
    const [tags, setTags] = useState([]);

    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState({
        post: 0,
        content: "",
    });
    const [activeCommentInputPost, setActiveCommentInputPost] = useState(0);

    const navigate = useNavigate();
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];

    const getData = async () => {
        const response = await getPostById(postId);
        setPost(response);

        const reactionsResponse = await getPostById(postId);
        setReactions(reactionsResponse.reactions);

        const tagsResponse = await getPostById(postId);
        setTags(tagsResponse.tags);

        const commentsResponse = await getAllComments();
        setComments(commentsResponse);

        const currentUserArray = await getCurrentUser();
        setCurrentUserArray(currentUserArray);
    };

    useEffect(() => {
        getData();
    }, [postId]);

    const deleteButton = (post) => {
        if (post?.shutterbug_user?.id === currentUser?.id) {
            return (
                <button
                    onClick={async () => {
                        const shouldDelete = window.confirm("Are you sure you want to delete this post?");
                        if (shouldDelete) {
                            try {
                                await deletePost(postId);
                                navigate(`/posts`);
                            } catch (error) {
                                console.error("Error deleting post:", error);
                            }
                        }
                    }}
                    className="post-details__delete-button"
                >
                    Delete Post
                </button>
            );
        }

        return null;
    };

    const editButton = (post) => {
        return currentUser?.id === post?.shutterbug_user?.id ? (
            <button
                onClick={() => {
                    navigate(`/my-posts/${post.id}/edit`);
                }}
            >
                Edit Post
            </button>
        ) : null;
    };

    const flagButton = (post) => {
        const isFlagged = post?.flagged;

        return currentUser?.id !== post?.shutterbug_user?.id ? (
            <div>
                <button
                    className={`material-symbols-outlined flag-button ${isFlagged ? 'flagged' : ''}`}
                    onClick={() =>
                        flagPost(post).then(() => getData())}
                >
                    Flag
                </button>
                <p className="flag-post-text">{!isFlagged ? "Flag this post" : "Unflag this post"}</p>
            </div>
        ) : null;
    };


    const addCommentButton = (post) => {
        // Hide the add comment button if in comment input mode
        if (activeCommentInputPost === post.id) {
            return null;
        }
        return (
            <button
                onClick={() => {
                    setCommentForm({ post: post.id, content: "" }); // Clear the comment form
                    setActiveCommentInputPost(post.id);
                }}
            >
                Add Comment
            </button>
        );
    };

    const commentInput = (post) => {
        // Show the comment input and submit button only for the active comment input post
        if (activeCommentInputPost !== post.id) {
            return null;
        }


        return (
            <form className="comment-form">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Comment:</label>
                        <input
                            type="text"
                            name="content"
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Comment"
                            value={commentForm.content}
                            onChange={(evt) => {
                                const copy = { ...commentForm };
                                copy.content = evt.target.value;
                                setCommentForm(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <button
                    className="btn btn-primary"
                    onClick={(evt) => {
                        evt.preventDefault();
                        postComment(commentForm).then(() => {
                            // Reset the comment input and hide it
                            setCommentForm({ post: 0, content: "" });
                            setActiveCommentInputPost(0);
                            getData();
                        });
                    }}
                >
                    Save Comment
                </button>
            </form>
        );
    };

    const deleteCommentButton = (comment) => {
        const handleDelete = () => {
            const shouldDelete = window.confirm(
                "Are you sure you want to delete this comment?"
            );
            if (shouldDelete) {
                deleteComment(comment.id).then(() => {
                    getAllComments().then((commentsData) => setComments(commentsData));
                });
            }
        };

        return currentUser?.id === comment?.shutterbug_user?.id ? (
            <button onClick={handleDelete}>Delete Comment</button>
        ) : null;
    };

    return (
        <div className="post-details">
            <div className="post-details__divider">
                <hr className="post-details__divider-line" />
            </div>
            <div className="post-details__title">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            <div className="post-details__shutterbug">
                By{" "}
                <Link to={`/users/${post?.shutterbug_user?.id}`}>
                    {post?.user_full_name}
                </Link>
            </div>
            <div className="flag-post-button">{flagButton(post)}</div>
            <div className="edit-post-button">{editButton(post)}</div>

            <img className="post-details__image" src={post.image_url} alt={post.title} />
            <div className="post-details__reactions">
                {reactions.map((reaction, index) => (
                    <img
                        key={`reaction-${index}`}
                        src={reaction?.image_url}
                        alt={reaction?.label}
                        className="post-details__reaction-icon"
                    />
                ))}
            </div>
            <div className="post-details__content">"{post?.content}"</div>
            <div className="post-details__published">Published: {post?.published_on}</div>
            <div className="post-details__tags">
                Tags: {tags.map((tag) => tag?.label).join(", ")}
            </div>
            <div className="post-comments">
                Comments: {comments
                    .filter((comment) => comment?.post?.id === post.id)
                    .map((comment) => (
                        <div key={`comment-${comment.id}`} className="comment">
                            <Link
                                to={`/users/${comment?.shutterbug_user?.id}`}
                                className="user-link"
                            >
                                {comment?.shutterbug_user?.full_name + ": "}
                            </Link>
                            {comment.content}
                            {deleteCommentButton(comment)}
                        </div>
                    )
                    )
                    }
            </div>
            <div className="add-comment-button">{addCommentButton(post)}</div>
            <div className="comment-input">{commentInput(post)}</div>
            <div className="post-details__delete-button-container">
                <div className="delete-post-button">{deleteButton(post)}</div>
            </div>
        </div>
    );
};
