import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../../managers/posts";
import { getCurrentUser, getUsers } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link, useNavigate } from "react-router-dom";
import { getTags } from "../../managers/TagManager";
import "./PostList.css";

export const UserPost = () => {
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

    // Filter to display only posts from the current user
    filteredResults = filteredResults.filter(
      (post) => post.shutterbug_user.id === currentUser.id
    );

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

  return (
    <div className="post-list-container">
      <h1 className="page-title">Posts</h1>
      <button onClick={() => navigate("/postform")} className="button is-link">
        Add New Post
      </button>

      <div className="filter-form">
        {/* Your filter form code remains the same */}
      </div>

      <article className="posts">
        {filteredPosts.map((post) => {
          return (
            <section className="post" key={`postList--${post.id}`}>
              {/* Your post rendering code remains the same */}
            </section>
          );
        })}
      </article>
    </div>
  );
};
