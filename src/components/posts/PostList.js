import React, { useEffect, useState } from "react";
import { getPosts, deletePost, flagPost } from "../../managers/posts";
import { getCurrentUser, getUsers } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link, useNavigate } from "react-router-dom";
import { getTags } from "../../managers/TagManager";
import { deleteComment, getAllComments, postComment } from "../../managers/comments.js";
import { FlagIcon } from '@heroicons/react/solid';

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [users, setUsers] = useState([]);
  const [currentUserArray, setCurrentUserArray] = useState([]);
  const currentUser = currentUserArray[0];

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    post: 0,
    content: "",
  });
  const [activeCommentInputPost, setActiveCommentInputPost] = useState(0);

  const [filters, setFilters] = useState({
    categoryId: 0,
    userId: 0,
    title: "",
    tagId: 0,
  });
  const [titleInput, setTitleInput] = useState("");

  const navigate = useNavigate();

  const getData = () => {
    getPosts().then((postsData) => setPosts(postsData));
    getUsers().then((usersData) => setUsers(usersData));
    getCurrentUser().then((userData) => setCurrentUserArray(userData));
    getCategories().then((categoriesData) => setCategories(categoriesData));
    getTags().then((tagData) => setTags(tagData));
    getAllComments().then((commentsData) => setComments(commentsData));
  }

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

    filteredResults = filteredResults.filter((post) => post.approved === true);
    filteredResults = filteredResults.filter((post) => post.user_is_active === true);

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
    const currentUserPosts = filteredPosts.filter(
      (post) => post?.shutterbug_user?.id === currentUser.id
    );
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

  const deleteButton = (post) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (shouldDelete) {
        deletePost(post.id).then(() => {
          getPosts().then((postsData) => setPosts(postsData));
        });
      }
    };

    return currentUser?.id === post?.shutterbug_user?.id ? (
      <button onClick={handleDelete}  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Post
      </button>
    ) : null;
  };

  const editButton = (post) => {
    return currentUser.id === post?.shutterbug_user?.id ? (
      <button
        onClick={() => {
          navigate(`/my-posts/${post.id}/edit`);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit Post
      </button>
    ) : null;
  };

  const flagButton = (post) => {
    const isFlagged = post?.flagged;

    return currentUser.id !== post?.shutterbug_user?.id ? (
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 ${isFlagged ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            } hover:bg-opacity-80 transition-colors duration-300 flex items-center space-x-1`}
          onClick={() => flagPost(post).then(() => getData())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>
          <span>{isFlagged ? 'Unflag' : 'Flag'}</span>
        </button>
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
              placeholder={`Let ${post?.user_first_name} know what you think...`}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

    return currentUser.id === comment?.shutterbug_user?.id ? (
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Comment
      </button>
    ) : null;
  };


  return (
    <div className="post-list-container bg-white dark:bg-gray-800 text-black dark:text-white">
      <h1 className="page-title text-2xl font-bold mb-4">Posts</h1>

      <button onClick={() => navigate("/postform")} className="button add-post-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Post
      </button>

      <div className="filter-form mt-4 flex space-x-4">
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
            <option value={0}>Select a Tag</option>
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
            className="filter-input"
          />
        </div>
      </div>

      <div className="show-current-user-posts mt-4">
        <button onClick={ShowOnlyCurrentUserPosts} className="button current-user-posts-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Show Only My Posts
        </button>
      </div>

      <div className="reset-filters-container mt-4">
        <button onClick={resetFilters} className="button reset-filters-button bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Reset Filters
        </button>
      </div>

      <article className="posts mt-4 space-y-8">
        {filteredPosts.map((post) => {
          return (
            <div className="flex justify-center" key={`postList--${post.id}`}>
              <section className="post bg-gray-100 dark:bg-gray-700 p-4 rounded-lg w-full max-w-screen-4xl">
                <div className="post-divider">
                  <hr className="divider-line" />
                </div>

                <div className="flex justify-between">
                  <div>
                    <div className="post-title">
                      <Link to={`/posts/${post.id}`} className="post-link font-semibold text-xl">
                        {post.title}
                      </Link>
                    </div>
                    <div className="post-shutterbug text-sm">
                      By{" "}
                      <Link to={`/users/${post?.shutterbug_user?.id}`} className="user-link font-semibold text-blue-500 hover:underline">
                        {post?.user_full_name || "Anonymous User"}
                      </Link>
                    </div>
                  </div>

                  <div className="flag-post-button">{flagButton(post)}</div>
                </div>

                <div className="flex justify-between">
                  <div className="edit-post-button">{editButton(post)}</div>
                  <div className="delete-post-button">{deleteButton(post)}</div>
                </div>

                <img
                  className="post-image mt-2 w-full rounded-lg"
                  src={post.image_url}
                  alt={post.title}
                />

                <div className="reactions mt-2 flex space-x-2">
                  {post.reactions.map((reaction, index) => (
                    <img
                      key={`reaction-${index}`}
                      src={reaction.image_url}
                      alt={reaction.label}
                      className="reaction-icon h-6 w-6"
                    />
                  ))}
                </div>

                <div className="post-content mt-4 text-lg text-gray-700 dark:text-gray-300">
                  "{post?.content}"
                </div>

                <div className="post-published mt-2 text-gray-600 dark:text-gray-400">
                  Published: {post?.published_on}
                </div>

                <div className="post-tags mt-2 text-gray-600 dark:text-gray-400">
                  Tags: {post.tags.map((tag) => tag.label).join(", ")}
                </div>

                <div className="post-comments mt-4 space-y-2">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">Comments:</div>
                  {comments
                    .filter((comment) => comment?.post?.id === post.id)
                    .map((comment) => (
                      <div key={`comment-${comment.id}`} className="comment flex items-center space-x-2">
                        <Link
                          to={`/users/${comment?.shutterbug_user?.id}`}
                          className="user-link font-semibold text-blue-500 hover:underline"
                        >
                          {comment?.shutterbug_user?.full_name || "Anonymous User"}:
                        </Link>
                        <div className="comment-content text-gray-700 dark:text-gray-300">
                          {comment.content}
                        </div>
                        {deleteCommentButton(comment)}
                      </div>
                    ))}
                  {addCommentButton(post)}
                  {commentInput(post)}
                </div>
              </section>
            </div>
          );
        })}
      </article>
    </div>
  );
}