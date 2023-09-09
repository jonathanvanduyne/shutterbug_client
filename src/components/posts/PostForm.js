import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { getTags, postTagRelationships } from "../../managers/TagManager";
import { getUserByToken } from "../../managers/tokens";
import { getCurrentUser } from "../../managers/users.js";
import { UploadPhotoWidget } from "./UploadPhotoWidget.js";
import { upload } from "@testing-library/user-event/dist/upload.js";


export const PostForm = () => {

    const [categories, setCategories] = useState([]);
    const [tagList, setTagList] = useState([])
    const [formError, setFormError] = useState(false);

    const [currentUser, setCurrentUser] = useState()
    const [createNewTag, setCreateNewTag] = useState("")
    const [post, update] = useState({
        title: "",
        content: "",
        image_url: "",
        category: 0,
    });

    // Track state for tags being added to post
    const [tagsOnPost, updateTagsOnPost] = useState([])

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
                getTags()
                    .then(tagData => setTagList(tagData))
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
            title: post.title,
            image_url: post.image_url,
            content: post.content,
            category: post.category,
            tags: tagsOnPost
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
                navigate(`/posts/${createdPostId}`);

            });
    }

    const handleImageUpload = (url) => {
        update({ ...post, image_url: url });
    };

    const addOrRemoveTag = (e) => {
        const checkedTagId = parseInt(e.target.value)
        console.log("checkedTagId", checkedTagId)
        if (tagsOnPost.includes(checkedTagId)) {
            const updatedTags = tagsOnPost.filter(tagId => tagId !== checkedTagId)
            updateTagsOnPost(updatedTags)
        } else {
            const copy = [...tagsOnPost]
            copy.push(checkedTagId)
            updateTagsOnPost(copy)
        }
    }

    const handleCreateNewTag = (event) => {
        event.preventDefault();
        if (!createNewTag) {
            return; // Prevent creating an empty tag
        }

        // Create a new tag object
        const newTag = {
            label: createNewTag
        };

        // Send a POST request to create the new tag
        fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(newTag)
        })
            .then(response => response.json())
            .then(() => {
                // Clear the createNewTag input field
                setCreateNewTag("");

                // Fetch the updated list of tags after creating the new tag
                getTags()
                    .then(tagData => setTagList(tagData))
            })
    };


    return (
        <form className="postForm column">
            <h2 className="postFormHeader title is-2">Let's make a post!</h2>

            <fieldset>
                <UploadPhotoWidget onImageUpload={handleImageUpload} />
            </fieldset>
            
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
                <h3 className="is-size-5 has-text-weight-bold mt-3">Add Tags to Your Post</h3>
                <section className="py-2 px-4">
                    {
                        tagList.length > 0 &&
                        tagList.map((tag) => {
                            return <div key={`tagCheck--${tag.id}`}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={tagsOnPost.includes(tag.id)}
                                        onChange={(e) => addOrRemoveTag(e)}
                                    />
                                    {tag.label}
                                </label>
                            </div>
                        })
                    }
                </section>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="NewTag" className="New-tag subtitle">Create New Tag:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control input"
                        placeholder="Need a new tag? Add it here!"
                        value={createNewTag}
                        onChange={(evt) => {
                            setCreateNewTag(evt.target.value);
                        }}
                    />
                    <button
                        onClick={(evt) => handleCreateNewTag(evt)}
                        className="btn btn-secondary">
                        Create Tag
                    </button>
                </div>
            </fieldset>


            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary">
                Post
            </button>
        </form>
    );
};
