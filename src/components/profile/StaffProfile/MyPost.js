import React, { useEffect, useState } from "react";
import { deletePost, flagPost, getPosts, getPostsByUser, viewUserPost } from "../../../managers/posts.js";
import { getUsers } from "../../../managers/users.js";
import { getCategories } from "../../../managers/categories.js";
import { getTags } from "../../../managers/TagManager.js";
import { Link, useNavigate } from "react-router-dom";
import "./MyPosts.css"; // Import the CSS file
import { deleteComment, getAllComments, postComment } from "../../../managers/comments.js";

export const MyPosts = ({ currentUser }) => {
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
    const Id = currentUser?.id;
    const navigate = useNavigate();
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
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getPostsByUser(Id).then((postsData) => setPosts(postsData));
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

    const ShowOnlyCurrentUserPosts = () => {
        const currentUserPosts = filteredPosts.filter((post) => post?.shutterbug_user?.id === currentUser.id);
        setFilteredPosts(currentUserPosts);
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Delete & Edit buttons
    const deleteButton = (post) => {
        const handleDelete = () => {
            const shouldDelete = window.confirm(
                "Are you sure you want to delete this post?"
            );
            if (shouldDelete) {
                deletePost(post.id).then(() => {
                    getPostsByUser(Id).then((postsData) => setPosts(postsData));
                });
            }
        };

        return currentUser.id === post?.shutterbug_user?.id ? (
            <button className="delete-post-button" onClick={handleDelete}>
                Delete Post
            </button>
        ) : null;
    };

    const editButton = (post) => {
        return currentUser.id === post?.shutterbug_user?.id ? (
            <button
                className="edit-post-button"
                onClick={() => {
                    navigate(`/my-posts/${post.id}/edit`);
                }}
            >
                Edit
            </button>
        ) : null;
    };

    const isUnnapproved = (post) => {
        if (post.approved === false) {
            return (
                <p className="unapproved-post">
                    Post is unapproved by Admin and cannot be seen on Shutterbug, please revise or delete.
                </p>
            );
        }
    };

    const flagButton = (post) => {
        const isFlagged = post?.flagged;

        return currentUser?.id !== post?.shutterbug_user?.id ? (
            <div>
                <button
                    className={`material-symbols-outlined flag-button ${isFlagged ? 'flagged' : ''}`}
                    onClick={() => flagPost(post).then(() => getData())}
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
                className="add-comment-button"
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
                    className="btn btn-primary save-comment-button"
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
            <button className="delete-comment-button" onClick={handleDelete}>
                Delete Comment
            </button>
        ) : null;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="post-list-container">
            <h1 className="page-title">Your Posts</h1>

            <button
                onClick={() => navigate("/postform")}
                className="add-post-button"
            >
                Add New Post
            </button>

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
                            <option
                                key={`catFilter--${category.id}`}
                                value={category.id}
                            >
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
                            <option
                                key={`userFilter--${user.id}`}
                                value={user.id}
                            >
                                {user.full_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="tag" className="filter-label">
                        Tag:
                    </label>
                    <select
                        name="tag"
                        className="filter-select"
                        onChange={handleTagChange}
                    >
                        <option value={0}>Select a tag</option>
                        {tags.map((tag) => (
                            <option
                                key={`tagFilter--${tag.id}`}
                                value={tag.id}
                            >
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
                        className="title-filter-input"
                    />
                </div>
            </div>

            <div className="reset-filters-container">
                <button onClick={resetFilters} className="reset-filters-button">
                    Reset Filters
                </button>
            </div>

            <div className="post-cards">
                {filteredPosts.length !== 0 ? (
                    filteredPosts.map((post) => (
                        <div className="post-card" key={`postList--${post.id}`}>
                            {isUnnapproved(post)}
                            <div className="post-title">
                                <Link to={`/posts/${post.id}`} className="post-link">
                                    {post.title}
                                </Link>
                            </div>
                            <div className="post-actions">
                                {editButton(post)}
                                {deleteButton(post)}
                            </div>
                            <div className="post-details">
                                <div className="post-image">
                                    <img src={post.image_url} alt={post.title} />
                                </div>
                                <div className="post-info">
                                    <div className="post-shutterbug">
                                        By{" "}
                                        <Link
                                            to={`/users/${post?.shutterbug_user?.id}`}
                                            className="shutterbug-link"
                                        >
                                            {post?.user_full_name}
                                        </Link>
                                    </div>
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
                                    <div className="post-content">
                                        "{post?.content}"
                                    </div>
                                    <div className="post-published">
                                        Published: {post?.published_on}
                                    </div>
                                    <div className="post-tags">
                                        Tags:{" "}
                                        {post.tags.map((tag) => tag.label).join(", ")}
                                    </div>
                                </div>
                            </div>
                            <div className="post-comments">
                                Comments:{" "}
                                {comments
                                    .filter((comment) => comment?.post?.id === post.id)
                                    .map((comment) => (
                                        <div
                                            key={`comment-${comment.id}`}
                                            className="comment"
                                        >
                                            <Link
                                                to={`/users/${comment?.shutterbug_user?.id}`}
                                                className="user-link"
                                            >
                                                {comment?.shutterbug_user?.full_name +
                                                    ": "}
                                            </Link>
                                            {comment.content}
                                            {deleteCommentButton(comment)}
                                        </div>
                                    ))}
                                {addCommentButton(post)}
                                {commentInput(post)}
                            </div>
                            {flagButton(post)}
                        </div>
                    ))
                ) : (
                    <div className="no-posts-message">
                        You do not have any posts yet.
                    </div>
                )}
            </div>
        </div>
    );
};
