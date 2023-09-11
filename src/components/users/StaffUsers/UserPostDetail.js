import React, { useEffect, useState } from "react";
import { deletePost, getPosts, getPostsByUser, viewUserPost } from "../../../managers/posts.js";
import { getUsers } from "../../../managers/users.js";
import { getCategories } from "../../../managers/categories.js";
import { getTags } from "../../../managers/TagManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UserDetailPosts = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({
        categoryId: 0,
        userId: 0,
        title: "",
        tagId: 0,
    });
    const [titleInput, setTitleInput] = useState("");
    const navigate = useNavigate();
    const { Id } = useParams();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // UseEffect to get all posts, users, categories, and tags
    const getData = () => {
        getUsers().then((usersData) => setUsers(usersData));
        getCategories().then((categoriesData) => setCategories(categoriesData));
        getTags().then((tagData) => setTags(tagData));
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
    }

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

    return (
        <div className="post-list-container">
            <h1 className="page-title">Your Posts</h1>

            <button onClick={() => navigate("/postform")} className="button is-link">
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
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    );
}
