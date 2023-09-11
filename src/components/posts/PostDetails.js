import { useNavigate, useParams } from "react-router-dom";
import { getPostById, deletePost } from "../../managers/posts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    }, []);

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
                className="submission__delete small-button"
            >
                Delete
            </button>
        );
    };

    return (
        <div className="post" key={`postList--${post.id}`}>
            <div className="post-divider">
                <hr className="divider-line" />
            </div>
            <div className="post-title">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            <div className="post-shutterbug">
                By{" "}
                <Link to={`/users/${post?.shutterbug_user?.id}`}>
                    {post?.user_full_name}
                </Link>
            </div>
            <img className="post-image" src={post.image_url} alt={post.title} />
            <div className="reactions">
                {reactions.map((reaction, index) => (
                    <img
                        key={`reaction-${index}`}
                        src={reaction?.image_url}
                        alt={reaction?.label}
                        className="reaction-icon"
                    />
                ))}
            </div>
            <div className="post-content">"{post?.content}"</div>
            <div className="post-published">Published: {post?.published_on}</div>
            <div className="post-tags">
                Tags: {tags.map((tag) => tag?.label).join(", ")}
            </div>
            <div>{deleteButton(post.id)}</div>
        </div>
    );
};
