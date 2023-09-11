import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../../managers/posts";
import { getCurrentUser, getUsers } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link, useNavigate } from "react-router-dom";
import { getTags } from "../../managers/TagManager";
import "./PostList.css";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [users, setUsers] = useState([]);
  const [currentUserArray, setCurrentUserArray] = useState([]);
  const currentUser = currentUserArray[0];

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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //UseEffect to get all posts, users, categories, and tags
  useEffect(() => {
    getPosts().then((postsData) => setPosts(postsData));
    getUsers().then((usersData) => setUsers(usersData));
    getCurrentUser().then((userData) => setCurrentUserArray(userData));
    getCategories().then((categoriesData) => setCategories(categoriesData));
    getTags().then((tagData) => setTags(tagData));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, posts]);

  // This useEffect listens to changes in titleInput and updates the filters.title accordingly
  useEffect(() => {
    setFilters({ ...filters, title: titleInput });
  }, [titleInput]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Function to apply filters
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
  //Delete & Edit buttons
  const deleteButton = (postId) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (shouldDelete) {
        deletePost(postId).then(() => {
          getPosts().then((postsData) => setPosts(postsData));
        });
      }
    };

    return currentUser.id === postId ? (
      <button onClick={handleDelete}>Delete</button>
    ) : null;
  };

  const editButton = (post) => {
    return currentUser.id === post?.shutterbug_user?.id ?
      (
        <button
          onClick={() => {
            navigate(`/my-posts/${post.id}/edit`);
          }}
        >
          Edit
        </button>
      )
      : null;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="post-list-container">
      <h1 className="page-title">Posts</h1>

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
          <select
            name="tag"
            className="filter-select"
            onChange={handleTagChange}
          >
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

      <span>
        <button onClick={ShowOnlyCurrentUserPosts} className="button current-user-posts">
          Show Only My Posts
        </button>
      </span>

      <div className="reset-filters-container">
        <button onClick={resetFilters} className="button reset-filters">
          Reset Filters
        </button>
      </div>

      <article className="posts">
        {filteredPosts.map((post) => {
          return (
            <section className="post" key={`postList--${post.id}`}>
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
              <div>{editButton(post)}</div>
              <div>{deleteButton(post.id)}</div>
            </section>
          );
        })}
      </article>
    </div>
  );
};
