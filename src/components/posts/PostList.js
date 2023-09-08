import React, { useEffect, useState } from "react";
import { getPosts, getPostsByCategory, getPostsByTitle, getPostsByUser, getPostsByTag } from "../../managers/posts";
import { getUsers } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link, useNavigate } from "react-router-dom";
import { getTags } from "../../managers/TagManager";
import { PostForm } from "./PostForm.js";
import "./PostList.css";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: 0,
    userId: 0,
    title: "",
    tagId: 0
  });
  const [titleInput, setTitleInput] = useState("");

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getPosts().then((postsData) => setPosts(postsData));
    getUsers().then((usersData) => setUsers(usersData));
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        post.title.toLowerCase().includes(titleInput.toLowerCase())
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="post-list-container"> {/* Updated container class */}
      <h1 className="page-title">Posts</h1>
      <button onClick={() => navigate('/postform')} className="button is-link">Add New Post</button>
      <div className="filter-form"> {/* New parent container for filters */}
        <div className="filter-group"> {/* Filter group */}
          <label htmlFor="category" className="filter-label">Category: </label>
          <select name="category" className="filter-select" onChange={handleCategoryChange}>
            <option value={0}>Select a Category</option>
            {categories.map((category) => (
              <option key={`catFilter--${category.id}`} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
  
        <div className="filter-group"> {/* Filter group */}
          <label htmlFor="filterByUser" className="filter-label">Author: </label>
          <select name="filterByUser" className="filter-select" onChange={handleAuthorChange}>
            <option value={0}>Filter By Shutterbug</option>
            {users.map((user) => (
              <option key={`userFilter--${user.id}`} value={user.id}>
                {user.full_name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="filter-group"> {/* Filter group */}
          <label htmlFor="tag" className="filter-label">Tag: </label>
          <select name="tag" className="filter-select" onChange={handleTagChange}>
            <option value={0}>Select a tag</option>
            {tags.map((tag) => (
              <option key={`tagFilter--${tag.id}`} value={tag.id}>
                {tag.label}
              </option>
            ))}
          </select>
        </div>
  
        <div className="filter-group"> {/* Filter group */}
          <input type="text" value={titleInput} placeholder="Search by Post Title" onChange={handleTitleChange} />
        </div>
      </div>
  
      
  
      <article className="posts">
        {filteredPosts.map((post) => {
          return (
            <section className="post" key={`postList--${post.id}`}>
              <div className="post-divider"> {/* Divider line */}
                <hr className="divider-line" />
              </div>
              <div className="post-title"> {/* Post title */}
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <div className="post-shutterbug"> {/* Post author */}
                By <Link to={`/users/${post?.shutterbug_user?.id}`}>{post?.user_full_name}</Link>
              </div>
              <img className="post-image" src={post.image_url} alt={post.title} />
              <div className="reactions"> {/* Reactions */}
                {post.reactions.map((reaction, index) => (
                  <img key={`reaction-${index}`} src={reaction.image_url} alt={reaction.label} className="reaction-icon" />
                ))}
              </div>
              <div className="post-content"> {/* Post content */}
                "{post?.content}"
              </div>
              <div className="post-published"> {/* Published date */}
                Published: {post?.published_on}
              </div>
              <div className="post-tags"> {/* Tags */}
                Tags: {post.tags.map((tag) => tag.label).join(", ")}
              </div>
            </section>
          );
        })}
      </article>
    </div>
  );
      }