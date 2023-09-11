import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";

export const PostEdit = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        image_url: "",
        category: 0,
    });
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postData, categoryList] = await Promise.all([
                    fetch(`http://localhost:8000/posts/${postId}`, {
                        headers: {
                            Authorization: `Token ${localStorage.getItem("auth_token")}`,
                        },
                    }).then((response) => response.json()),
                    getCategories(),
                ]);

                setNewPost(postData);
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [postId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedPost = {
            user: newPost.user?.id,
            category: parseInt(newPost.category),
            title: newPost.title,
            image_url: newPost.image_url,
            content: newPost.content,
            approved: newPost.approved,
            published_on: newPost.published_on,
            approved: newPost.approved,
            flagged: newPost.flagged,
        };

        fetch(`http://localhost:8000/posts/${newPost.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify(updatedPost),
        }).then(() => navigate(`/posts`));
    };

    return (
        <form className="postForm column" onSubmit={handleSubmit}>
            <h2 className="postFormHeader title">Edit a Post</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title" className="subtitle">
                        Title:{" "}
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="form-control input"
                        value={newPost.title}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="content" className="subtitle">
                        Content:{" "}
                    </label>
                    <input
                        type="text"
                        name="content"
                        required
                        className="form-control input"
                        value={newPost.content}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="subtitle">
                        Category:
                    </label>
                    <select
                        className="select"
                        value={newPost.category}
                        onChange={handleChange}
                        name="category"
                    >
                        <option value="0">Select Your Category</option>
                        {categories.map((category) => (
                            <option
                                key={`categoryType--${category.id}`}
                                value={category.id}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url" className="subtitle">
                        Image:{" "}
                    </label>
                    <input
                        type="text"
                        name="image_url"
                        required
                        className="form-control input"
                        value={newPost.image_url}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary">
                Save
            </button>
            <button onClick={() => navigate(`/posts`)}> Cancel </button>
        </form>
    );
};
