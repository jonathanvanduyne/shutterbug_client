import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { getTags, postTagRelationships } from "../../managers/TagManager";
import { getUserByToken } from "../../managers/tokens";
import { getCurrentUser } from "../../managers/users.js";


export const PostForm = () => {

    const [categories, setCategories] = useState([]);
    const [formError, setFormError] = useState(false);
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser] = useState()


    // Default state for all tags to list on form
    const [tagList, setTagList] = useState([])
    // Track state for tags being added to post
    const [tagsOnPost, updateTagsOnPost] = useState([])


    const [post, update] = useState({
        user: 0,
        title: "",
        image_url: "",
        content: "",
        published_on: new Date().toISOString().split('T')[0],
        category: 0,
    });

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
        getTags()
            .then(tagData => setTagList(tagData))
        getCurrentUser()
            .then(user => setCurrentUser(user))
            });
    }, []);

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (!post.title || post.category === 0 || !post.content) {
            setFormError(true);
            return;
        }

        const messageToSendToAPI = {
            user: currentUser.id,
            title: post.title,
            image_url: post.image_url,
            content: post.content,
            published_on: post.published_on,
            category: post.category,
            approved: true,
            flagged: false
        };

        fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then(response => response.json())
            .then((data) => {
                const createdPostId = data.id;

                // If tags were selected, create the post/tag relationships with the new post id

                navigate(`/posts/${createdPostId}`);
            });
    }

    return (
        <form className="postForm column">
            <h2 className="postFormHeader title is-2">Hi {currentUser[0]?.user?.first_name}, let's make a post!</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="postTitle subtitle">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="THINK OF A FUN TITLE"
                        value={post.title}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.title = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="label-bold subtitle">Category:</label>
                    <select
                        value={post?.category?.id}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.category = parseInt(evt.target.value);
                            update(copy);
                        }}
                        className="form-control select "
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
                    <label htmlFor="imagePost" className="imagePost subtitle">Image:</label>
                    <input
                        required
                        type="text"
                        className="form-control input"
                        value={post.image_url}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.image_url = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content" className="contentPost subtitle">Content:</label>
                    <textarea
                        required
                        type="text"
                        className="textarea"
                        rows="10"
                        value={post.content}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.content = evt.target.value;
                            update(copy);
                        }}
                    ></textarea>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary">
                Save
            </button>

            {formError && <div className="alert alert-danger">Please fill in all of the required fields. You will not be approved until you do so. We don't mess around here.</div>}
        </form>
    );
};
