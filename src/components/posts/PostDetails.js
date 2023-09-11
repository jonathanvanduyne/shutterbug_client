import { useNavigate, useParams } from "react-router-dom";
import { getPostById, deletePost } from "../../managers/posts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./postDetails.css";

export const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [reactions, setReactions] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPostDetails() {
            try {
                const response = await getPostById(postId);
                setPost(response);

                const reactionsResponse = await getPostById(postId);
                setReactions(reactionsResponse.reactions);

                const tagsResponse = await getPostById(postId);
                setTags(tagsResponse.tags);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        }

        fetchPostDetails();
    }, [postId]);

    const deleteButton = (postId) => {
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
                Delete
            </button>
        );
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
            <div className="post-details__delete-button-container">
                {deleteButton(post.id)}
            </div>
        </div>
    );
};
