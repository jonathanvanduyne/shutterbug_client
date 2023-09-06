import React, { useEffect, useState } from "react";
import { getPosts, getPostsByCategory, getPostsByTitle, getPostsByUser, getPostsByTag} from "../../managers/posts";
import { getUsers } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link } from "react-router-dom";
import { getTags } from "../../managers/TagManager";

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
  const [titleInput, setTitleInput] = useState(""); // New state to track the input field value

  useEffect(() => {
    getPosts().then((postsData) => setPosts(postsData));
    getUsers().then((usersData) => setUsers(usersData));
    getCategories().then((categoriesData) => setCategories(categoriesData));
    getTags().then((tagData) => setTags(tagData));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, posts]);

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
      getPostsByTag(filters.tagId).then((posts) => setFilteredPosts(posts))
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
    const tagId = parseInt(event.target.value)
    setFilters({ ...filters, tagId });
  };

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value); // Update the title input state
  };

  const handleTitleSubmit = () => {
    setFilters({ ...filters, title: titleInput }); // Update the title filter
  };

  return (
    <div className="column"style={{ margin: "0rem 3rem" }}>
      <h1 className="title">Posts</h1>
      <div className="form-group">
        <label htmlFor="category" className="subtitle">Category: </label>
        <select name="category" className="form-control select" onChange={handleCategoryChange}>
          <option value={0}>Select a category</option>
          {categories.map((category) => (
            <option key={`catFilter--${category.id}`} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        <label htmlFor="filterByUser" className="subtitle">Author: </label>
        <select name="filterByUser" className="form-control select" onChange={handleAuthorChange}>
          <option value={0}>Filter By Author</option>
          {users.map((user) => (
            <option key={`userFilter--${user.id}`} value={user.id}>
              {user.full_name}
            </option>
          ))}
        </select>
        

        <div>
          <input type="text" value={titleInput} onChange={handleTitleChange} />
          <button onClick={handleTitleSubmit}>Search</button>
        </div>
      </div>

       {/* Filter by tag is not set up for this version yet 
         <label htmlFor="tag">Tag: </label>
        <select name="tag" className="form-control" onChange={handleTagChange}>
          <option value={0}>Select a tag</option>
          {tags.map((tag) => (
            <option key={`tagFilter--${tag.id}`} value={tag.id}>
              {tag.label}
            </option>
          ))}
        </select> */}

      <article className="posts">
        {filteredPosts.map((post) => {
          return (
            <section className="post" key={`postList--${post.id}`}>
              <div>==============================</div>
              <div>
                Post Title: <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <div>
                Author: <Link to={`/users/${post?.user?.id}`}>{post?.user?.full_name}</Link>
              </div>
              <div>Category: {post?.category?.label}</div>
            </section>
          );
        })}
      </article>
    </div>
  );
};
