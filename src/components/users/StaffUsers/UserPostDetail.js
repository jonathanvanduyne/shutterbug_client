import React, { useEffect, useState } from "react";
import { deletePost, flagPost, getPosts, getPostsByUser, viewUserPost } from "../../../managers/posts.js";
import { getCurrentUser, getUsers } from "../../../managers/users.js";
import { getCategories } from "../../../managers/categories.js";
import { getTags } from "../../../managers/TagManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteComment, getAllComments, postComment } from "../../../managers/comments.js";

export const UserDetailPosts = ({ user, updateData }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [filters, setFilters] = useState({
        categoryId: 0,
        userId: 0,
        title: "",
        tagId: 0,
    });
    const [titleInput, setTitleInput] = useState("");
    const navigate = useNavigate();
    const { Id } = useParams();
    const [currentUserArray, setCurrentUserArray] = useState([]);
    const currentUser = currentUserArray[0];
    const [commentForm, setCommentForm] = useState({
        post: 0,
        content: "",
    });
    const [activeCommentInputPost, setActiveCommentInputPost] = useState(0);


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // UseEffect to get all posts, users, categories, and tags
    const getData = () => {
        getUsers().then((usersData) => setUsers(usersData));
        getCategories().then((categoriesData) => setCategories(categoriesData));
        getTags().then((tagData) => setTags(tagData));
        getAllComments().then((commentsData) => setComments(commentsData));
        getCurrentUser().then((currentUserArray) => setCurrentUserArray(currentUserArray));
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getPostsByUser(Id).then((postsData) => setPosts(postsData));
        updateData();
    }, [Id]);

    useEffect(() => {
        applyFilters();
    }, [filters, posts]);

    // This useEffect listens to changes in titleInput and updates the filters.title accordingly
    useEffect(() => {
        setFilters({ ...filters, title: titleInput });
    }, [titleInput]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Function to apply filters
    const applyFilters = () => {
        let filteredResults = posts;

        if (filters.categoryId !== 0) {
            filteredResults = filteredResults.filter(
                (post) => post?.category?.id === filters.categoryId
            );
        }

        if (filters.userId !== 0) {
            filteredResults = filteredResults.filter(
                (post) => post?.user?.id === filters.userId
            );
        }

        if (filters.title.trim() !== "") {
            filteredResults = filteredResults.filter((post) =>
                post.title.toLowerCase().includes(filters.title.toLowerCase())
            );
        }

        if (filters.tagId !== 0) {
            filteredResults = filteredResults.filter((post) =>
                post.tags.some((tag) => tag.id === filters.tagId)
            );
        }

        setFilteredPosts(filteredResults);
    };

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value);
        setFilters({ ...filters, categoryId });
    };

    const handleAuthorChange = (event) => {
        const userId = parseInt(event.target.value);
        setFilters({ ...filters, userId });
    };

    const handleTagChange = (event) => {
        const tagId = parseInt(event.target.value);
        setFilters({ ...filters, tagId });
    };

    const handleTitleChange = (event) => {
        setTitleInput(event.target.value);
    };

    const resetFilters = () => {
        setFilters({
            categoryId: 0,
            userId: 0,
            title: "",
            tagId: 0,
        });
        setTitleInput("");
    }; 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const deleteButton = (post) => {
        if (post?.shutterbug_user?.id === currentUser?.id) {
            return (
                <button
                    onClick={async () => {
                        const shouldDelete = window.confirm("Are you sure you want to delete this post?");
                        if (shouldDelete) {
                            try {
                                await deletePost(post?.id);
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
                            placeholder={`Let ${post?.user_first_name} know what you think!`}
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="post-list-container">
            <h1 className="page-title">
                {user?.full_name}'s Posts
            </h1>

            <div className="filter-form">
                <div className="filter-group">
                    <label htmlFor="category" className="filter-label">
                        Category:
                    </label>
                    <select
                        name="category"
                        className="filter-select"
                        onChange={handleCategoryChange}
                    >
                        <option value={0}>Select a Category</option>
                        {categories.map((category) => (
                            <option key={`catFilter--${category.id}`} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="filterByUser" className="filter-label">
                        Author:
                    </label>
                    <select
                        name="filterByUser"
                        className="filter-select"
                        onChange={handleAuthorChange}
                    >
                        <option value={0}>Filter By Shutterbug</option>
                        {users.map((user) => (
                            <option key={`userFilter--${user.id}`} value={user.id}>
                                {user.full_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="tag" className="filter-label">
                        Tag:
                    </label>
                    <select name="tag" className="filter-select" onChange={handleTagChange}>
                        <option value={0}>Select a tag</option>
                        {tags.map((tag) => (
                            <option key={`tagFilter--${tag.id}`} value={tag.id}>
                                {tag.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <input
                        type="text"
                        value={titleInput}
                        placeholder="Search by Post Title"
                        onChange={handleTitleChange}
                    />
                </div>
            </div>

            <div className="reset-filters-container">
                <button onClick={resetFilters} className="button reset-filters">
                    Reset Filters
                </button>
            </div>

            <div className="post-cards">
                {filteredPosts.length !== 0 ? (
                    filteredPosts.map((post) => (
                        <div className="post-card" key={`postList--${post.id}`}>
                            <div className="post-title">
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            </div>
                            <div className="post-details">
                                <div className="post-image">
                                    <img src={post.image_url} alt={post.title} />
                                </div>
                                <div className="post-info">
                                    <div className="post-shutterbug">
                                        By{" "}
                                        <Link to={`/users/${post?.shutterbug_user?.id}`}>
                                            {post?.user_full_name}
                                        </Link>
                                    </div>
                                    <div className="flag-post-button">{flagButton(post)}</div>
                                    <div className="edit-post-button">{editButton(post)}</div>
                                    <div className="reactions">
                                        {post.reactions.map((reaction, index) => (
                                            <img
                                                key={`reaction-${index}`}
                                                src={reaction.image_url}
                                                alt={reaction.label}
                                                className="reaction-icon"
                                            />
                                        ))}
                                    </div>
                                    <div className="post-content">"{post?.content}"</div>
                                    <div className="post-published">
                                        Published: {post?.published_on}
                                    </div>
                                    <div className="post-tags">
                                        Tags: {post.tags.map((tag) => tag.label).join(", ")}
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
                                            ))}
                                            {addCommentButton(post)}
                                            {commentInput(post)}
                                    </div>
                                </div>
                            </div>
                            {deleteButton(post)}
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    );
}
