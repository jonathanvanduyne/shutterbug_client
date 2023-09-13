import React, { useEffect, useState } from "react";
import {
    UnapprovePost, deletePost, flagPost, getFlaggedPosts, getPosts, getUnapprovedPosts,
} from "../../../managers/posts.js";
import { getCurrentUser, getUsers } from "../../../managers/users.js";
import { getTags } from "../../../managers/TagManager.js";
import { getCategories } from "../../../managers/categories.js";
import { getAllComments } from "../../../managers/comments.js";
import { Link, useNavigate } from "react-router-dom";

import "./naughtyPostsMonitor.css"; // Import the CSS file

export const FlaggedAndUnapprovedPostList = () => {
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

    const getData = () => {
        getFlaggedPosts().then((postsData) => setPosts(postsData));
        getUnapprovedPosts().then((postsData) => posts.push(postsData));
        getUsers().then((usersData) => setUsers(usersData));
        getCategories().then((categoriesData) => setCategories(categoriesData));
        getTags().then((tagData) => setTags(tagData));
        getAllComments().then((commentsData) => setComments(commentsData));
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, posts]);

    useEffect(() => {
        setFilters({ ...filters, title: titleInput });
    }, [titleInput]);

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
        getData();
    };

    const flagButton = (post) => {
        const isFlagged = post?.flagged;

        return (
            <div>
                <button
                    className={`material-symbols-outlined flag-button ${isFlagged ? "flagged" : ""
                        }`}
                    onClick={() => flagPost(post).then(() => getData())}
                >
                    Flag
                </button>
                <p className="flag-post-text">
                    {!isFlagged ? "Flag this post" : "Unflag this post"}
                </p>
            </div>
        );
    };

    const approvalButton = (post) => {
        const isApproved = post?.approved;
        const buttonText = isApproved ? "Unapprove" : "Approve";

        return (
            <div>
                <button
                    className={`material-symbols-outlined approve-button ${isApproved ? "approved" : "disapproved"
                        }`}
                    onClick={() => UnapprovePost(post).then(() => getData())}
                >
                    {buttonText}
                </button>
            </div>
        );
    };


    return (
        <div className="post-list-container">
            <div className="header-links">
                <Link to="/users" className="user-list-link">
                    List of Users
                </Link>
                <Link to="/flaggedPosts" className="flagged-posts-link">
                    Flagged Posts
                </Link>
            </div>

            <div className="filter-form">
                {/* ... Your filter form code ... */}
            </div>

            <div className="reset-filters-container">
                <button onClick={resetFilters} className="reset-filters-button">
                    Reset Filters
                </button>
            </div>

            <article className="posts">
                {filteredPosts.length === 0 ? (
                    <p>No Flagged or Unapproved Posts</p>
                ) : (
                    filteredPosts.map((post) => (
                        <section className="post" key={`postList--${post.id}`}>
                            <div className="flag-post-button">{flagButton(post)}</div>
                            <div className="approve-post-button">{approvalButton(post)}</div>
                            <div className="post-divider">
                                <hr className="divider-line" />
                            </div>
                            <div className="post-title">
                                <Link to={`/posts/${post.id}`} className="post-link">
                                    {post.title}
                                </Link>
                            </div>
                            <div className="post-shutterbug">
                                By{" "}
                                <Link
                                    to={`/users/${post?.shutterbug_user?.id}`}
                                    className="user-link"
                                >
                                    {post?.user_full_name}
                                </Link>
                            </div>
                            <img
                                className="post-image"
                                src={post.image_url}
                                alt={post.title}
                            />
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
                                Comments:{" "}
                                {comments
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
                                        </div>
                                    ))}
                            </div>
                        </section>
                    ))
                )}
            </article>
        </div>
    );
}      